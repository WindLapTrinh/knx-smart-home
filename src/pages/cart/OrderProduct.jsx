import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, Modal } from "zmp-ui";
import { paymentContext } from "../shared/common/payment/PaymentContext";
import "../../css/cart/orderProduct.css";
import useToast from "../shared/hooks/useToast";
import { useAddress } from "../shared/common/cart/AddressContext"; 
import axiosClient from "../shared/config/axios";

const OrderProduct = ({ items }) => {
  const navigate = useNavigate();
  const { setPaymentData } = paymentContext();
  const openToast = useToast();
  const { address } = useAddress(); 
  const defaultAddress = address.find(address => address.isDefault);

  console.log("Địa chỉ mặc định:", defaultAddress); // Log địa chỉ mặc định
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); 

  const totalPrice = items
    .reduce((total, item) => {
      return total + item.Price * item.quantity;
    }, 0)
    .toLocaleString("vi-VN");

  const handleCheckout = () => {
    if (!address || address.length === 0) {
      openToast("Bạn chưa có thông tin địa chỉ!");
      return;
    }
    setConfirmModalVisible(true); 
  };

  const handleConfirmOrder = async () => {
    console.log("handleConfirmOrder called"); 
    const formData = new FormData();
    formData.append('SubTotalAmount', totalPrice.replace(/\./g, ''));
    formData.append('TotalAmount', totalPrice.replace(/\./g, ''));
    formData.append('TotalWeight', 0);
    formData.append('ShipFee', 0);
    formData.append('PayMethod', null);
    formData.append('Name', defaultAddress.name || "N/A");
    formData.append('Phone', defaultAddress.phone || "N/A");
    formData.append('Email', defaultAddress.email || "N/A");
    formData.append('DeliveryAddress', defaultAddress.city || "N/A");
    formData.append('Province', defaultAddress.district || "N/A");
    formData.append('Ward', defaultAddress.ward || "N/A");
    formData.append('Note', "N/A");
    formData.append(
      'JsonData',
      JSON.stringify(
        items.map((item) => ({
          PromotionEnabled: false,
          Brand: item.Brand || "NO_BRAND",
          Title: item.Title,
          Variation: item.Variation || null,
          Quantity: item.quantity,
          Price: item.Price,
          Weight: item.Weight || 0,
          RowTotal: item.Price * item.quantity,
        }))
      )
    );
    
    console.log("FormData:", [...formData.entries()]); 

    try {
      const response = await axiosClient.post(
        '/api?order', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        }
      );
      
      console.log("Response received:", response); 
  
      if (response.status === 200) {
        openToast("Đặt hàng thành công!");
        setPaymentData(items); 
        setConfirmModalVisible(false); 
        navigate("/homePayment");
      } else {
        openToast("Đặt hàng thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error occurred:", error); 
      openToast("Lỗi kết nối, vui lòng thử lại sau.");
    }
  };

  return (
    <Box className="order-product-container">
      <Box className="order-product-cart">
        <Box className="payment-summary">
          <Text size="medium" bold>
            Tổng cộng:
          </Text>
          <Text className="calculate-total" size="medium">{totalPrice} đ</Text>
        </Box>
        <Button className="btn-payment" onClick={handleCheckout}>
          Thanh toán
        </Button>
      </Box>

      <Modal
        visible={confirmModalVisible}
        title="Xác nhận đặt hàng"
        onClose={() => setConfirmModalVisible(false)} 
        verticalActions
        description="Bạn có chắc chắn muốn đặt hàng không?"
        actions={[
          {
            text: "Hủy",
            close: true,
          },
          {
            text: "Xác nhận",
            highLight: true,
            onClick: () => {
              console.log("Confirm button clicked");
              handleConfirmOrder();
            }
          },
        ]}
      />
    </Box>
  );
};

export default OrderProduct;

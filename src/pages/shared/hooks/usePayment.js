import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axios";
import useToast from "../hooks/useToast";
import { useAddress } from "../common/cart/AddressContext";
import { paymentContext } from "../common/payment/PaymentContext"; // Sử dụng paymentContext
import { Payment } from "zmp-sdk"; // Import Payment từ Zalo SDK

const usePayment = (items) => {
  const navigate = useNavigate();
  const { paymentData, setPaymentData } = paymentContext(); // Lấy paymentData và setPaymentData từ context
  const openToast = useToast(); // Hook để hiển thị thông báo
  const { address } = useAddress(); // Lấy danh sách địa chỉ từ context địa chỉ
  const defaultAddress = address.find((addr) => addr.isDefault); // Lấy địa chỉ mặc định

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const totalPrice = items
    .reduce((total, item) => total + item.Price * item.quantity, 0)
    .toLocaleString("vi-VN");

  // Hàm xử lý thanh toán qua Zalo Payment
  const handleZaloPayment = useCallback(async () => {
    const desc = `Thanh toán đơn hàng - Tổng cộng ${totalPrice} đ`;

    Payment.createOrder({
      desc,
      item: items.map((item) => ({
        id: item.id,
        amount: item.Price * item.quantity,
      })),
      id: "order-id", 
      amount: parseInt(totalPrice.replace(/\./g, '')), 
      extradata: {
        storeName: "Tên cửa hàng",
        storeId: "123456", // Mã cửa hàng hoặc mã đơn hàng
        notes: desc,
      },
      success: async (data) => {
        const { orderId } = data;
        console.log("Thanh toán thành công, Order ID:", orderId);

        try {
          // Gửi dữ liệu đơn hàng lên server sau khi thanh toán thành công
          const res = await axiosClient.post('/api?order', {
            orderId,
            totalAmount: totalPrice.replace(/\./g, ''),
            items: items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              price: item.Price,
            })),
            address: defaultAddress,
          });

          if (res.status === 200) {
            openToast("Đặt hàng thành công!");
            setPaymentData({ items, total: totalPrice.replace(/\./g, '') });
            setConfirmModalVisible(false);
            navigate("/homePayment");
          } else {
            openToast("Đặt hàng thất bại, vui lòng thử lại.");
          }
        } catch (error) {
          console.error("Error occurred:", error);
          openToast("Lỗi kết nối, vui lòng thử lại sau.");
        }
      },
      fail: (err) => {
        console.log("Thanh toán thất bại:", err);
        openToast("Thanh toán thất bại, vui lòng thử lại.");
      },
    });
  }, [items, totalPrice, defaultAddress, setPaymentData, openToast, navigate]);

  // Hàm xử lý khi nhấn nút thanh toán
  const handleCheckout = () => {
    if (!address || address.length === 0) {
      openToast("Bạn chưa có thông tin địa chỉ!");
      return;
    }
    setConfirmModalVisible(true); // Hiển thị modal xác nhận
  };

  return {
    totalPrice,
    confirmModalVisible,
    setConfirmModalVisible,
    handleCheckout,
    handleZaloPayment,
    paymentData,
  };
};

export default usePayment;

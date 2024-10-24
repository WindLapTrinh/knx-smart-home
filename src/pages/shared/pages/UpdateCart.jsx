import React, { useState } from "react";
import { Box, Text, Button, Modal } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import "../../../css/update/updateCart.css";
import axiosClient from "../../shared/config/axios";

const UpdateCart = ({ order }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOrderStatusInVietnamese = (status) => {
    switch (status) {
      case "NEW":
        return "Đơn mới";
      case "DELIVERING":
        return "Đang giao";
      case "SUCCESS":
        return "Đã hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const handleStatusClick = async () => {
    setModalOpen(true);
    setLoading(true);

    try {
      // Gửi yêu cầu cập nhật trạng thái lên server
      const response = await axiosClient.post(`api?orderid=${order.Id}`);

      if (response.status === 200) {
        console.log("Order status updated:", response.data);
      } else {
        console.error("Error updating order status:", response.data);
        alert("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Không thể kết nối với máy chủ.");
    }
  };

  return (
    <Box p={2}>
      {order ? (
        <Box
          className={
            order.Active === false ? "item-cart-false" : "item-cart-true"
          }
          justifyContent="flex-start"
          onClick={handleStatusClick}
        >
          <Text
            className={
              order.Active === false
                ? "cart-order-code-false"
                : "cart-order-code-true"
            }
            size="large"
            bold
            mt={2}
          >
            Mã đơn hàng: {order.OrderCode}
          </Text>
          <span className="update-cart-order-status" size="medium" mt={2}>
            Trạng thái: {getOrderStatusInVietnamese(order.OrderStatus)}
          </span>
          <span className="update-cart-order-amount" size="medium" mt={2}>
            Tổng tiền: {order.TotalAmount.toLocaleString("vi-VN")} VND
          </span>

          <Text className="update-cart-order-name" size="medium" mt={2}>
            Khách hàng: {order.Name}
          </Text>
          <Text className="update-cart-order-phone" size="medium" mt={2}>
            Số điện thoại: {order.Phone}
          </Text>
          <Text className="update-cart-order-address" size="medium" mt={2}>
            Địa chỉ giao hàng: {order.DeliveryAddress}
          </Text>
        </Box>
      ) : (
        <Box className="update-cart-page" textAlign="center">
          <Text>Không có đơn hàng nào</Text>
        </Box>
      )}

      {/* Modal xác nhận cập nhật trạng thái */}
      <Modal
        visible={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Thông tin đơn hàng"
        footer={
          <Button onClick={handleStatusClick} disabled={loading} fullWidth>
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        }
      >
        <Box>
          <Text>Mã đơn hàng: {order.OrderCode}</Text>
          <Text>
            Trạng thái hiện tại: {getOrderStatusInVietnamese(order.OrderStatus)}
          </Text>
          <Text>Khách hàng: {order.Name}</Text>
          <Text>Tổng tiền: {order.TotalAmount} VND</Text>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateCart;

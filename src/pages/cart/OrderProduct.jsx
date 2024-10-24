import React from "react";
import { Button, Modal, Box, Text } from "zmp-ui";
import usePayment from "../shared/hooks/usePayment";
import "../../css/cart/orderProduct.css";

const OrderProduct = ({ items }) => {
  const {
    totalPrice,
    confirmModalVisible,
    setConfirmModalVisible,
    handleCheckout,
    handleZaloPayment,
  } = usePayment(items);

  return (
    <Box  className="order-product-container">
      <Box className="order-product-cart">
        <Box className="payment-summary">
          <Text size="medium" bold>
            Tổng cộng:
          </Text>
          <Text className="calculate-total" size="medium">{totalPrice} đ</Text>
        </Box>
        <Button onClick={handleCheckout} className="btn-payment" >Thanh toán</Button>
      </Box>

      <Modal
        visible={confirmModalVisible}
        title="Xác nhận thanh toán"
        onClose={() => setConfirmModalVisible(false)}
        actions={[
          { text: "Hủy", onClick: () => setConfirmModalVisible(false) },
          { text: "Xác nhận", highLight: true, onClick: handleZaloPayment },
        ]}
      >
        <Text>Xác nhận thanh toán qua ZaloPay?</Text>
      </Modal>
    </Box>
  );
};

export default OrderProduct;

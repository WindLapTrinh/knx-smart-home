import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button } from "zmp-ui";
import { useCart } from "../shared/common/cart/CartContext";
import { paymentContext } from "../shared/common/payment/PaymentContext";
import "../../css/cart/orderProduct.css";

const OrderProduct = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); 
  const { setPaymentData } = paymentContext();
  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\./g, "")) * item.quantity,
    0
  ).toLocaleString("vi-VN");
    return total;
  };
  

  const handleCheckout = () => {
    setPaymentData(cart);
    // Xử lý thanh toán
    navigate("/homePayment");

    console.log(cart);
  };

  return (
    <Box className="order-product-container">
      <Box className="order-product-cart">
        <Box className="payment-summary">
          <Text size="medium" bold>
            Tổng cộng:
          </Text>
          <Text className="calculate-total" size="medium">{calculateTotal()} đ</Text>
        </Box>
        <Button className="btn-payment" onClick={handleCheckout}>
          Thanh toán
        </Button>
      </Box>
    </Box>
  );
};

export default OrderProduct;

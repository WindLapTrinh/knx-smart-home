import React from "react";
import { List, Icon, Box, Text, Input } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { BsDuffle } from "react-icons/bs";
import "../../css/payment/productPayment.css";

const ProductPayment = ({ cartData }) => {
  const navigate = useNavigate();

  return (
    <Box className="product-payment">
      <Box className="header-product-payment">
        <BsDuffle className="icon-payment" />
        <Text className="title-product-payment" size="large" bold mb={3}>
          Sản phẩm đặt mua
        </Text>
      </Box>
      { cartData.length > 0 ?cartData.map((item) => (
        <Box key={item.id} className="index-product-payment">
          <Box className="product-payment-item">
            <Box className="product-payment-image">
              <img src={item.ImagesJson} alt={item.ImagesJson} />
            </Box>
            <Box className="product-payment-info">
              <Text className="product-payment-name">{item.Title}</Text>
            </Box>
            <Box className="total-item-payment">
            <Text className="quantity-product-item">x{item.quantity}</Text>
            <Text className="cart-item-price">{item.Price.toLocaleString("vi-VN")} đ</Text>
          </Box>
          </Box>
          
        </Box>
      )) : <Text>Không có sản phẩm nào trong giỏ hàng</Text>}
    </Box>
  );
};

export default ProductPayment;

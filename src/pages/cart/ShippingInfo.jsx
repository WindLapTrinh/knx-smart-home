import React from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import "../../css/cart/shippingInformation.css";

const ShippingInfo = () => {
  const navigate = useNavigate();
  const handleAddress = () => {
    navigate("/addressCart");
  }

  return (
    <Box className="detail-shipping">
      <Box className="header-cart-product">
            <img className="icon-header-cart" src="/images/icon/oto-cart.jpg" />
            <Text className="section-title" size="large" bold mb={3}>
              Thông tin vận chuyển
            </Text>
          </Box>
      <Box className="shipping-info" mt={2}>
        <List>
          <List.Item className="cart-address" onClick={handleAddress}>
            <div className="list-item-content">
              <Icon icon="zi-location" className="list-item-icon" />
              <div className="item-details">
                <div className="title-address-cart">
                  Bạn chưa có thông tin địa chỉ 
                </div>
                <div className="item-description">Bấm vào đây bạn nhé</div>
              </div>
              <Icon icon="zi-chevron-right" className="list-item-chevron" />
            </div>
          </List.Item>
          <List.Item className="cart-address">
            <div className="list-item-content">
              <Icon icon="zi-clock-1" className="list-item-icon" />
              <div className="item-details">
                <div className="title-date-cart">
                  Ngày 25 Th07 - Ngày 26 Th07
                </div>
                <div className="item-description">
                  Thời gian dự kiến giao hàng
                </div>
              </div>
            </div>
          </List.Item>
        </List>
      </Box>
    </Box>
  );
};

export default ShippingInfo;

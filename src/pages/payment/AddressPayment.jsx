import React from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import { LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../../css/payment/addressPayment.css";

const AddressPayment = () => {
  const navigate = useNavigate();
  const handleAddress = () => {
    navigate("/addressCart");
  };

  return (
      <Box className="address-payment">
        <Box className="header-address-payment">
          <LuMapPin className="icon-address-payment"/>
          <Text className="title-address-payment" size="large" bold mb={3}>
            Địa chỉ nhận hàng
          </Text>
        </Box>
        <Box className="info-address" mt={2} onClick={handleAddress}>
          <Text className="detail-address-payment">
            Bạn hãy nhập địa chỉ
          </Text>
        </Box>
      </Box>
  );
};

export default AddressPayment;

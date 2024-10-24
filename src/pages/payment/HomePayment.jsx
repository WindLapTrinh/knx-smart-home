import React, { useState, useEffect } from "react";
import { Box, Text, Button, Input, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import ProductPayment from "./ProductPayment.jsx";
import ContentPayment from "./ContentPayment.jsx";
import AddressPayment from "./AddressPayment.jsx";
import MethodPayment from "./MethodPayment.jsx";
import OrderCart from "./OrderCart.jsx";
import ContactPayment from "./ContactPayment.jsx";

import { paymentContext } from "../shared/common/payment/PaymentContext";
import "../../css/payment/paymentDetail.css";
import CustomHeader from "../shared/pages/CustomHeader.jsx";

const HomePayment = () => {
  //date payment -> context
  const { paymentData } = paymentContext();
  const navigate = useNavigate();

  return (
    <Box>
      <CustomHeader title={"Chi tiết thanh toán"} showBackIcon={true} />
      <Box className="page-payment" p={4}>
        {paymentData.length > 0 ? (
          <Box>
            <AddressPayment />
            <ProductPayment cartData={paymentData} />
            <ContentPayment cartData={paymentData} />
            <MethodPayment />
            <ContactPayment />
          </Box>
        ) : (
          <OrderCart />
        )}
      </Box>
    </Box>
  );
};

export default HomePayment;

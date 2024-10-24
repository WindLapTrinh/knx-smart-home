import React, { useState } from "react";
import { List, Icon, Box, Text } from "zmp-ui";
import "../../css/cart/infomationVoucher.css";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import MethodPaymentSheet from "../vouchers/MethodPaymentSheet"; // Nhập component mới

const InfomationVoucher = () => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState(""); // Để lưu mã voucher nhập vào

  const handleApplyVoucher = () => {
    setActionSheetVisible(true);
  };

  const handleApplyCode = () => {
    // Xử lý mã voucher ở đây
    console.log("Voucher Code Applied:", voucherCode);
    setActionSheetVisible(false);
  };

  return (
    <Box className="infomation-voucher" pb={6}>
      <Box className="header-infomation" mb={2}>
        <img
          className="icon-infomation"
          src="/images/icon/payment-cart.jpg"
          alt="Voucher Icon"
        />
        <Text className="section-title" size="large" bold mb={3}>
          Thanh toán
        </Text>
      </Box>
      <Box className="detail-infomation" mt={2}>
        <List>
          <List.Item className="item-infomation" onClick={handleApplyVoucher}>
            <div className="list-infomation">
              <FaMoneyCheckDollar className="voucher-icon" />
              <div className="infomation-ticker">
                <div className="title-ticker">Phương thức</div>
                <div className="sum-voucher">Thanh toán khi nhận hàng</div>
              </div>
              <Icon icon="zi-chevron-right" className="list-item-chevron" />
            </div>
          </List.Item>
        </List>
      </Box>
      {/* Sử dụng component VoucherSheet */}
      <MethodPaymentSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onApplyCode={handleApplyCode}
        voucherCode={voucherCode}
        setVoucherCode={setVoucherCode}
      />
    </Box>
  );
};

export default InfomationVoucher;

import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Box, Text, Button, Input, Radio, Sheet } from "zmp-ui";
import "../../css/cart/infomationVoucher.css";


const MethodPaymentSheet = ({ visible, onClose, onApplyCode, voucherCode, setVoucherCode }) => {
  const navigate = useNavigate();
  const handleApplyVoucher = () => {
    onClose();
  }
  return (
    <Sheet 
      visible={visible}
      onClose={onClose}
      autoHeight
      mask
      handler
      swipeToClose
    >
      <Box p={4} className="custom-bottom-sheet" flex flexDirection="column">
        <Box className="sheet-header">
          <Box className="description-shet-header">
            <Text className="bottom-sheet-title" size="large" bold>Phương thức thanh toán</Text>
            <Text className="bottom-sheet-description" size="large" bold>(vui lòng chọn )</Text>
          </Box>
        </Box>
        <Box className="list-voucher-sheet">
          <Box className="item-voucher-sheet">
            <img className="img-item-voucher" alt="" src="/images/icon/user-cart.png" />
            <Box className="detail-item-voucher">
              <div className="title-item-voucher">Thanh toán khi nhận hàng</div>
              <div className="description-item-voucher">
                <p>chọn thương thức</p>
              </div>
            </Box>
            <Radio className="check-item-voucher" value={1} size="small" name="small-1" />
          </Box>
        </Box>
        <Box className="apply-voucher">
          <Button className="btn-submit-voucher" fullWidth onClick={handleApplyVoucher}>Áp dụng</Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default MethodPaymentSheet;

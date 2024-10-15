import React, { useState, useEffect } from "react";
import { Box, Text, Input, Button, Checkbox, Icon } from "zmp-ui";
import useUser from "../shared/hooks/useUser";
import usePhoneNumber from "../shared/hooks/usePhoneNumber";
import "../../css/cart/addressPage.css";

const AddressPage = () => {
  const [isDefault, setIsDefault] = useState(false);
  const { userInfo, loading: userLoading, error: userError, refetch: refetchUser } = useUser();
  // const { phoneNumber, loading: phoneLoading, error: phoneError, fetchPhoneNumber } = usePhoneNumber();

  // useEffect(() => {
  //   // Gọi API khi component render đầu tiên
  //   refetchUser();
  //   fetchPhoneNumber();
  // }, []);

  const handleDefaultChange = (e) => {
    setIsDefault(e.target.checked);
  };

  if (userLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user info: {userError.message}</div>;
  // if (phoneError) return <div>Error loading phone number: {phoneError.message}</div>;

  return (
    <Box className="address-page" p={4}>
      {/* Phần 1: Liên hệ */}
      <Box className="contact-info" mb={4}>
        <Text className="section-title" size="large" bold mb={2}>
          Liên hệ
        </Text>
        {userInfo && (
          <Box>
            <Input
              placeholder="Họ và tên"
              size="large"
              className="input-field"
              value={userInfo.name || ""}
              readOnly
            />
            <Input
              placeholder="Số điện thoại"
              size="large"
              className="input-field"
              value={""}
              readOnly
            />
          </Box>
        )}
      </Box>

      {/* Phần 2: Địa chỉ */}
      <Box className="address-info" mb={4}>
        <Text className="section-title" size="large" bold mb={2}>
          Địa chỉ
        </Text>
        <Input placeholder="Tỉnh" size="large" className="input-field" />
        <Input placeholder="Thành phố" size="large" className="input-field" />
        <Input placeholder="Quận/Huyện" size="large" className="input-field" />
        <Input placeholder="Phường/Xã" size="large" className="input-field" />
        <Input placeholder="Tên đường" size="large" className="input-field" />
      </Box>

      {/* Phần 3: Địa chỉ mặc định */}
      <Box className="default-address">
        <Checkbox
          checked={isDefault}
          onChange={handleDefaultChange}
          className="default-checkbox"
        />
        <Text className="default-text">Đặt làm địa chỉ mặc định</Text>
      </Box>

      <Button className="save-button">
        <Icon icon="zi-plus-circle" className="icon-address" />
        <span>Thêm địa chỉ</span>
      </Button>
    </Box>
  );
};

export default AddressPage;

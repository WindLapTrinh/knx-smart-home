import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Input, Button, Checkbox, Icon, Select } from "zmp-ui";
import useUser from "../shared/hooks/useUser";
import usePhoneNumber from "../shared/hooks/usePhoneNumber";
import { useAddress } from "../shared/common/cart/AddressContext";
import CustomHeader from "../shared/pages/CustomHeader";
import useToast from "../shared/hooks/useToast";
import "../../css/cart/addressPage.css";

const { Option } = Select;

const AddressPage = () => {
  const navigate = useNavigate();
  const opneToast = useToast();
  const { address, setAddress } = useAddress();
  const [isDefault, setIsDefault] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [streetName, setStreetName] = useState("");
  const [email, setEmail] = useState(""); // Trạng thái cho email
  const {
    userInfo,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser();
  const {
    phoneNumber,
    loading: phoneLoading,
    error: phoneError,
    fetchPhoneNumber,
  } = usePhoneNumber();

  useEffect(() => {
    refetchUser();
    fetchPhoneNumber();
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchDistricts(selectedCity);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
      setSelectedWard("");
      setWards([]);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict);
    } else {
      setWards([]);
      setSelectedWard("");
    }
  }, [selectedDistrict]);

  const fetchCities = async () => {
    try {
      const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      const data = await response.json();
      if (data.error === 0 && Array.isArray(data.data)) {
        setCities(data.data);
      } else {
        console.error("Unexpected response format for cities:", data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await fetch(
        `https://esgoo.net/api-tinhthanh/2/${cityId}.htm`
      );
      const data = await response.json();
      if (data.error === 0 && Array.isArray(data.data)) {
        setDistricts(data.data);
      } else {
        console.error("Unexpected response format for districts:", data);
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const fetchWards = async (districtId) => {
    try {
      const response = await fetch(
        `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
      );
      const data = await response.json();
      if (data.error === 0 && Array.isArray(data.data)) {
        setWards(data.data);
      } else {
        console.error("Unexpected response format for wards:", data);
        setWards([]);
      }
    } catch (error) {
      console.error("Error fetching wards:", error);
      setWards([]);
    }
  };

  const handleDefaultChange = (e) => {
    setIsDefault(e.target.checked);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
  };

  const handleStreetNameChange = (e) => {
    setStreetName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Cập nhật giá trị email
  };

  const handleSubmitAddress = () => {
    // Kiểm tra tính hợp lệ của email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      opneToast("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    let updatedAddresses = [...address];

    if (isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
    }

    const newAddress = {
      id: new Date().getTime(),
      name: userInfo.name || "",
      phone: phoneNumber || "",
      email, // Thêm email vào địa chỉ
      city: getCityNameById(selectedCity),
      district: getDistrictNameById(selectedDistrict),
      ward: getWardNameById(selectedWard),
      street: streetName,
      isDefault,
    };

    updatedAddresses.push(newAddress);

    setAddress(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    navigate("/listAddress");
  };

  const getCityNameById = (id) => {
    const city = cities.find((city) => city.id === id);
    return city ? city.name : "";
  };

  const getDistrictNameById = (id) => {
    const district = districts.find((district) => district.id === id);
    return district ? district.name : "";
  };

  const getWardNameById = (id) => {
    const ward = wards.find((ward) => ward.id === id);
    return ward ? ward.name : "";
  };

  const handleOnBackList = () => {
    if (phoneNumber) {
      navigate("/homeCart");
    } else {
      navigate(-1);
    }
  };

  if (userLoading || phoneLoading) return <div>Loading...</div>;
  if (userError) return <div>Error loading user info: {userError.message}</div>;
  if (phoneError)
    return <div>Error loading phone number: {phoneError.message}</div>;

  return (
    <Box>
      <CustomHeader
        title={"Địa chỉ"}
        showBackIcon={true}
        onBackClick={handleOnBackList}
      />
      <Box className="address-page" p={4}>
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
                value={phoneNumber || ""}
                readOnly
              />
              <Input
                placeholder="Nhập email của bạn"
                size="large"
                className="input-field"
                value={email} // Cập nhật giá trị email
                onChange={handleEmailChange} // Xử lý sự thay đổi email
              />
            </Box>
          )}
        </Box>
        <Box className="address-info" mb={4}>
          <Text className="section-title" size="large" bold mb={2}>
            Địa chỉ
          </Text>
          <Select
            placeholder={
              selectedCity
                ? getCityNameById(selectedCity)
                : "Chọn tỉnh/ thành phố"
            }
            size="large"
            className="city-select"
            onChange={handleCityChange}
            closeOnSelect={true}
          >
            {cities.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder={
              selectedDistrict
                ? getDistrictNameById(selectedDistrict)
                : "Chọn quận/huyện"
            }
            size="large"
            onChange={handleDistrictChange}
            disabled={!selectedCity}
            closeOnSelect={true}
            mb={2}
          >
            {districts.map((district) => (
              <Option key={district.id} value={district.id}>
                {district.name}
              </Option>
            ))}
          </Select>

          <Select
            placeholder={
              selectedWard
                ? getWardNameById(selectedWard)
                : "Chọn phường/xã/thị trấn"
            }
            size="large"
            onChange={handleWardChange}
            disabled={!selectedDistrict}
            closeOnSelect={true}
          >
            {wards.map((ward) => (
              <Option key={ward.id} value={ward.id}>
                {ward.name}
              </Option>
            ))}
          </Select>

          <Input
            placeholder="Nhập địa chỉ cụ thể"
            size="large"
            className="input-field"
            value={streetName}
            onChange={handleStreetNameChange}
            mb={2}
          />
        </Box>
        <Box className="default-address">
          <Checkbox
            checked={isDefault}
            onChange={handleDefaultChange}
            className="default-checkbox"
          />
          <Text className="default-text">Đặt làm địa chỉ mặc định</Text>
        </Box>
        <Button className="save-button" onClick={handleSubmitAddress}>
          <Icon icon="zi-plus-circle" className="icon-address" />
          <span>Thêm địa chỉ</span>
        </Button>
      </Box>
    </Box>
  );
};

export default AddressPage;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, Icon } from "zmp-ui";
import { BsCart, BsHouse } from "react-icons/bs";
import "../../../css/detailhome/bottomNavigation.css";
import { useCart } from "../common/cart/CartContext";
import axiosClient from "../config/axios";

const CustomBottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyTab } = location.state || {};
  const { getCartCount } = useCart();

  const [activeTab, setActiveTab] = useState(keyTab || "home");
  const [notifyCount, setNotifyCount] = useState(0); // State lưu số lượng thông báo

  // Gọi API lấy thông báo
  useEffect(() => {
    axiosClient.post(`api?orderphone=0833012475`)
      .then((response) => {
        const count = response.data.count; // Giả định API trả về số lượng thông báo là 'count'
        setNotifyCount(count); // Lưu số lượng thông báo vào state
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const handleHome = (keyTab) => {
    navigate("/", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  const handleNotify = (keyTab) => {
    navigate("/notificationPage", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  const handleCart = (keyTab) => {
    navigate("/homeCart", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  const handleContactUser = (keyTab) => {
    navigate("/user", { state: { keyTab } });
    console.log("Tab active", keyTab);
  };

  return (
    <BottomNavigation
      fixed
      className="bottom-navigation"
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
    >
      <BottomNavigation.Item
        className={activeTab === "home" ? "icon-active" : ""}
        key="home"
        label="Home"
        icon={
          <div className="accounting-icon-wrapper">
            <BsHouse />
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <BsHouse />
          </div>
        }
        onClick={() => handleHome("home")}
      />
      <BottomNavigation.Item
        className={activeTab === "contact" ? "icon-active" : ""}
        label="Thông báo"
        key="contact"
        icon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-clock-1" />
            {notifyCount > 0 && (
                notifyCount > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{notifyCount}</div>
              )}
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-clock-1" />
            {notifyCount > 0 && (
                notifyCount > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{notifyCount}</div>
              )}
          </div>
        }
        onClick={() => handleNotify("contact")}
      />
      <BottomNavigation.Item
        className={activeTab === "cart" ? "icon-active" : ""}
        key="cart"
        label="Giỏ hàng"
        icon={
          <div className="accounting-icon-wrapper">
            <BsCart />
            {getCartCount() > 0 && (
              getCartCount() > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{getCartCount()}</div>
          )}
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <BsCart />
            {getCartCount() > 0 && (
              getCartCount() > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{getCartCount()}</div>
          )}
          </div>
        }
        onClick={() => handleCart("cart")}
      />
      <BottomNavigation.Item
        className={activeTab === "user" ? "icon-active" : ""}
        key="user"
        label="Tài khoản"
        icon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-user" />
            {notifyCount > 0 && (
                notifyCount > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{notifyCount}</div>
              )}
          </div>
        }
        activeIcon={
          <div className="accounting-icon-wrapper">
            <Icon icon="zi-user-solid" />
            {notifyCount > 0 && (
                notifyCount > 9 ? <div className="full-notify">9+</div> : <div className="red-circle">{notifyCount}</div>
              )}
          </div>
        }
        onClick={() => handleContactUser("user")}
      />
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;

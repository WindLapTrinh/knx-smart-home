import React, { useState, useEffect } from "react";
import { Box, Text, Button, Icon, Input } from "zmp-ui";
import ShippingInfo from "./ShippingInfo";
import OrderProduct from "./OrderProduct";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import InfomationPayment from "./InfomationPayment";
import OrderCart from "../payment/OrderCart";
import CustomHeader from "../shared/pages/CustomHeader";
import { useCart } from "../shared/common/cart/CartContext";
import "../../css/cart/homeCart.css";
import "../../css/cart/shippingInformation.css";

const HomeCart = () => {
  const { cart, removeItemFromCart } = useCart();
  const [items, setItems] = useState(cart);
  const [hasShippingInfo, setHasShippingInfo] = useState(false); // Track if shipping info exists

  useEffect(() => {
    setItems(cart);
  }, [cart]);

  const handleQuantityChange = (id, change) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.Id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity + change, 1),
            }
          : item
      )
    );
  };

  const handleDeleteProduct = (id) => {
    removeItemFromCart(id);
  };

  return (
    <Box>
      <CustomHeader title={"Giỏ hàng"} />
      <Box className="cart-page" p={4}>
        {items.length !== 0 ? (
          <Box>
            <Box className="sum-cart-page">
              <Box className="cart-items">
                <Box className="header-cart-product">
                  <img className="icon-header-cart" src="/images/icon/cart.jpg" />
                  <Text className="section-title" size="large" bold mb={3}>
                    Sản phẩm đặt mua
                  </Text>
                </Box>

                {items.map((item) => (
                  <Box key={item.Id} className="index-cart-item">
                    <Box
                      className="delete-item-cart"
                      onClick={() => handleDeleteProduct(item.Id)}
                    >
                      <Icon className="icon-delete-item" icon="zi-close" />
                    </Box>
                    <Box className="cart-item" mt={2}>
                      <Box className="cart-item-image">
                        <img src={item.ImagesJson} alt={item.ImagesJson} />
                      </Box>
                      <Box className="cart-item-info">
                        <Text className="cart-item-name">{item.Title}</Text>
                        <Text className="cart-item-price">
                          {item.Price.toLocaleString("vi-VN")} đ
                        </Text>
                      </Box>
                    </Box>
                    <Box className="cart-item-quantity">
                      <a
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.Id, -1)}
                      >
                        -
                      </a>
                      <Input
                        className="quantity-input"
                        type="number"
                        value={item.quantity}
                        readOnly
                      />
                      <a
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.Id, 1)}
                      >
                        +
                      </a>
                    </Box>
                  </Box>
                ))}
              </Box>
              <ShippingInfo setHasShippingInfo={setHasShippingInfo} /> {/* Pass the state updater */}
              <InfomationPayment />
            </Box>
            <OrderProduct items={items} hasShippingInfo={hasShippingInfo} /> {/* Pass the shipping info state */}
            <CustomBottomNavigation />
          </Box>
        ) : (
          <OrderCart />
        )}
      </Box>
    </Box>
  );
};

export default HomeCart;

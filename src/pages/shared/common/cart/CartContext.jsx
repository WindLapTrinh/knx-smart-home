import React, { createContext, useContext, useState, useEffect } from 'react';
import useToast from '../../hooks/useToast';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const openToast = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.Id === item.Id); // Đảm bảo sử dụng Id đúng
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.Id === item.Id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity }]; // Thêm quantity khi thêm sản phẩm mới
    });
  };
  

  // delete cart item
  const removeItemFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.Id !== id));
    setToastVisible(true);
    openToast("Đã xóa sản phẩm thành công");
  };

  //notify quanty item
  const getCartCount = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

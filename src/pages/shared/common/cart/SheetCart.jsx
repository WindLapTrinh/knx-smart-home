import React, { useState } from "react";
import { Box, Text, Button, Input, Sheet } from "zmp-ui";
import { useCart } from "./CartContext";
import useToast from "../../hooks/useToast";

const SheetCart = ({ product, visible, onClose, onAddToCart, onPayment }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();
  const [toastVisible, setToastVisible] = useState(false);
  const openToast = useToast();

  const handleQuantityChange = (delta) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + delta));
  };

  const handleAddCart = () => {
    addItemToCart({ ...product, quantity });
    onAddToCart();
    setToastVisible(true);
    openToast("Đã thêm sản phẩm vào giỏ hàng");
  };

  const handlePaymentProduct = () => {
    addItemToCart({ ...product, quantity });
    onPayment();
    setToastVisible(true);
    openToast("Đã thêm sản phẩm vào giỏ hàng");
  };

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      autoHeight
      mask
      handler
      swipeToClose
    >
      <Box p={4} className="custom-product-item" flex flexDirection="column">
        <Box className="sheet-header-product">
          <img className="sheet-img-product" src={product.ImagesJson} />
          <Text className="sheet-title-product" size="large" bold>
            {product.Title}
          </Text>
          <Text>
            <span className="sheet-price-product">{product.Price} đ</span>
          </Text>
        </Box>
        <Box
          className="sheet-body-product"
          flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Button
            className="btn-sheet-product"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </Button>
          Số lượng:
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "40px", height: "40px", textAlign: "center" }}
          />
          <Button
            className="btn-sheet-increased"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </Button>
        </Box>
        <Box
          my={4}
          className="sheet-footer-product"
          flex
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button
            onClick={handleAddCart}
            className="btn-sheet-cart"
          >
            Thêm vào giỏ hàng
          </Button>
          <Button
            onClick={handlePaymentProduct}
            className="btn-sheet-payment"
          >
            Mua ngay
          </Button>
        </Box>
      </Box>
    </Sheet>
  );
};

export default SheetCart;

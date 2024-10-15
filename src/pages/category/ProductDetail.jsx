import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Swiper,
  BottomNavigation,
  Icon,
  Sheet,
  Input,
} from "zmp-ui";
import ProductList from "../home/ProductList.jsx";
import SliderCategory from "./SliderCategory.jsx";
import CustomBottomNavigation from "../../components/layout/CustomBottomNavigation.jsx";
import SheetCart from "../shared/common/cart/SheetCart"; 

import { BsShop } from "react-icons/bs";
import "../../css/detailhome/product/productDetail.css";

const product = {
  id: 1,
  name: "Rau cải bẹ",
  image: "/images/product/veg-2.jpg",
  price: "20.000",
  description:
    "Dầu ăn ngày nay ngày càng đa dạng phù hợp hơn trong từng nhu cầu sử dụng. Có thể sử dụng được.",
  relatedProducts: [
    {
      id: 2,
      name: "Xà lách thủy tinh",
      image: "/images/product/veg-1.jpg",
      price: "20.000",
    },
    {
      id: 3,
      name: "Cải bẹ xanh",
      image: "/images/product/veg-2.jpg",
      price: "15.000",
    },
    {
      id: 4,
      name: "Bắp cải trắng",
      image: "/images/product/veg-3.jpg",
      price: "50.000",
    },
    {
      id: 5,
      name: "Rau mồng tơi",
      image: "/images/product/veg-4.jpg",
      price: "10.000",
    },
  ],
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const handleAddCart = () => {
    setActionSheetVisible(true);
  };

  const handleAddToCart = () => {
    setActionSheetVisible(false);
  };

  const handlePayment = () => {
    setActionSheetVisible(false);
    navigate("/homeCart");
  };

  return (
    <Box className="container-product">
      <SliderCategory />
      <Box className="product-detail">
        <Box className="product-info">
          <Text className="product-name">{product.name}</Text>
          <Text className="product-price">{product.price} đ</Text>
          <Text className="product-description">{product.description}</Text>
          <Button className="add-to-cart-button" onClick={handleAddCart}>
            Thêm vào giỏ
          </Button>
        </Box>
        <Box className="related-products">
          <div className="icon-related-products"><BsShop/></div>
          <Text className="related-products-title">Sản phẩm liên quan</Text>
          <Box className="related-products-list">
            {product.relatedProducts.map((relatedProduct) => (
              <Box key={relatedProduct.id} className="related-product-item">
                <img
                  className="related-product-image"
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                />
                <Text className="related-product-name">
                  {relatedProduct.name}
                </Text>
                <Text className="related-product-price">
                  {relatedProduct.price} đ
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box mt={2}>
        <ProductList />
      </Box>
      <Box className="navigate-product">
        <CustomBottomNavigation />
      </Box>
      <SheetCart
        product={product}
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        onAddToCart={handleAddToCart}
        onPayment={handlePayment}
      />
    </Box>
  );
};

export default ProductDetail;

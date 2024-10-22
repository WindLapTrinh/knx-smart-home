import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation.jsx";
import CustomHeader from "../shared/pages/CustomHeader.jsx";
import SheetCart from "../shared/common/cart/SheetCart";
import axiosClient from "../shared/config/axios";
import ProductList from "../home/ProductList.jsx";
import {
  Box,
  Text,
  Button,
} from "zmp-ui";
import { BsShop } from "react-icons/bs";
import "../../css/detailhome/product/productDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // To store product details
  const [relatedProducts, setRelatedProducts] = useState([]); // To store related products
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Extract idProduct from state
  const { idProduct } = location.state || {};

  // Fetch product details by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosClient.post(`productdetail?${idProduct}`);
        const productData = response.data?._Product?.[0]; // Lấy sản phẩm đầu tiên
        setProduct(productData || null);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const productResponse = await axiosClient.post("api?apiproduct");
        const filteredProducts = productResponse.data._Product.filter(
          (product) => product.BestSeller === false
        );
        // Lấy 5 sản phẩm liên quan
        setRelatedProducts(filteredProducts.slice(0, 8));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (idProduct) {
      fetchProductDetails();
      fetchRelatedProducts();
    }
  }, [idProduct]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

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
    <Box>
      <CustomHeader title={product.Title.length > 30
                      ? `${product.Title.substring(0, 30)}...`
                      : product.Title} showBackIcon={true} />
      <Box className="container-product">
        <Box className="box-product-header">
          <img src={product.ImagesJson} className="item-image-product" alt="" />
        </Box>
        <Box className="product-detail">
          <Box className="product-info">
            <Text className="product-name">{product.Title}</Text>
            <Text className="product-price">
              {product.Price?.toLocaleString("vi-VN")} đ
            </Text>
            <Button className="add-to-cart-button" onClick={handleAddCart}>
              Thêm vào giỏ
            </Button>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.Content }}
            />
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.Des }}
            />
          </Box>
        </Box>

        <Box className="related-products">
          <div className="icon-related-products">
            <BsShop />
          </div>
          <Text className="related-products-title">Sản phẩm liên quan</Text>
          <Box className="related-products-list">
            {relatedProducts.map((relatedProduct) => (
              <Box key={relatedProduct.Id} className="related-product-item">
                <img
                  src={relatedProduct.ImagesJson}
                  alt={relatedProduct.Title}
                  className="related-product-image"
                />
                <Text className="related-product-name">{relatedProduct.Title.length > 10
                      ? `${relatedProduct.Title.substring(0, 10)}...`
                      : relatedProduct.Title}</Text>
                <Text className="related-product-price">{relatedProduct.Price?.toLocaleString("vi-VN")} đ</Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box mt={2}>
          <ProductList searchTerm={searchTerm}/>
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
    </Box>
  );
};

export default ProductDetail;

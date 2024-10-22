import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation.jsx";
import CustomHeader from "../shared/pages/CustomHeader.jsx";
import SheetCart from "../shared/common/cart/SheetCart";
import axiosClient from "../shared/config/axios"; // Axios for API calls
import ProductList from "../home/ProductList.jsx";
import { Box, Text, Button } from "zmp-ui";
import { BsShop } from "react-icons/bs";
import "../../css/detailhome/product/productDetail.css";

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); // To store product details
  const [relatedProducts, setRelatedProducts] = useState([]); // To store related products
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  // Fetch product details and related products by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosClient.post(`productdetail?${productId}`);
        const productData = response.data?._Product || {};
        setProduct(productData);
        setRelatedProducts(productData.relatedProducts || []); // Set related products
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

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
      <CustomHeader title={product.Title} showBackIcon={true} />
      <Box className="container-product">
        {/* Product details */}
        <Box className="product-detail">
          <Box>
            <img src={product.ImagesJson || "https://placehold.co/100x100"} alt="" />
          </Box>
          <Box className="product-info">
            <Text className="product-name">{product.Title}</Text>
            <Text className="product-price">
              {/* Use optional chaining and fallback for price */}
              {product?.Price?.toLocaleString("vi-VN") || "N/A"} đ
            </Text>
            <Text className="product-description">{product.Content}</Text>
            <Button className="add-to-cart-button" onClick={handleAddCart}>
              Thêm vào giỏ
            </Button>
          </Box>
        </Box>

        {/* Related products */}
        <Box className="related-products">
          <div className="icon-related-products">
            <BsShop />
          </div>
          <Text className="related-products-title">Sản phẩm liên quan</Text>
          <Box className="related-products-list">
            {relatedProducts.map((relatedProduct) => (
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
                  {relatedProduct.price?.toLocaleString("vi-VN") || "N/A"} đ
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Other product lists */}
        <Box mt={2}>
          {/* <ProductList /> */}
        </Box>

        {/* Navigation and cart */}
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

import React, { useState } from "react";
import { Box, Text, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import SheetCart from "../shared/common/cart/SheetCart";
import "../../css/detailhome/product/listProduct.css";

const ProductByCategory = ({ products }) => {
  const navigate = useNavigate();
  const [visibleSheets, setVisibleSheets] = useState({}); // Quản lý trạng thái của từng sản phẩm

  const handleDetailProduct = (productId) => {
    navigate(`/detailProduct`, { state: { idProduct: productId } });
  };

  const handleSetActiveSheet = (productId) => {
    setVisibleSheets((prev) => ({
      ...prev,
      [productId]: true, // Mở `SheetCart` cho sản phẩm cụ thể
    }));
  };

  const handleCloseSheet = (productId) => {
    setVisibleSheets((prev) => ({
      ...prev,
      [productId]: false, // Đóng `SheetCart` cho sản phẩm cụ thể
    }));
  };

  const handleAddToCart = (productId) => {
    // Logic thêm sản phẩm vào giỏ hàng
    handleCloseSheet(productId); // Đóng SheetCart sau khi thêm vào giỏ hàng
  };

  const handlePayment = (productId) => {
    handleCloseSheet(productId); // Đóng SheetCart và điều hướng đến trang giỏ hàng
    navigate("/homeCart");
  };

  return (
    <Box className="product-grid">
      {products && products.length > 0 ? (
        <Box className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div className="space-y-2 product-index" key={product.Id}>
              <div onClick={() => handleDetailProduct(product.Id)}>
                <Box className="w-full aspect-square relative">
                  <img
                    loading="lazy"
                    src={product.ImagesJson}
                    className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
                    alt={product.Title}
                  />
                </Box>
                <Text className="product-name-item">
                  {product.Title.length > 35
                    ? `${product.Title.substring(0, 35)}...`
                    : product.Title}
                </Text>
              </div>
              <Text size="xxSmall" className="text-gray pb-2">
                <span className="product-price">
                  {product.Price.toLocaleString("vi-VN")} vnđ
                </span>
                <span onClick={() => handleSetActiveSheet(product.Id)}>
                  <Icon className="product-icon" icon="zi-plus-circle-solid" />
                </span>
              </Text>
              <SheetCart
                product={product}
                visible={visibleSheets[product.Id]} // Hiển thị SheetCart cho sản phẩm tương ứng
                onClose={() => handleCloseSheet(product.Id)}
                onAddToCart={() => handleAddToCart(product.Id)}
                onPayment={() => handlePayment(product.Id)}
              />
            </div>
          ))}
        </Box>
      ) : (
        <Box mt={4} pl={2}>
          <Text>Không có sản phẩm nào theo danh mục này!</Text>
        </Box>
      )}
    </Box>
  );
};

export default ProductByCategory;

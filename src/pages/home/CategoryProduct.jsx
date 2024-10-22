import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import { HiMiniShoppingCart } from "react-icons/hi2";
import axiosClient from "../shared/config/axios";
import "../../css/detailhome/swiper/swiper-bundle.min.css";
import Loading from "../shared/pages/Loading";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [showAll, setShowAll] = useState({}); // To track "show all" state per category

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch products
        const productResponse = await axiosClient.post("api?apiproduct");
        console.log("Product Response:", productResponse.data); // Log the response

        const filteredProducts = productResponse.data._Product.filter(
          (product) => product.BestSeller === true
        );
        setProducts(filteredProducts);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProductsAndCategories();
  }, []);

  if(loading){
    return <Loading/>
  }
  const handleDetailProduct = (id) =>{
    navigate(`/detailProduct`,{state: {idProduct :id}});
  }

  return (
    <Box className="product-today">
      <Box className="header-slider-category mb-4">
        <div className="infomation-sale">
          <div className="icon-product-today">
            <HiMiniShoppingCart />
          </div>
          <Text.Title size="small" className="title-product">
            Sản phẩm hot
          </Text.Title>
        </div>
      </Box>
      <Box mt={2} className="category-product">
        <Box className="slider-category p-4">
          {products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            products.map((product) => (
              <div
                key={product.Id}
                className="custom-slider-item flex flex-col space-y-2 items-center category-item"
                onClick={() => handleDetailProduct(product.Id)}
              >
                <img
                  className="custom-border-image"
                  src={product.ImagesJson}
                  alt={product.Title}
                />
                <Text size="xxSmall" className="custom-text-gray">
                  <span className="name-product-today">
                    {product.Title.length > 18
                      ? `${product.Title.substring(0, 18)}...`
                      : product.Title}
                  </span>
                  <span className="price-product-today">{product.Price?.toLocaleString("vi-VN")} vnđ</span>
                </Text>
              </div>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryProduct;

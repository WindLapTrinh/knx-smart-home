import React, { useState, useEffect } from "react";
import { Box, Tabs } from "zmp-ui";
import { useLocation } from "react-router-dom"; 
import ProductList from "@/pages/home/ProductList";
import CustomHeader from "../shared/pages/CustomHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import ProductByCategory from "./ProductByCegory";
import axiosClient from "../shared/config/axios";
import "../../css/detailhome/product/categoryProduct.css";

const CategoryByProduct = () => {
  const location = useLocation();
  const categoryIdFromState = location.state?.categoryId; 

  // console.log("Id danh muc:", categoryIdFromState);
  const [searchTerm, setSearchTerm] = useState(""); 

  const [categories, setCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState(categoryIdFromState || null); 
  console.log("Tab danh muc index:", selectedTab);
  const [products, setProducts] = useState([]);
  console.log("Data product:", products);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    axiosClient
      .post("api?apicategory")
      .then((response) => {
        setCategories(response.data._Category);
        if (categoryIdFromState) {
          setSelectedTab(categoryIdFromState); 
        } else if (response.data._Category.length > 0) {
          setSelectedTab(response.data._Category[0].Id);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [categoryIdFromState]);  

  useEffect(() => {
    if (selectedTab) {
      setLoading(true);
      axiosClient
        .post(`api?catid=${selectedTab}`)
        .then((response) => {
          setProducts(response.data._Product); // Dữ liệu sản phẩm từ API theo catid
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    }
  }, [selectedTab]);

  const handleTabClick = (id) => {
    setSelectedTab(id); 
  };  

  return (
    <Box>
      <CustomHeader title={"Danh mục sản phẩm"} showBackIcon={true} />
      <Box className="by-product">
        <Box className="category-by">
          <Box className="slider-by bg-white p-4">
            <Tabs
              className="horizontal-tabs"
              id="category-tabs"
              scrollable="true"
              defaultActiveKey={selectedTab}
              onChange={handleTabClick}
            >
              {categories.map((category) => (
                <Tabs.Tab key={category.Id} label={category.Title} active={category.id == selectedTab ? "true" : "false"}>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <ProductByCategory products={products}/> 
                  )}
                </Tabs.Tab>
              ))}
            </Tabs>
          </Box>
        </Box>
        <CustomBottomNavigation />
      </Box>
    </Box>
  );
};

export default CategoryByProduct;

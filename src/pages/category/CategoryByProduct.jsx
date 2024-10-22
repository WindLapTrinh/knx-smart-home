import React, { useState } from "react";
import { Box, Tabs } from "zmp-ui";
import ProductList from "@/pages/home/ProductList";
import CustomHeader from "../shared/pages/CustomHeader";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import "../../css/detailhome/product/categoryProduct.css";

const CategoryByProduct = ({ categories, gotoCategory }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      <Box className="by-product">
        <CustomHeader title={"Danh mục sản phẩm"} showBackIcon={true}/>
        <Box className="category-by">
          <Box className="slider-by bg-white p-4">
            <div className="tabs-wrapper">
              <Tabs
                className="horizontal-tabs"
                id="contact-list"
                scrollable="true"
              >
                <Tabs.Tab key="tab1" label="Công tắc thông minh">
                  <ProductList searchTerm={searchTerm} />
                </Tabs.Tab>
                <Tabs.Tab key="tab2" label="Tin tức">
                  <ProductList searchTerm={searchTerm} />
                </Tabs.Tab>
                <Tabs.Tab key="tab3" label="Sản phẩm">
                  <ProductList searchTerm={searchTerm} />
                </Tabs.Tab>
                <Tabs.Tab key="tab4" label="KNX">
                  <ProductList searchTerm={searchTerm} />
                </Tabs.Tab>
                <Tabs.Tab key="tab5" label="Tin công nghệ">
                  <ProductList searchTerm={searchTerm} />
                </Tabs.Tab>
              </Tabs>
            </div>
          </Box>
        </Box>
        <CustomBottomNavigation/>
      </Box>
    </Box>
  );
};

export default CategoryByProduct;

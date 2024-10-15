import React, { useState } from "react";
import { Box, Tabs } from "zmp-ui";
import ProductList from "@/pages/home/ProductList";
import "../../css/detailhome/product/categoryProduct.css";

const CategoryByProduct = ({ categories, gotoCategory }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Box className="by-product">
      <Box className="category-by">
        <Box className="slider-by bg-white p-4">
          <div className="tabs-wrapper">
            <Tabs className="horizontal-tabs" id="contact-list" scrollable="true">
              <Tabs.Tab key="tab1" label="Vegetables">
                <ProductList />
              </Tabs.Tab>
              <Tabs.Tab key="tab2" label="Water">
                <ProductList />
              </Tabs.Tab>
              <Tabs.Tab key="tab3" label="Egg-Meat">
                <ProductList />
              </Tabs.Tab>
              <Tabs.Tab key="tab4" label="Spice">
                <ProductList />
              </Tabs.Tab>
              <Tabs.Tab key="tab5" label="Processed Foods">
                <ProductList />
              </Tabs.Tab>
            </Tabs>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryByProduct;

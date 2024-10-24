import React, { useState } from "react";
import { Box, Tabs } from "zmp-ui";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import ProductNotEvaluate from "./ProductNotEvaluate";
import "../../css/cart/prurchaseHistory.css";

const Home = () => {
 
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
   <Box>
    <CustomStateSet title={"Đánh giá của tôi"}/>
     <Box className="page-evaluate">
      <Box className="history-container">
        <Box className="bg-white p-4">
          <div className="tabs-wrapper">
            <Tabs className="horizontal-tabs" id="purchase-history-tabs" scrollable="true">
              <Tabs.Tab key="tab1" label="Chưa đánh giá">
                <ProductNotEvaluate/>
              </Tabs.Tab>
              <Tabs.Tab key="tab2" label="Đã đánh giá">
              </Tabs.Tab>
              <Tabs.Tab key="tab3" label="Đánh giá người...">
              </Tabs.Tab>
            </Tabs>
          </div>
        </Box>
        <CustomBottomNavigation/>
      </Box>
    </Box>
   </Box>
  );
};

export default Home;

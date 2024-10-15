import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  Box,
  Icon,
  Page,
  Sheet,
  Swiper,
  Text,
  Input,
} from "zmp-ui";
import "../../css/detailHome.css";
import CategoryProduct from "@/pages/home/CategoryProduct";
import ProductList from "@/pages/home/ProductList";
import Slider from "@/pages/home/Slider";
import ServiceStore from "@/pages/home/ServiceStore";
import Introduce from "@/pages/home/Introduce";
import HeaderListProduct from "@/pages/home/HeaderListProduct";

import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import Popup from "@/pages/shared/pages/Popup";
import CustomHeader from "../shared/pages/CustomHeader";
const products = [
  { id: 1, name: "Công tắc", image: "/images/category/cong-tac.png" },
  { id: 2, name: "Thiết bị", image: "/images/category/thiet-bi-an-ninh.png" },
  { id: 3, name: "KNX", image: "/images/category/knx.png" },
  { id: 4, name: "Màn hình", image: "/images/category/man-hinh-thong-minh.png" },
  { id: 5, name: "Buspro", image: "/images/category/buspro.png" },
  { id: 6, name: "Sản phẩm", image: "/images/category/san-pham-khac.png" },
 
];

const gotoCategory = (id) => {
  console.log("Chuyển đến danh mục:", id);
};

const Home = (props) => {
  const navigate = useNavigate();

  const handleServiceStoreClick = (id) => {
    console.log("Category clicked:", id);
    navigate(`/categoryByProduct`);
  };

  //popup
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu popup đã được hiển thị trước đó
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      setShowPopup(true);
      // Đánh dấu popup đã được hiển thị
      localStorage.setItem('popupShown', 'true');
    }
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
  }
  return (
    <Box>
      <CustomHeader title={"KNX Smart Home"} subtitle={"Chào mừng bạn đến với cửa hàng"} imageUrl={"./images/logo/logo-slk.jpg"}/>
    <Page className="home">
 <Popup show={showPopup} onClose={handleClosePopup} />
      <Box className="header-home">
        <Introduce/>
        <ServiceStore
          products={products}
          onServiceStoreClick={handleServiceStoreClick}
        />
        <Slider />
        <CategoryProduct/>
      </Box>
      <Box>
      <HeaderListProduct />
        <ProductList />
      </Box>
      <CustomBottomNavigation />
    </Page>
    </Box>
  );
};

export default Home;

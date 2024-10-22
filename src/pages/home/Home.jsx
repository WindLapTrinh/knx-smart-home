import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Page } from "zmp-ui";
import "../../css/detailHome.css";
import CategoryProduct from "@/pages/home/CategoryProduct";
import Slider from "@/pages/home/Slider";
import ServiceStore from "@/pages/home/ServiceStore";
import Introduce from "@/pages/home/Introduce";
import HeaderListProduct from "@/pages/home/HeaderListProduct";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import Popup from "@/pages/shared/pages/Popup";
import ProductList from "./ProductList";
import CustomHeader from "../shared/pages/CustomHeader";
import axiosClient from "../shared/config/axios";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    axiosClient
      .post("api?apicategory")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleServiceStoreClick = (id) => {
    navigate(`/categoryByProduct`, { state: { categoryId: id } });
  };

  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Box>
      <CustomHeader
        title={"KNX Smart Home"}
        subtitle={"Chào mừng bạn đến với cửa hàng"}
        imageUrl={"./images/logo/logo-knx.jpg"}
      />
      <Page className="home">
        <Popup show={showPopup} onClose={handleClosePopup} />
        <Box className="header-home">
          <Introduce />
          <ServiceStore
            categories={categories}
            onServiceStoreClick={handleServiceStoreClick}
          />
          <Slider />
          <CategoryProduct />
        </Box>
        <Box>
          <HeaderListProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          <ProductList searchTerm={searchTerm} />
        </Box>
        <CustomBottomNavigation />
      </Page>
    </Box>
  );
};

export default Home;

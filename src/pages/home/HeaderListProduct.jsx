import React from "react";
import { Box, Input, Text } from "zmp-ui";
import { FaHotjar } from "react-icons/fa";
import "../../css/detailhome/product/headerListProduct.css";

const HeaderListProduct = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="header-container">
      <div className="header-list-product">
        <div className="icon-list-product">
          <FaHotjar />
        </div>
        <div className="title-list-product">
          <Text>Sản phẩm hot</Text>
        </div>
      </div>
      <div className="input-search-product">
        <Input.Search
          placeholder="tìm kiếm sản phẩm..."
          size="small"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HeaderListProduct;

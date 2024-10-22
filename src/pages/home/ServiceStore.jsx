import React from "react";
import { Box, Text } from "zmp-ui";
import "../../css/detailhome/serviceStore.css";

const ServiceStore = ({ categories, onServiceStoreClick }) => {
  const categoryList = categories?._Category || [];

  return (
    <Box className="detail-service">
      <Box className="service-store">
        <Box className="slider-container bg-white p-4">
          {categoryList.map((category) => (
            <div
              key={category.Id}
              className="slider-item flex flex-col space-y-2 items-center"
              onClick={() => onServiceStoreClick(category.Id)}
            >
              <img
                className="w-12 h-12 boder-image"
                src={category.ImageUrl || "https://placehold.co/60x60"}
                alt={category.Title}
              />
              <Text size="xxSmall" className="text-service">
                {category.Title}
              </Text>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ServiceStore;
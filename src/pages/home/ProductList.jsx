import React from "react";
import { Box, Text } from "zmp-ui";
import ProductItem from "@/pages/home/ProductItem";
import SetTitleHeader from "@/pages/shared/hooks/setTitleHeader";
import "../../css/detailhome/product/listProduct.css";

const sampleProducts = [
  {
    name: "Xà lách thủy tinh",
    image: "/images/product/veg-1.jpg",
    category: "Rau xà lách",
    price: "10.000",
    sold: "20",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 2,
    name: "Cải bẹ xanh",
    image: "/images/product/veg-2.jpg",
    category: "Rau xà lách",
    price: "20.000",
    sold: "230",
    icon: "zi-plus-circle-solid",

  },
  {
    id: 3,
    name: "Bắp cải trắng",
    image: "/images/product/veg-3.jpg",
    category: "Rau xà lách",
    price: "30.000",
    sold: "40",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 4,
    name: "Rau mồng tơi",
    image: "/images/product/veg-4.jpg",
    category: "Rau xà lách",
    price: "40.000",
    sold: "16",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 5,
    name: "Rau dền",
    image: "/images/product/veg-5.jpg",
    category: "Rai cải xanh",
    price: "50.000",
    sold: "24",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 6,
    name: "Cải bẹ dún",
    image: "/images/product/veg-6.jpg",
    category: "Rai cải xanh",
    price: "60.000",
    sold: "18",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 7,
    name: "Cải ngồng",
    image: "/images/product/veg-7.jpg",
    category: "Rai cải xanh",
    price: "70.000",
    sold: "32",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 8,
    name: "Rau đắng",
    image: "/images/product/veg-8.jpg",
    category: "Rai cải xanh",
    price: "80.000",
    sold: "12",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 9,
    name: "Xu hào xanh",
    image: "/images/product/veg-9.jpg",
    category: "Rai cải xanh",
    price: "90.000",
    sold: "14",
    icon: "zi-plus-circle-solid",
  },
  {
    id: 10,
    name: "Chanh không hạt",
    image: "/images/product/veg-10.jpg",
    category: "Rai cải xanh",
    price: "10.000",
    sold: "26",
    icon: "zi-plus-circle-solid",
  },
];

const ProductList = () => {
  SetTitleHeader({
    title : "Danh sách sản phẩm",
});
  // Nhóm sản phẩm theo danh mục
  const groupedProducts = sampleProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <Box className="list-product">
      {Object.entries(groupedProducts).map(([category, products]) => (
        <Box key={category} mt={4}>
          <Box
            className="title-category"
            flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Text fontWeight="bold" className="title-category-product" fontSize="lg">
              {category}
            </Text>
            <Text className="all-product" fontSize="sm" color="blue" cursor="pointer">
              Tất cả
            </Text>
          </Box>
          <Box className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;

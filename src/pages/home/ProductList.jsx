import React, { useEffect, useState } from "react";
import axiosClient from "../shared/config/axios";
import { Box, Text } from "zmp-ui";
import ProductItem from "@/pages/home/ProductItem";
import Loading from "../shared/pages/Loading";
import "../../css/detailhome/product/listProduct.css";

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Categories state
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [showAll, setShowAll] = useState({}); // To track "show all" state per category

  // Fetch both products and categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axiosClient.post("api?apicategory");
        setCategories(categoryResponse.data?._Category || []);

        // Fetch products
        const productResponse = await axiosClient.post("api?apiproduct");
        const filteredProducts = productResponse.data._Product.filter(
          (product) => product.BestSeller === false
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

  // Apply search term to filter products
  const filteredProducts = products.filter((product) =>
    product.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get category name by matching catid with the category Id
  const getCategoryName = (catid) => {
    const category = categories.find((cat) => cat.Id === catid);
    return category ? category.Title : "Unknown Category";
  };

  // Group products by catid
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.catid]) {
      acc[product.catid] = [];
    }
    acc[product.catid].push(product);
    return acc;
  }, {});

  // Handle "Show All" button click
  const handleShowAll = (categoryId) => {
    setShowAll((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle showAll state for this category
    }));
  };

  if (loading) {
    return <Loading/>; // Show loading text
  }

  if (error) {
    return <Text color="red">{error}</Text>; // Show error message
  }

  return (
    <Box>
      <Box className="list-product">
        {Object.entries(groupedProducts).length === 0 ? (
          <Text>Không có sản phẩm nào !</Text> // Show message when no products are found
        ) : (
          Object.entries(groupedProducts).map(([categoryId, products]) => (
            <Box key={categoryId} mt={4}>
              <Box
                className="title-category"
                flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Text
                  fontWeight="bold"
                  className="title-category-product"
                  fontSize="lg"
                >
                  {getCategoryName(Number(categoryId))}
                </Text>
                <Text
                  className="all-product"
                  fontSize="sm"
                  color="blue"
                  cursor="pointer"
                  onClick={() => handleShowAll(categoryId)}
                >
                  {showAll[categoryId] ? "Thu gọn" : "Tất cả"}
                </Text>
              </Box>
              <Box className="grid grid-cols-2 gap-4">
                {products
                  .slice(0, showAll[categoryId] ? products.length : 6) // Show all or just 6 products
                  .map((product) => (
                    <ProductItem
                      key={product.Id}
                      product={{
                        id: product.Id,
                        name: product.Title,
                        image: product.ImagesJson,
                        price: product.Price,
                      }}
                    />
                  ))}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ProductList;

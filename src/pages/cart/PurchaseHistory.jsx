import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Tabs } from "zmp-ui";
import CustomBottomNavigation from "../shared/components/CustomBottomNavigation";
import CustomHeader from "../shared/pages/CustomHeader";
import UpdateCart from "@/pages/shared/pages/UpdateCart.jsx";
import { useAddress } from "../shared/common/cart/AddressContext";
import axiosClient from "../shared/config/axios";
import "../../css/cart/prurchaseHistory.css";
import "../../css/notify/notifyPage.css"

const PurchaseHistory = () => {
  const location = useLocation();
  const { address } = useAddress();
  const defaultAddress = address.find((addr) => addr.isDefault);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [orders, setOrders] = useState([]);
  console.log("Data Order:", orders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .post(`api?orderphone=0833012475`)
      .then((response) => {
        // Check if response.data.order is a string, then parse it.
        const orderData =
          typeof response.data.order === "string"
            ? JSON.parse(response.data.order).reverse()
            : response.data.order.reverse();
        setOrders(orderData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error calling API for Purchase History", error);
        setLoading(false);
      });
  }, [defaultAddress]);

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.OrderStatus === status);
  };

  return (
    <Box>
      <CustomHeader title={"Lịch sử đặt hàng"} showBackIcon={true} />
      <Box className="purchase-history">
        <Box className="history-container">
          <Box className="slider-history bg-white p-4">
            <div className="tabs-wrapper">
              <Tabs className="horizontal-tabs" id="purchase-history-tabs" scrollable="true">
                <Tabs.Tab key="tab1" label="Tất cả">
                  {orders.map((order) => (
                    <UpdateCart key={order.OrderCode} order={order} />
                  ))}
                </Tabs.Tab>
                <Tabs.Tab key="tab2" label="Đơn mới">
                  {getOrdersByStatus("NEW").map((order) => (
                    <UpdateCart key={order.OrderCode} order={order} />
                  ))}
                </Tabs.Tab>
                <Tabs.Tab key="tab3" label="Đang giao">
                  {getOrdersByStatus("DELIVERING").map((order) => (
                    <UpdateCart key={order.OrderCode} order={order} />
                  ))}
                </Tabs.Tab>
                <Tabs.Tab key="tab4" label="Đã hoàn thành">
                  {getOrdersByStatus("SUCCESS").map((order) => (
                    <UpdateCart key={order.OrderCode} order={order} />
                  ))}
                </Tabs.Tab>
                <Tabs.Tab key="tab5" label="Đã hủy">
                  {getOrdersByStatus("CANCELLED").map((order) => (
                    <UpdateCart key={order.OrderCode} order={order} />
                  ))}
                </Tabs.Tab>
              </Tabs>
            </div>
          </Box>
          <CustomBottomNavigation />
        </Box>
      </Box>
    </Box>
  );
};

export default PurchaseHistory;

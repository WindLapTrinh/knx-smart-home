import React, { useState, useEffect } from "react";
import { Icon, Text, List, Avatar, Box, Spinner } from "zmp-ui";
import "../styles/app.css";

const Loading = () =>{
    return(
        <div className="page-loading">
          <Text.Title size="small">Đang nạp dữ liệu...</Text.Title>
          <Box
            mt={6}
            flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              visible
              logo={"/images/logo/logo-knx.jpg"}
            />
          </Box>
        </div>
    );
}
export default Loading;
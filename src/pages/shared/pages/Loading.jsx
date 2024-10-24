import React, { useState, useEffect } from "react";
import { Icon, Text, List, Avatar, Box, Spinner } from "zmp-ui";
import "../styles/app.css";

const Loading = () =>{
    return(
        <div className="page-loading">
          <Box
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
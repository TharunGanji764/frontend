import React from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { LoaderBox, LoaderContainer, TextFadeOut } from "./Styles";

const fillText = keyframes`
  0%,100% { width: 0%;opacity:0; }
  50% { width: 100%;opacity:1; }
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const Loader = ({ loading }: { loading: boolean }) => {
  if (!loading) return;
  return (
    <LoaderContainer>
      <Box sx={{ textAlign: "center" }}>
        <LoaderBox $filltext={fillText}>
          <Typography fontSize={"2.5rem"}>ShopHub</Typography>
        </LoaderBox>
        <TextFadeOut $fadeOut={fadeInOut}>Quality Curated</TextFadeOut>
      </Box>
    </LoaderContainer>
  );
};

export default Loader;

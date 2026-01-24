import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import RatingBreakdown from "@/components/molecules/Reviews/RatingBreakdown";
import ReviewList from "@/components/molecules/Reviews/ReviewList";

export default function ProductTabs({ product }: any) {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ mt: 6 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Description" />
        <Tab label="Specifications" />
        <Tab label="Reviews" />
      </Tabs>

      {tab === 0 && <Box sx={{ mt: 2 }}>{product?.description}</Box>}
      {tab === 1 && <Box sx={{ mt: 2 }}>{product.specifications}</Box>}
      {tab === 2 && (
        <Box sx={{ mt: 2 }}>
          {/* <RatingBreakdown ratings={product.ratingBreakdown} /> */}
          <ReviewList reviews={product?.reviews} />
        </Box>
      )}
    </Box>
  );
}

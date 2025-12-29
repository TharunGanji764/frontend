import Slider from "react-slick";
import { Box } from "@mui/material";

export default function ProductGallery({ images }: { images: string[] }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
  };

  return (
    <Box>
      <Slider {...settings}>
        {images.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            loading="lazy"
            sx={{
              width: "100%",
              borderRadius: 2,
            }}
          />
        ))}
      </Slider>
    </Box>
  );
}

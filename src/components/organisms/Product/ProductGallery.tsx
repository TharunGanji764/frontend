import Slider from "react-slick";
import { Box } from "@mui/material";
import { CommonCarouselStyles } from "@/components/commonStyles/styles";
import { GalleryCard } from "./styles";

export default function ProductGallery({ images }: { images: any[] }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <GalleryCard>
      <CommonCarouselStyles>
        <Slider {...settings}>
          {images?.map((img: any) => (
            <Box
              id="image"
              key={img?.id}
              sx={{
                height: 420,
              }}
            >
              <Box
                component="img"
                src={img?.image_url}
                loading="lazy"
                sx={{
                  width: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Slider>
      </CommonCarouselStyles>
    </GalleryCard>
  );
}

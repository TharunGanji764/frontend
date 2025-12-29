import Slider from "react-slick";
import { Box, Button, Typography } from "@mui/material";

const banners = [
  { id: 1, title: "Latest Electronics", image: "/banner1.jpg" },
  { id: 2, title: "Fashion Trends 2025", image: "/banner2.jpg" },
  { id: 3, title: "Home Essentials", image: "/banner3.jpg" },
  { id: 4, title: "Big Deals Today", image: "/banner4.jpg" },
];

export default function HeroCarousel() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Slider {...settings}>
        {banners.map((item) => (
          <Box
            key={item.id}
            sx={{
              height: { xs: 240, md: 360 },
              background: `linear-gradient(
                rgba(0,0,0,0.35),
                rgba(0,0,0,0.35)
              ), url(${item.image}) center/cover`,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              px: { xs: 3, md: 6 },
            }}
          >
            <Box>
              <Typography
                variant="h3"
                color="#fff"
                gutterBottom
                sx={{ fontSize: { xs: "1.6rem", md: "2.4rem" } }}
              >
                {item.title}
              </Typography>

              <Button variant="contained" size="large">
                Shop Now
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

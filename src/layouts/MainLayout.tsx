import { Box, Container } from "@mui/material";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import AnnouncementBar from "@/components/molecules/AnnouncementBar";
import MobileBottomNav from "@/components/organisms/Header/MobileBottomNav";
import ScrollToTop from "@/components/atoms/ScrollToTop";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <Container maxWidth={false} sx={{ maxWidth: 1920 }}>
        <Box minHeight="70vh">{children}</Box>
      </Container>
      <Footer />
      <ScrollToTop />
      <MobileBottomNav />
    </>
  );
}

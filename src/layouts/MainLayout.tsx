import { Box, Container } from "@mui/material";
import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";
import AnnouncementBar from "@/components/molecules/AnnouncementBar";
import MobileBottomNav from "@/components/organisms/Header/MobileBottomNav";
import ScrollToTop from "@/components/atoms/ScrollToTop";
import { usePathname } from "next/navigation";
import { useGetCategoriesQuery } from "@/store/api/apiSlice";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const path = usePathname();
  const PROTECTED_ROUTES = ["/auth/login", "/auth/register"];
  useGetCategoriesQuery();

  return (
    <>
      {!PROTECTED_ROUTES?.includes(path) && <AnnouncementBar />}
      {!PROTECTED_ROUTES?.includes(path) && <Header />}
      <Container maxWidth={false} sx={{ padding: "0px !important" }}>
        <Box minHeight="100vh" padding="0vw 1.25vw">
          {children}
        </Box>
      </Container>
      {!PROTECTED_ROUTES?.includes(path) && <Footer />}
      {!PROTECTED_ROUTES?.includes(path) && <ScrollToTop />}
      {!PROTECTED_ROUTES?.includes(path) && <MobileBottomNav />}
    </>
  );
}

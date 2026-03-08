import Head from "next/head";
import AuthLayout from "@/components/organisms/Auth/AuthLayout";
import RegisterForm from "@/components/organisms/Auth/RegisterForm";
import Link from "next/link";
import { Typography, Box, alpha } from "@mui/material";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Join ShopHub | Create Account</title>
        <meta
          name="description"
          content="Join the ShopHub community as a buyer or seller."
        />
      </Head>

      <AuthLayout title="Start your journey">
        <RegisterForm />

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Already have an account?
            <Link
              href="/auth/login"
              style={{
                color: "#1976d2",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </AuthLayout>
    </>
  );
}

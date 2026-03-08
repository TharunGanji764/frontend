import Head from "next/head";
import AuthLayout from "@/components/organisms/Auth/AuthLayout";
import LoginForm from "@/components/organisms/Auth/LoginForm";
import Link from "next/link";
import { Typography, Box, Stack } from "@mui/material";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Shop Hub</title>
        <meta name="description" content="Login to your Shop Hub account" />
      </Head>

      <AuthLayout title="Welcome Back">
        <LoginForm />

        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ mt: 4 }}
        >
          <Typography variant="body2" color="text.secondary">
            Don't have an account?
          </Typography>
          <Link
            href="/auth/register"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          >
            Create Account
          </Link>
        </Stack>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const token = req?.cookies?.access_token;
  if (token) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};

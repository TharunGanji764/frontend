import Head from "next/head";
import AuthLayout from "@/components/organisms/Auth/AuthLayout";
import LoginForm from "@/components/organisms/Auth/LoginForm";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Shop Hub</title>
        <meta name="description" content="Login to your Shop Hub account" />
      </Head>

      <AuthLayout title="Login">
        <LoginForm />
        <Typography sx={{ mt: 2 }} variant="body2">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register">Register</Link>
        </Typography>
      </AuthLayout>
    </>
  );
}

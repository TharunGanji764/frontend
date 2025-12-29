import Head from "next/head";
import AuthLayout from "@/components/organisms/Auth/AuthLayout";
import RegisterForm from "@/components/organisms/Auth/RegisterForm";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Shop Hub</title>
        <meta name="description" content="Create a Shop Hub account" />
      </Head>

      <AuthLayout title="Create Account">
        <RegisterForm />
        <Typography sx={{ mt: 2 }} variant="body2">
          Already have an account? <Link href="/auth/login">Login</Link>
        </Typography>
      </AuthLayout>
    </>
  );
}

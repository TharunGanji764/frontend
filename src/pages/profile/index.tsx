import Head from "next/head";
import ProfileLayout from "@/components/organisms/Profile/ProfileLayout";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>My Account | Shop Hub</title>
        <meta
          name="description"
          content="Manage your profile, orders and addresses"
        />
      </Head>
      <ProfileLayout />
    </>
  );
}

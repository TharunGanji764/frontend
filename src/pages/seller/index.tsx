import { ComingSoon } from "@/components/organisms/seller/ComingSoon";

export default function SellerPage() {
  return (
    <>
      <ComingSoon title={"Dashboard"} />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const token = req?.cookies?.access_token;
  if (!token) {
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

import StripeWrapper from "./Wrapper";

type Props = {
  clientSecret: string;
  orderId: string;
  amount: number;
};

const Page = ({ clientSecret, orderId, amount }: Props) => {
  return (
    <StripeWrapper
      clientSecret={clientSecret}
      orderId={orderId}
      amount={amount}
    />
  );
};

export const getServerSideProps = async (context: any) => {
  const { req, query } = context;
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${query?.orderId}/payment`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req?.cookies?.access_token}`,
    },
  });
  if (res?.ok) {
    const data = await res?.json();
    console.log('data: ', data);
    return {
      props: {
        clientSecret: data?.clientSecret,
        orderId: data?.paymentId,
        amount: data?.amount,
      },
    };
  }
  return {
    props: {},
  };
};

export default Page;

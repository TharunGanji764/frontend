// StripeWrapper.tsx
import { stripePromise } from "@/utils/stripeProvider";
import { Elements } from "@stripe/react-stripe-js";
import PaymentScreen from "./PaymentScreen";

type Props = {
  clientSecret?: string;
  orderId?: string;
  amount?: number;
};

const StripeWrapper = ({
  clientSecret = "",
  orderId = "",
  amount = 0,
}: Props) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentScreen orderId={orderId} amount={amount} />
    </Elements>
  );
};

export default StripeWrapper;

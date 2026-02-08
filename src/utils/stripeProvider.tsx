// stripe.ts
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51Svx907XEAejfB9X7vCzftFlISLJ24CUwIPmXphuGepx18djewi4xRhSIjPvBZrIJV2PfXWm1vrDOUU9Wz3CxHfP00PvNwxMRv",
);

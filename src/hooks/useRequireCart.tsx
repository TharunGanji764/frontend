import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

export default function useRequireCart() {
  const items = useSelector((s: RootState) => s.cart.items);
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) router.push("/cart");
  }, [items]);
}

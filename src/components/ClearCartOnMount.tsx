"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function ClearCartOnMount() {
  const { clear, hydrated } = useCart();
  useEffect(() => {
    if (hydrated) clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);
  return null;
}

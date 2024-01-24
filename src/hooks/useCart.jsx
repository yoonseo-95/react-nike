import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, removeFromCart, addOrUpdateToCart } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdatedItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );
  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });
  return { cartQuery, addOrUpdatedItem, removeItem };
}

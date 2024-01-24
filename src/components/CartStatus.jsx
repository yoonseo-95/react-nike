import React from "react";
import "./CartStatus.scss";
import { IoCartOutline } from "react-icons/io5";
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();
  const hasProducts = products && products.length > 0;
  return (
    <div className="cart-length">
      <IoCartOutline className="cartIcon" />

      {hasProducts ? (
        <p className="length">{products.length}</p>
      ) : (
        <p className="length-out"></p>
      )}
    </div>
  );
}

import React from "react";
import "../pages/MyCart/MyCart.scss";

export default function PriceCard({ text, price }) {
  const productPrice = new Intl.NumberFormat().format(price);
  return (
    <div className="priceCardWrap">
      <p className="priceText">{text}</p>
      <p className="price">{productPrice}원</p>
    </div>
  );
}

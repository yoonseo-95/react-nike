import React from "react";
import "./ProductCard.scss";

export default function ProductCard({
  product: { id, image, title, subTitle, price, color, color1 },
}) {
  const productPrice = new Intl.NumberFormat().format(price);

  const preventColorPicker = (e) => {
    e.preventDefault();
  };
  return (
    <li className="product">
      <img src={image} alt={title} />
      <div>
        <div>
          <span>{subTitle}</span>
          <h3>{title}</h3>
          <input
            type="color"
            defaultValue={color}
            onClick={preventColorPicker}
          />
          <input
            type="color"
            defaultValue={color1}
            onClick={preventColorPicker}
          />
        </div>
        <div>
          <p>{productPrice}원</p>
        </div>
      </div>
    </li>
  );
}

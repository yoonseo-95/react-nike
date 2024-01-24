import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import "../pages/MyCart/MyCart.scss";
import useCart from "../hooks/useCart";
import { useNavigate } from "react-router";

export default function CartItem({
  product,
  product: {
    id,
    image,
    title,
    quantity,
    price,
    category,
    colorName,
    isSelected,
  },
  onToggleSelect,
}) {
  const { addOrUpdatedItem, removeItem } = useCart();

  const handleCheckboxChange = () => {
    onToggleSelect(id, !isSelected);
  };
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdatedItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdatedItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(id);

  const productPrice = new Intl.NumberFormat().format(price);

  const btnTitle = ["바로구매", "관심상품", "삭제하기"];

  const navigate = useNavigate();
  const [btn, setBtn] = useState(0);
  const handleClick = (index) => {
    setBtn(index);

    if (index === 2) {
      handleDelete();
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        id={`product_${id}`}
        name={`product_${id}`}
        className="checkProduct"
        checked={isSelected}
        onChange={handleCheckboxChange}
      />
      <img src={image} alt={title} />
      <>
        <div className="txt">
          <p className="title">{title}</p>
          <p className="category">{category}</p>
          <div className="txt2">
            <p className="quantity">수량&nbsp;&nbsp;{quantity}</p>
            <p className="colorName">색상 - {colorName}</p>
          </div>
        </div>
        <p className="price">{productPrice}원</p>
        <div className="quantityWrap">
          <FaMinus onClick={handleMinus} className="minus" />
          <span className="quantity2">{quantity}</span>
          <FaPlus onClick={handlePlus} className="plus" />
        </div>
        <ul className="btn-ul">
          {btnTitle.map((item, index) => {
            return (
              <li
                key={index}
                className={`btn-li ${btn === index ? "on" : ""}`}
                onClick={() => handleClick(index)}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </>
    </li>
  );
}

import React, { useState } from "react";
import useBookmark from "../hooks/useBookmark";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { BookmarkAtom } from "../recoil/RecoilAtoms";
export default function BookmarkItem({
  product: { id, image, title, price, category, isSelected, bookmarkedDate },
  onToggleSelect,
}) {
  const { removeItem } = useBookmark();

  const [bookmark, setBookmark] = useRecoilState(BookmarkAtom);

  const handleCheckboxChange = () => {
    onToggleSelect(id, !isSelected);
  };

  const handleDelete = () => removeItem.mutate(id);

  const productPrice = new Intl.NumberFormat().format(price);

  const [btn, setBtn] = useState(0);
  const btnTitle = ["바로구매", "찜 삭제하기"];

  const handleClick = (index) => {
    setBtn(index);
    if (index === 1) {
      handleDelete();
    }
  };
  return (
    <ul className="bookMarkUl">
      <li>
        <div className="check">
          <p className="date">{bookmarkedDate}</p>
          <input
            type="checkbox"
            id={`product_${id}`}
            name={`product_${id}`}
            className="checkProduct"
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
        </div>
        <img src={image} alt={title} />
        <>
          <div className="txt">
            <a href="/" onClick={(e) => e.preventDefault()}>
              <p className="title">{title}</p>
            </a>
            <p className="category">{category}</p>
          </div>
          <p className="price">{productPrice}원</p>
        </>
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
      </li>
    </ul>
  );
}

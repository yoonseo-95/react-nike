import React, { useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";

export default function Modal({ modal, setModal }) {
  const navigate = useNavigate();
  const btnList = ["계속 쇼핑하기", "장바구니 보기"];
  const [active, setActive] = useState(0);

  const handleActive = (index) => {
    setActive(index);

    if (index === 0) {
      setModal(!modal);
    } else if (index === 1) {
      navigate("/carts");
    }
  };
  return (
    <>
      <div className="modalBg"></div>
      <div className="modalContainer">
        <BsFillCartCheckFill className="icon" />
        <h3>장바구니에 추가되었습니다.</h3>
        {btnList.map((btn, index) => {
          return (
            <button
              key={index}
              className={`cartBtn${index} ${active === index ? "on" : ""}`}
              onClick={() => handleActive(index)}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </>
  );
}

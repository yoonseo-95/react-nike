import React, { useState } from "react";
import "./ProductCard.scss";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";
import { useNavigate } from "react-router";
import useBookmark from "../hooks/useBookmark";
import { useRecoilState } from "recoil";
import { BookmarkAtom } from "../recoil/RecoilAtoms";

export default function ProductCard({
  product,
  product: { id, image, title, subTitleOptions, colors, price, category },
  customWidth,
  customHeight,
  customPosition,
  customImageMargin,
  customH3,
  customWrapper,
}) {
  const productPrice = new Intl.NumberFormat().format(price);

  const [cartItem, setCartItem] = useRecoilState(BookmarkAtom);

  const preventColorPicker = (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  const [bookmarkOn, setBookmarkOn] = useState("");

  const { addOrUpdatedBookMark, removeItem } = useBookmark();
  const [success, setSuccess] = useState();

  const handleBookmark = () => {
    const product = {
      id,
      image,
      title,
      price,
      category,
    };
    if (bookmarkOn) {
      removeItem.mutate(id, {
        onSuccess: () => {
          setBookmarkOn(false);
          setTimeout(() => setSuccess(null), 2000);
        },
      });
    } else {
      addOrUpdatedBookMark.mutate(product, {
        onSuccess: () => {
          setBookmarkOn(true);
          setTimeout(() => setSuccess(null), 2000);
        },
      });
    }
  };

  return (
    <li className={`product ${customWidth} ${customHeight}`}>
      {!bookmarkOn ? (
        <PiHeartDuotone className="bookmark" onClick={handleBookmark} />
      ) : (
        <PiHeartFill
          className={`bookmark ${bookmarkOn ? "on" : ""}`}
          onClick={handleBookmark}
        />
      )}
      <div className={`image-wrapper ${customWrapper}`}>
        <img
          src={image}
          alt={title}
          className={`image ${customImageMargin}`}
          onClick={() => {
            navigate(`/products/${id}`, { state: { product } });
          }}
        />
      </div>
      <div className={`wrap ${customPosition}`}>
        <div className="subTitleOptions">
          {subTitleOptions === "기존" ? (
            <span className="p">{category}</span>
          ) : (
            <span className="subTitle">{subTitleOptions}</span>
          )}
        </div>
        <div className="txt">
          <h3 className={`title ${customH3}`}>{title}</h3>
          <p className="price">{productPrice}원</p>
        </div>

        <div className="color-wrap">
          {colors.map((color, i) => {
            return (
              <input
                key={i}
                type="color"
                defaultValue={color.hex}
                onClick={preventColorPicker}
                className="hex"
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}

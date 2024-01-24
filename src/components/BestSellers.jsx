import React from "react";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";

export default function BestSellers({
  product: { image, title, subTitleOptions, price, hex1, hex2, hex3, category },
}) {
  const productPrice = new Intl.NumberFormat().format(price);

  const preventColorPicker = (e) => {
    e.preventDefault();
  };

  const [bookmarkOn, setBookmarkOn] = useState("");

  const handleBookmark = () => {
    setBookmarkOn(!bookmarkOn);
  };

  return (
    <li className="product">
      {!bookmarkOn ? (
        <PiHeartDuotone className="bookmark" onClick={handleBookmark} />
      ) : (
        <PiHeartFill
          className={`bookmark ${bookmarkOn ? "on" : ""}`}
          onClick={handleBookmark}
        />
      )}
      <img src={image} alt={title} />
      <div className="wrap">
        <div>
          {subTitleOptions === "기존" ? (
            <span className="p">{category}</span>
          ) : (
            <span className="subTitle">{subTitleOptions}</span>
          )}
          <h3>{title}</h3>
          {hex1 && (
            <input
              type="color"
              defaultValue={hex1}
              onClick={preventColorPicker}
              className="hex"
            />
          )}
          {hex2 && (
            <input
              type="color"
              defaultValue={hex2}
              onClick={preventColorPicker}
              className="hex"
            />
          )}
          {hex3 && (
            <input
              type="color"
              defaultValue={hex3}
              onClick={preventColorPicker}
              className="hex"
            />
          )}
        </div>
        <div>
          <p className="price">{productPrice}원</p>
        </div>
      </div>
    </li>
  );
}

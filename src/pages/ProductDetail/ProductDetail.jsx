import React, { useState } from "react";
import Footer from "../Footer/Footer";
import "./ProductDetail.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";
import useCart from "../../hooks/useCart";
import Modal from "../../components/Modal";
import useBookmark from "../../hooks/useBookmark";
import { useAuthContext } from "../../components/context/AuthContext";
import { GoChevronLeft } from "react-icons/go";
import { GoShareAndroid } from "react-icons/go";
import { useRecoilState } from "recoil";
import { BookmarkAtom, CartItemAtom } from "../../recoil/RecoilAtoms";

export default function ProductDetail() {
  const { user } = useAuthContext();
  const { addOrUpdatedItem } = useCart();
  const { addOrUpdatedBookMark, removeItem } = useBookmark();
  const {
    state: {
      product: { id, image, title, description, colors, price, category, size },
    },
  } = useLocation();

  const [cartItem, setCartItem] = useRecoilState(CartItemAtom);
  const [bookmarkOn, setBookmarkOn] = useRecoilState(BookmarkAtom);

  const navigate = useNavigate();
  const productPrice = new Intl.NumberFormat().format(price);

  const [selectedColorImage, setSelectedImage] = useState(
    colors[0]?.colorsFile || image
  );
  const [selectedColor, setSelectedColor] = useState(
    colors[0]?.colorName || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    typeof size === "string"
      ? size.split(",")[0]
      : Array.isArray(size)
      ? size[0]
      : ""
  );
  const handleColorClick = (colorName, colorFile) => {
    setSelectedImage(colorFile);
    setSelectedColor(colorName);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleBookmark = async () => {
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

  // 모달창
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState();

  const isAlreadyCart = cartItem.findIndex((e) => e.id === id) !== -1;

  const handleClick = async () => {
    const product = {
      id,
      image: selectedColorImage,
      title,
      colorName: selectedColor,
      price,
      size: selectedSize,
      quantity: 1,
      category,
    };

    try {
      await addOrUpdatedItem.mutate(product);

      if (isAlreadyCart) {
        setCartItem((prevCart) => [...prevCart, product]);
      }
      setModal(true);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("상품을 추가하는 동안 오류가 발생했습니다.", error);
    }
  };

  const prevHandleClick = () => {
    navigate("/products");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "nike",
        text: "This is the Nike renewal site created by Yoon-seo Oh.",
        url: "https://yoonseo-95.github.io/react-nike/",
      });
    } else {
      alert("공유하기가 지원하지 않는 환경입니다.");
    }
  };

  return (
    <section>
      <div className="detailIcons">
        <GoChevronLeft className="leftIcon" onClick={prevHandleClick} />
        <GoShareAndroid className="shareIcon" onClick={handleShare} />
      </div>
      <div className="detailWrap">
        <div className="imageWrap">
          <img src={selectedColorImage} alt={title} />
        </div>
        <div className="productWrap">
          <p>{category}</p>
          <div className="product-detail">
            <h2 className="title">{title}</h2>
            <span className="price">{productPrice} 원</span>
            <div className="colorImage">
              {colors.map((color, i) => {
                return (
                  <div
                    className={`img ${
                      selectedColor === color.colorName ? "on" : ""
                    }`}
                    key={i}
                    onClick={() =>
                      handleColorClick(color.colorName, color.colorFile)
                    }
                  >
                    <img src={color.colorFile} alt={color.colorName} key={i} />
                  </div>
                );
              })}
            </div>
            <p className="description">{description}</p>
          </div>
          <div className="sizeWrap">
            <span className="size">Size</span>
            <ul className="product-size">
              {String(size)
                .split(",")
                .map((s, index) => {
                  return (
                    <li
                      className={`${s} ${selectedSize === s ? "on" : ""}`}
                      key={index}
                      onClick={() => handleSizeClick(s)}
                    >
                      {s}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="product-cart-buy-wrap">
            {!bookmarkOn ? (
              <PiHeartDuotone className="bookmark" onClick={handleBookmark} />
            ) : (
              <PiHeartFill
                className={`bookmark ${bookmarkOn ? "on" : ""}`}
                onClick={handleBookmark}
              />
            )}
            {modal === true ? (
              <Modal modal={modal} setModal={setModal} />
            ) : null}
            {success && <Modal modal={modal} setModal={setModal} />}
            {user && (
              <button className="cart" onClick={handleClick}>
                장바구니
              </button>
            )}
            {!user && (
              <button
                className="cart"
                onClick={() => {
                  navigate("/login");
                }}
              >
                장바구니
              </button>
            )}
            <button
              className="buy"
              onClick={() => {
                navigate("/carts");
              }}
            >
              바로 구매
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

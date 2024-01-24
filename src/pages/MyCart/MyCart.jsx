import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem";
import { FaPlus, FaEquals } from "react-icons/fa6";
import PriceCard from "../../components/PriceCard";
import "./MyCart.scss";
import Footer from "../Footer/Footer";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { BsCartDash } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { CartItemAtom } from "../../recoil/RecoilAtoms";

const SHIPPING = 3000;

export default function MyCart() {
  const cartItem = useRecoilValue(CartItemAtom);

  const btnList = ["주문하기", "쇼핑 계속하기", "선택상품 삭제"];
  const [btnActive, setBtnActive] = useState(0);
  const { cartQuery, removeItem } = useCart();
  const navigate = useNavigate();

  const isLoading = cartQuery.isLoading;
  const products = cartQuery.data || [];

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const initialSelectedProducts = products.map((product) => ({
        ...product,
        isSelected: true,
      }));
      setSelectedProducts(initialSelectedProducts);
    }
  }, [products]);

  const handleToggleSelect = (productId, isSelected) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === productId ? { ...product, isSelected } : product
      )
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) => ({
        ...product,
        isSelected: !selectedProducts.every((item) => item.isSelected),
      }))
    );
  };

  const totalPrice = selectedProducts.reduce(
    (prev, current) =>
      current.isSelected
        ? prev + parseInt(current.price) * parseInt(current.quantity)
        : prev,
    0
  );

  const handleDeleteSelected = () => {
    const selectedIds = selectedProducts
      .filter((product) => product.isSelected)
      .map((product) => product.id);
    selectedIds.forEach((id) => {
      removeItem.mutate(id);
    });
  };

  const handleActive = (index) => {
    setBtnActive(index);

    if (index === 1) {
      navigate("/react-nike/");
    } else if (index === 2) {
      handleDeleteSelected();
    }
  };
  return (
    <section className="wrap">
      <div className="cartWrap">
        <h2>장바구니</h2>
        {!cartItem.length !== 0 ? (
          <>
            {isLoading && <p>로딩중....</p>}
            <div className="checkDiv">
              <input
                type="checkbox"
                id="allCheck"
                name="allCheck"
                className="allCheck"
                checked={selectedProducts.every(
                  (product) => product.isSelected
                )}
                onChange={handleToggleSelectAll}
              />
              <label htmlFor="allCheck" className="allCheck-label">
                전체선택
              </label>
            </div>
            <div className="productUl">
              <div className="box1">
                <span>상품정보</span>
              </div>
              <div className="box2">
                <span>판매금액</span>
                <span>수량</span>
                <span>선택</span>
              </div>
            </div>
            <ul className="productList">
              {selectedProducts.map((product) => {
                return (
                  <CartItem
                    key={product.id}
                    product={product}
                    onToggleSelect={handleToggleSelect}
                  />
                );
              })}
            </ul>
            <div className="priceCard">
              <PriceCard text="상품 총액" price={totalPrice} />
              <FaPlus className="icon" />
              <PriceCard text="배송액" price={SHIPPING} />
              <FaEquals className="icon" />
              <PriceCard text="총가격" price={totalPrice + SHIPPING} />
            </div>
            <div className="btnWrap">
              {btnList.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`button ${btnActive === index ? "on" : ""} `}
                    onClick={() => handleActive(index)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="cartZero">
            <BsCartDash className="icon" />
            <p className="txt">장바구니에 상품이 없습니다.</p>
          </div>
        )}
        {/* {hasProducts && (

        )} */}
      </div>
      <Footer />
    </section>
  );
}

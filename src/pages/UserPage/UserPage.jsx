import React, { useState } from "react";
import "./UserPage.scss";
import { useAuthContext } from "../../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import MyPageUser from "../../components/MyPageUser";

import {
  AiOutlineMail,
  AiOutlineCreditCard,
  AiOutlineBook,
  AiOutlineDollar,
} from "react-icons/ai";
import Footer from "../Footer/Footer";
import useBookmark from "../../hooks/useBookmark";
import { deleteJoinUser } from "../../api/firebase";

export default function UserPage() {
  const { user } = useAuthContext();

  const userList = [
    "주문목록",
    "상품후기",
    "찜한상품",
    "1:1문의",
    "알림",
    "설정",
    "회원탈퇴",
  ];

  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const activeHandle = (index) => {
    setActive(index);
  };

  const {
    cartQuery: { data: products },
  } = useCart();
  const hasProducts = products && products.length > 0;

  const {
    bookmarkQuery: { data: bookmark },
  } = useBookmark();

  const hasBookmarks = bookmark && bookmark.length > 0;

  const handleDeleteJoin = (e) => {
    e.preventDefault();
    deleteJoinUser(navigate("/"));
  };
  return (
    <>
      <div className="userPageWrap">
        <h3 className="myPage-h3">마이페이지</h3>

        <div className="Div">
          <div className="userDiv">
            <div className="userWrap">{user && <MyPageUser user={user} />}</div>
            <ul className="userUl">
              {userList.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => activeHandle(index)}
                    className={`title ${active === index ? "on" : ""}`}
                  >
                    {index === 6 ? (
                      <a href="#" onClick={handleDeleteJoin}>
                        {item}
                      </a>
                    ) : (
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {item}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="serviceList">
              <li>
                <Link to="/">공지사항</Link>
              </li>
              <li>
                <Link to="/">고객센터</Link>
              </li>
              <li>
                <Link to="/">이용안내</Link>
              </li>
            </ul>
          </div>
          <div className="userContain">
            <ul className="Pagelist">
              <li>
                {!hasBookmarks && (
                  <>
                    <span
                      onClick={() => {
                        navigate(`/bookmark`);
                      }}
                    >
                      0
                    </span>
                    <p className="bookmarkP1">찜한 상품</p>
                  </>
                )}
                {hasBookmarks && (
                  <>
                    <span
                      className="bookmarkLength"
                      onClick={() => {
                        navigate(`/bookmark`);
                      }}
                    >
                      {bookmark.length}
                    </span>
                    <p className="bookmarkP2">찜한 상품</p>
                  </>
                )}
              </li>
              <li>
                <span>0</span>
                상품후기
              </li>
              <li>
                <span>0</span>
                적립금
              </li>
            </ul>
            <ul className="deliveryList">
              <li>
                {!hasProducts && (
                  <>
                    <span>0</span>
                    <p className="cartP1">장바구니</p>
                  </>
                )}
                {hasProducts && (
                  <>
                    <span className="cartLength">{products.length}</span>
                    <p className="cartP2">장바구니</p>
                  </>
                )}
              </li>
              {hasProducts && (
                <li>
                  <FaAngleRight className="icon1" />
                </li>
              )}
              {!hasProducts && (
                <li>
                  <FaAngleRight className="icon" />
                </li>
              )}
              <li>
                <span>0</span>
                결제완료
              </li>
              <li>
                <FaAngleRight className="icon" />
              </li>
              <li>
                <span>0</span>
                배송중
              </li>
              <li>
                <FaAngleRight className="icon" />
              </li>
              <li>
                <span>0</span>
                구매확정
              </li>
            </ul>
            <ul className="userPointWrap">
              <li>
                <AiOutlineMail className="icon" />
                <span>메세지</span>
              </li>
              <li>
                <AiOutlineBook className="icon" />
                <span>쿠폰</span>
              </li>
              <li>
                <AiOutlineCreditCard className="icon" />
                <span>결제</span>
              </li>
              <li>
                <AiOutlineDollar className="icon" />
                <span>포인트</span>
              </li>
            </ul>
            <ul className="userBanner">
              <li className="banner1"></li>
              <li className="banner2"></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

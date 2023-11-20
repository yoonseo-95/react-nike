import React, { useEffect, useState } from "react";
import "./Header.scss";
import {
  IoCartOutline,
  IoAddCircleOutline,
  IoHeartOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import NAV from "./data/Nav";
import User from "../../components/User";

export default function Header({ user, handleLogout }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <header className={scrollPosition < 20 ? "header" : "header-color"}>
      <span className="b"></span>
      <div className="headerWrap">
        <h1 className="logo">
          <Link
            to="/"
            className={scrollPosition < 20 ? "logoLink" : "logo-img"}
          >
            <span className={scrollPosition < 20 ? "blind" : "blind-s"}>
              나이키 로고이미지
            </span>
          </Link>
        </h1>
        <ul className="gnb">
          {NAV.map((menu) => {
            return (
              <li className="list" key={menu.id}>
                <Link
                  to={`/products?category=${menu.id}`}
                  className={scrollPosition < 20 ? "" : "color"}
                >
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="other">
          <li>
            <form action="">
              <IoSearchOutline
                className={scrollPosition < 20 ? "search" : "search_color"}
              />
              <input type="text" name="search" placeholder="search"></input>
            </form>
          </li>
          <li>
            <Link to={"/"} className={scrollPosition < 20 ? "" : "icon_color"}>
              <IoHeartOutline />
            </Link>
          </li>
          <li>
            <Link
              to={"/carts"}
              className={scrollPosition < 20 ? "" : "icon_color"}
            >
              <IoCartOutline />
            </Link>
          </li>
          <li>
            {user && user.isAdmin && (
              <Link
                className={scrollPosition < 20 ? "" : "icon_color"}
                to={"/products/new"}
              >
                <IoAddCircleOutline />
              </Link>
            )}
          </li>
          <li>{user && <User user={user} />}</li>
          <li>
            {!user && (
              <Link to={"/login"}>
                <button
                  className={scrollPosition < 20 ? "login" : "login_color"}
                >
                  login
                </button>
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className={scrollPosition < 20 ? "logout" : "logout_color"}
              >
                logout
              </button>
            )}
          </li>
          {/* <li
            className={
              scrollPosition < 20 ? "mobile-menu" : "mobile-menu-color"
            }
          >
            <IoMenu />
          </li> */}
        </ul>
      </div>
    </header>
  );
}

import React, { useEffect, useState } from "react";
import "./Header.scss";
import {
  IoCartOutline,
  IoAddCircleOutline,
  IoHeartOutline,
  IoMenu,
  IoSearchOutline,
  IoHeart,
  IoCart,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import NAV from "./data/Nav";
import User from "../../components/User";

export default function Header({ user, handleLogout }) {
  useEffect(() => {
    fetch("/data/categories.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPageCategories(data.results);
      });
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  const [pageCategories, setPageCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const menuVisible = (visible) => {
    setVisible(!visible);
  };

  // 북마크

  // const [iconChange, setIconChange] = useState(true);
  // const bookmarkOnClick = () => {
  //   setIconChange(!iconChange);
  // };

  return (
    <header className={scrollPosition < 20 ? "header" : "header-color"}>
      <span className="b"></span>
      <div className="headerWrap" onMouseLeave={() => menuVisible(true)}>
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
            const isMenu = !(menu === "제품");
            return (
              <li
                className="list"
                key={menu.id}
                onMouseEnter={() => {
                  menuVisible(!isMenu);
                }}
              >
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
        {visible && (
          <div className="subWrap">
            <div className="sub">
              <div className="subUL">
                {pageCategories.map((subMenu) => {
                  return (
                    <ul className="subGnb" key={subMenu.category_id}>
                      <li className="subTitle" key={subMenu.category_id}>
                        <h2 className="title">{subMenu.category_name}</h2>
                        {subMenu.sub_categories.map((sub) => {
                          return (
                            <ul className="subList" key={sub.sub_category_id}>
                              <li key={sub.sub_category_id}>
                                <Link
                                  to={`/products?category=${sub.sub_category_id}`}
                                >
                                  {sub.sub_category_name}
                                </Link>
                              </li>
                            </ul>
                          );
                        })}
                      </li>
                    </ul>
                  );
                })}
              </div>

              <div className="bannerWrap">
                <div className="banner"></div>
                <Link to="/">
                  <p>SEE ALL PRODUCTS</p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

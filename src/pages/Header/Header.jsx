import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoAddCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import NAV from "./data/Nav";
import User from "../../components/User";
import CartStatus from "../../components/CartStatus";
import BookmarkStatus from "../../components/BookmarkStatus";
import { logout, onUserStateChange } from "../../api/firebase";
import { useRecoilState } from "recoil";
import { searchQueryState } from "../../recoil/RecoilAtoms";

export default function Header({ user, setUser }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(null);
  const [isMobileSubMenu, setIsMobileSubMenu] = useState(null);
  const [visible, setVisible] = useState("");
  const [value, setValue] = useRecoilState(searchQueryState);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });

    const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    };
    window.addEventListener("scroll", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };

    function handleResize() {
      if (window.innerWidth >= 320) {
        setIsMobileMenuOpen(false);
      }

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [setUser, setScrollPosition, setIsMobileMenuOpen]);

  const handleLogout = () => {
    logout();
  };

  const handleMouseEnter = (menuId) => {
    setVisible(menuId);
  };
  const handleMouseLeave = () => {
    setVisible();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const toggleMobileMenuList = (menuId) => {
    setIsMobileSubMenu(null);
    setIsMobileMenu((prev) => (prev === menuId ? null : menuId));
  };

  const toggleMobileSubMenu = (categoryId, e) => {
    e.stopPropagation();
    setIsMobileSubMenu((prev) => (prev === categoryId ? null : categoryId));
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileMenu(null);
    setIsMobileSubMenu(null);
  };

  const navigate = useNavigate();
  const nowContent = useRef();

  const handleToSearch = (e) => {
    if (e.key === "Enter") {
      console.log("value" + value);
      if (value.trim() !== "") {
        const searchValue = nowContent.current.value;

        console.log("Navigation to /products?search=" + value);
        navigate(`/products?search=${searchValue}`);
      }
    }
  };

  return (
    <header className={scrollPosition < 100 ? "header" : "header-color"}>
      <div className="headerWrap">
        <h1 className="logo">
          <a
            href="/react-nike/"
            className={scrollPosition < 100 ? "logoLink" : "logo-img"}
          >
            <span className={scrollPosition < 100 ? "blind" : "blind-s"}>
              나이키 로고이미지
            </span>
          </a>
        </h1>

        <div
          className={
            scrollPosition < 100 ? "search-other" : "search-other-color"
          }
        >
          <form action="">
            <input
              type="text"
              name="search"
              placeholder="search"
              className="searchInput"
              ref={nowContent}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyUp={handleToSearch}
            />
            <IoSearchOutline className="search-icon" />
          </form>
        </div>
        <ul className="gnb">
          {NAV.map((menu) => {
            return (
              <li
                className={`${menu.name} ${visible === menu.id ? "on" : ""} `}
                key={menu.id}
                onMouseEnter={() => {
                  handleMouseEnter(menu.id);
                }}
                onMouseLeave={handleMouseLeave}
              >
                {menu.menu === "제품" ? (
                  <Link
                    to={`/products`}
                    className={scrollPosition < 100 ? "" : "color"}
                  >
                    {menu.name}
                  </Link>
                ) : (
                  <Link
                    to={menu.path}
                    target="_blank"
                    className={scrollPosition < 100 ? "" : "color"}
                  >
                    {menu.name}
                  </Link>
                )}
                {visible === menu.id && menu.subMenu && (
                  <div
                    className={`subWrap ${visible === menu.id ? "on" : ""}`}
                    key={menu.id}
                  >
                    <div className="sub" key={menu.id}>
                      {menu.subMenu?.map((category) => {
                        return (
                          <div className="subGnb" key={category.category_id}>
                            <h3 className="title">
                              <Link to={`/products`}>
                                {category.category_name}
                              </Link>
                            </h3>
                            <ul>
                              {category.sub_categories?.map((subCategory) => {
                                return (
                                  <li
                                    className="subcategoryLi"
                                    key={subCategory.sub_category_id}
                                  >
                                    <Link to="/products">
                                      {subCategory.sub_category_name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            {category.banner_url && (
                              <div>
                                <Link to="/">
                                  <img
                                    src={`${process.env.PUBLIC_URL}${category.banner_url}`}
                                    alt={category.banner_name}
                                  />
                                </Link>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="other">
          {user && (
            <li className="bookmark">
              <Link
                to="/bookmark"
                className={scrollPosition < 100 ? "" : "icon_color"}
              >
                <BookmarkStatus />
              </Link>
            </li>
          )}
          {!user && (
            <li className="bookmark">
              <Link
                to="/login"
                className={scrollPosition < 100 ? "" : "icon_color"}
              >
                <BookmarkStatus />
              </Link>
            </li>
          )}
          {user && (
            <li className="cart">
              <Link
                to={"/carts"}
                className={scrollPosition < 100 ? "" : "icon_color"}
              >
                <CartStatus />
              </Link>
            </li>
          )}
          {!user && (
            <li className="cart">
              <Link
                to={"/login"}
                className={scrollPosition < 100 ? "" : "icon_color"}
              >
                <CartStatus />
              </Link>
            </li>
          )}

          {user && user.isAdmin && (
            <li className="add">
              <Link
                className={scrollPosition < 100 ? "" : "icon_color"}
                to={"/products/new"}
              >
                <IoAddCircleOutline />
              </Link>
            </li>
          )}

          {user && (
            <li className="userImgbox">
              {user && (
                <Link to="/mypage">
                  <User user={user} />
                </Link>
              )}
            </li>
          )}
          <li className="mobileMenubar">
            <button
              className={
                scrollPosition < 100 ? "mobile-menu" : "mobile-menubar-icon"
              }
              onClick={toggleMobileMenu}
            >
              <IoMenuOutline />
            </button>
          </li>
        </ul>
        {isMobileMenuOpen && (
          <div
            className={scrollPosition < 100 ? "mobileBg" : "mobilBg-scroll"}
            onClick={toggleMobileMenu}
          ></div>
        )}
        {isMobileMenuOpen && (
          <div
            className={`${
              scrollPosition < 100
                ? `mobileGnb ${isMobileMenuOpen ? "show" : ""}`
                : `mobile-mobileGnb ${isMobileMenuOpen ? "show" : ""}`
            }`}
          >
            <button onClick={toggleMobileMenu}>
              <IoCloseOutline />
            </button>
            <ul className="Gnb">
              {NAV.map((menu) => {
                return (
                  <li
                    key={menu.id}
                    className={`${menu.name} ${
                      isMobileMenu === menu.id ? "on" : ""
                    }`}
                    onClick={() => {
                      toggleMobileMenuList(menu.id);
                      toggleMobileMenu();
                      navigate(menu.menu === "제품" ? "/products" : menu.path);
                    }}
                  >
                    {menu.menu === "제품" ? (
                      <Link to="/">
                        {menu.name}
                        <FiChevronDown className="m-icon" />
                      </Link>
                    ) : (
                      <Link to={menu.path} target="_blank">
                        {menu.name}
                        <FiChevronDown className="m-icon" />
                      </Link>
                    )}

                    {isMobileMenu === menu.id && menu.subMenu && (
                      <ul className="subMenu">
                        {menu.subMenu?.map((category) => {
                          return (
                            <li
                              key={category.category_id}
                              className={`${category.category_name} ${
                                isMobileSubMenu === category.category_id
                                  ? "on"
                                  : ""
                              }`}
                              onClick={(e) =>
                                toggleMobileSubMenu(category.category_id, e)
                              }
                            >
                              <Link to="/">{category.category_name}</Link>
                              {isMobileSubMenu === category.category_id && (
                                <ul className="subMenu-sub">
                                  {category.sub_categories?.map((sub) => {
                                    return (
                                      <li
                                        key={sub.sub_category_id}
                                        className={`${sub.sub_category_name} ${
                                          isMobileSubMenu ===
                                          sub.sub_category_name
                                            ? "on"
                                            : ""
                                        }`}
                                      >
                                        <Link
                                          to={`/products`}
                                          onClick={closeMobileMenu}
                                        >
                                          {sub.sub_category_name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="other-gnb">
              {!user && (
                <>
                  <li className="join">
                    <Link to={"/join"} onClick={toggleMobileMenu}>
                      회원가입
                    </Link>
                  </li>
                  <li className="other-login">
                    <Link to={"/login"}>
                      <button onClick={toggleMobileMenu}>로그인</button>
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  {user && user.isAdmin && (
                    <li className="m-add" onClick={toggleMobileMenu}>
                      <Link
                        className={scrollPosition < 100 ? "" : "icon_color"}
                        to={"/products/new"}
                      >
                        <IoAddCircleOutline />
                      </Link>
                    </li>
                  )}
                  {user && (
                    <li className="m-cart" onClick={toggleMobileMenu}>
                      <Link
                        to={"/carts"}
                        className={scrollPosition < 100 ? "" : "icon_color"}
                      >
                        <CartStatus />
                      </Link>
                    </li>
                  )}
                  <li className="m-bookmark" onClick={toggleMobileMenu}>
                    <Link
                      to="/bookmark"
                      className={scrollPosition < 100 ? "" : "icon_color"}
                    >
                      <BookmarkStatus />
                    </Link>
                  </li>
                  {user && (
                    <li onClick={toggleMobileMenu}>
                      <Link to="/mypage">마이페이지</Link>
                    </li>
                  )}
                  <li
                    className={
                      scrollPosition < 100 ? "m-logout" : "m-logout-color"
                    }
                    onClick={toggleMobileMenu}
                  >
                    <button onClick={handleLogout}>로그아웃</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className={scrollPosition < 100 ? "others" : "others-color"}>
        <ul
          className={scrollPosition < 100 ? "others-gnb" : "others-gnb-color"}
        >
          <li>
            <form action="">
              <input
                type="text"
                name="search"
                placeholder="search"
                className="searchInput"
              />
              <IoSearchOutline className="search" />
            </form>
          </li>
          <li>
            <Link to="/">매장 찾기</Link>
          </li>
          <li>
            <Link to="/">고객센터</Link>
          </li>

          {user && (
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to={"/join"}>회원가입</Link>
            </li>
          )}
          <li>
            {!user && (
              <Link to={"/login"}>
                <button
                  className={scrollPosition < 100 ? "login" : "login_color"}
                >
                  로그인
                </button>
              </Link>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className={scrollPosition < 100 ? "logout" : "logout_color"}
              >
                로그아웃
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

import React, { useState } from "react";
import "./Login.scss";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { login, loginWithEmail } from "../../api/firebase";

export default function Login() {
  const handleLogin = () => {
    login();
  };

  const handleEmailLogin = async () => {
    const email = document.querySelector('#login-form [name="userName"]').value;
    const password = document.querySelector(
      '#login-form [name="userPassword"]'
    ).value;
    await loginWithEmail(email, password);
  };

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="Wrap">
      <div className="contain">
        <div className="tabs">
          <div
            className={toggleState === 1 ? "tab active-tab" : "tab"}
            onClick={() => toggleTab(1)}
          >
            회원
          </div>
          <div
            className={toggleState === 2 ? "tab active-tab" : "tab"}
            onClick={() => toggleTab(2)}
          >
            비회원
          </div>
        </div>
        <div className="content-tabs">
          <div className={toggleState === 1 ? "active-content" : "content"}>
            <form
              method="post"
              action=""
              id="login-form"
              // onSubmit={handleEmailLogin}
            >
              <input
                type="text"
                name="userName"
                placeholder="이메일"
                autoComplete="off"
              />
              <input
                type="password"
                name="userPassword"
                placeholder="비밀번호"
                autoComplete="off"
              />
              <label htmlFor="remember-check">
                <input type="checkbox" id="remember-check" />
                <span>아이디 저장하기</span>
              </label>
              <input type="button" value="로그인" onClick={handleEmailLogin} />
            </form>

            <div className="logLink">
              <Link to={"/join"} alt="회원가입">
                <span>회원가입</span>
              </Link>
              <Link to="/" alt="회원가입">
                <span>아이디찾기</span>
              </Link>
              <Link to="/" alt="회원가입">
                <span>비밀번호찾기</span>
              </Link>
            </div>

            <div className="loginWrap">
              <div className="google_login" onClick={handleLogin}>
                <div className="google_logo"></div>
                <span>구글 로그인</span>
              </div>
            </div>
          </div>
          <div className={toggleState === 2 ? "active-content" : "content"}>
            <form method="post" action="" id="nonmember-form">
              <input
                type="text"
                name="userName"
                placeholder="주문자명"
                style={{ marginBottom: "0" }}
                autoComplete="off"
              />
              <input
                type="text"
                name="userNumber"
                placeholder="주문번호 하이픈(-) 포함"
                maxLength="13"
                style={{ marginTop: "10px" }}
                autoComplete="off"
              />
              <input
                type="password"
                name="userPassword"
                placeholder="비회원 주문 비밀번호"
                autoComplete="off"
              />
              <input
                type="button"
                value="비회원 로그인"
                className="nonmember-login"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

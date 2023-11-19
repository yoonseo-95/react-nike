import React from "react";
import "./Footer.scss";
import logo from "../../images/footer_logo1.png";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi";
import { BiLogoFacebook } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="footerWrap">
      <div className="footerBg">
        <div className="footer">
          <ul className="gnb">
            <li>
              <a href="/">새로운 소식</a>
              <ul className="footer-gnb">
                <li>
                  <a href="/">멤버 가입</a>
                </li>
                <li>
                  <a href="/">매장 안내</a>
                </li>
                <li>
                  <a href="/">나이키저널</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">도움말</a>
              <ul className="footer-gnb">
                <li>
                  <a href="/">로그인 안내</a>
                </li>
                <li>
                  <a href="/">주문배송조회</a>
                </li>
                <li>
                  <a href="/">반품 정책</a>
                </li>
                <li>
                  <a href="/">결제 방법</a>
                </li>
                <li>
                  <a href="/">공지사항</a>
                </li>
                <li>
                  <a href="/">문의하기</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/">ABOUT NIKE</a>
              <ul className="footer-gnb">
                <li>
                  <a href="/">소식</a>
                </li>
                <li>
                  <a href="/">채용</a>
                </li>
                <li>
                  <a href="/">투자자</a>
                </li>
                <li>
                  <a href="/">지속가능성</a>
                </li>
              </ul>
            </li>
          </ul>
          <h2 className="footer-logo">
            <a href="/">
              <img src={logo} alt="푸터 로고" />
            </a>
          </h2>
          <p className="footer-p">
            (유)나이키코리아 대표 Kimberlee Lynn Chang Mendes, 킴벌리 린 장
            엔데스 | 서울 강남구 테헤란로 152 강남구 테헤란로 152
            강남파이낸스센터 30층 | 고객센터 전화 문의 080-022-0182 FAX
            02-6744-5880
          </p>
          <div className="footer-other">
            <ul className="icons">
              <li>
                <a href="https://www.instagram.com/nike/"> 
                  <BsTwitter />
                </a>
              </li>
              <li>
                <a href="/">
                  <BiLogoFacebook />
                </a>
              </li>
              <li>
                <a href="/">
                  <BsInstagram />
                </a>
              </li>
              <li>
                <a href="/">
                  <FiYoutube />
                </a>
              </li>
            </ul>
            <ul className="other">
              <li>
                <a href="/">이용약관</a>
              </li>
              <li>
                <a href="/">개인정보처리방침</a>
              </li>
              <li>
                <a href="/">위치 기반 서비스 약관</a>
              </li>
              <li>
                <a href="/">영상정보처리기기 운영 방침</a>
              </li>
            </ul>
          </div>
          <span>©2023 Oh YoonSeo. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect } from "react";
import "./Trending.scss";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Trending() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <section className="TrendingWrap">
      <div className="trending-txt">
        <h3
          data-aos="fade-down"
          data-aos-easing="ease-in-out"
          data-aos-duration="800"
          data-aos-delay="1200"
          data-aos-once="true"
        >
          trending
        </h3>
      </div>
      <div className="trending">
        <div
          className="banner1"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="1300"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
        >
          <div className="banner1-txt">
            <h2>나이키 에어포스 1'07</h2>
            <p>
              튼튼하게 스티치로 처리된 오버레이와 깔끔한 마감처리로
              <br />
              절제된 화려함과 빛나는 존재감을 만나보세요.
            </p>
            <button>
              <Link to={"/products"}>구매하기</Link>
            </button>
          </div>
        </div>
        <div className="bannerWrap">
          <div
            className="banner2"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="1300"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          >
            <div className="banner2-txt">
              <h2>나이키 러닝화</h2>
              <p>
                가벼운 착화감으로 편안한
                <br />
                러닝을 경험해 보세요.
              </p>
              <button>
                <Link to={"/products"}>구매하기</Link>
              </button>
            </div>
          </div>
          <div
            className="banner3"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="1300"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          >
            <div className="banner3-txt">
              <h2>나이키 컬러감</h2>
              <p>
                포인트 컬러로 나만의 룩을
                <br />
                완성해보세요.
              </p>
              <button>
                <Link to={"/products"}>구매하기</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

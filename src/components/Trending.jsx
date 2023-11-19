import React from "react";
import "./Trending.scss";

export default function Trending() {
  return (
    <section className="TrendingWrap">
      <div className="trending-txt">
        <span className="bg_txt2">HOT</span>
        <h3>trending</h3>
      </div>
      <div className="trending">
        <div className="banner1">
          <div className="banner1-txt">
            <h2>나이키 에어포스 1'07</h2>
            <p>
              튼튼하게 스티치로 처리된 오버레이와 깔끔한 마감처리로
              <br />
              절제된 화려함과 빛나는 존재감을 만나보세요.
            </p>
            <button>
              <a href="/">구매하기</a>
            </button>
          </div>
        </div>
        <div className="bannerWrap">
          <div className="banner2">
            <div className="banner2-txt">
              <h2>나이키 러닝화</h2>
              <p>
                부드러운 촉감과 가벼운 착화감으로
                <br />
                자유로운 러닝을 경험해 보세요.
              </p>
              <button>
                <a href="/">구매하기</a>
              </button>
            </div>
          </div>
          <div className="banner3">
            <div className="banner3-txt">
              <h2>나이키 컬러감</h2>
              <p>
                어떤 아이템과 편안하게 어울리는
                <br />
                컬러감으로 나만의 룩을 완성해보세요.
              </p>
              <button>
                <a href="/">구매하기</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

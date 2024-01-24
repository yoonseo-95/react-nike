import React from "react";
import "./Map.scss";
import { SlLocationPin, SlPaperPlane, SlEarphonesAlt } from "react-icons/sl";

import { Link } from "react-router-dom";

export default function BasicMap() {
  return (
    <section className="content">
      <div className="wrap">
        <div className="box1">
          <SlLocationPin className="icon" />
          <h3>나이키 매장 문의</h3>
          <p>전지역 나이키 매장 위치를 확인하세요.</p>
        </div>
        <div className="box2">
          <SlPaperPlane className="icon" />
          <h3>제품 및 주문 Email문의</h3>
          <Link to="mailto:service@nike.co.kr">
            <p>service@nike.co.kr</p>
          </Link>
        </div>
        <div className="box3">
          <SlEarphonesAlt className="icon" />
          <h3>고객센터 전화 문의</h3>
          <Link to="tel:080-022-0182">
            <p>080-022-0182</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

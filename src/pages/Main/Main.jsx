import React, { useState } from "react";
import "./Main.scss";

export default function Main() {
  const [isBanner1Active, setBanner1IsActive] = useState(1);
  const [isBanner2Active, setBanner2IsActive] = useState(false);
  const [isBanner3Active, setBanner3IsActive] = useState(false);

  const [txtPoint, setTxtPoint] = useState("NIKE");
  const [ptxt, setPtxt] = useState(
    "사계절을 나이키와 나이키만의 스타일로 하루를 시작하세요."
  );

  const handleMouseEnter1 = () => {
    setBanner1IsActive(true);
    setTxtPoint("JORDAN");
    setPtxt("블랙&화이트의 오리지널 감성의 조던을 만나보세요");
  };

  const handleMouseLeave1 = () => {
    setBanner1IsActive(true);
    setBox1(false);
    setBox2(false);
  };
  const handleMouseEnter2 = () => {
    setBanner2IsActive(true);
    setBanner1IsActive(false);
    setTxtPoint("AIR");
    setPtxt("컬러 포인트를 강조한 세련된 런닝화를 만나보세요.");
  };
  const handleMouseLeave2 = () => {
    setBanner2IsActive(false);
    setBox3(false);
  };
  const handleMouseEnter3 = () => {
    setBanner3IsActive(true);
    setTxtPoint("FORCE");
    setPtxt("새로운 컬러감과 디자인을 만나보세요.");
  };
  const handleMouseLeave3 = () => {
    setBanner3IsActive(false);
    setBanner1IsActive(true);
    setBox4(false);
    setBox5(false);
    setTxtPoint("NIKE");
  };
  const [box1, setBox1] = useState(false);
  const handleClick = () => {
    setBox1(!box1);
  };
  const [box2, setBox2] = useState(false);
  const handleClick2 = () => {
    setBox2(!box2);
  };
  const [box3, setBox3] = useState(false);
  const handleClick3 = () => {
    setBox3(!box3);
  };
  const [box4, setBox4] = useState(false);
  const handleClick4 = () => {
    setBox4(!box4);
  };
  const [box5, setBox5] = useState(false);
  const handleClick5 = () => {
    setBox5(!box5);
  };

  return (
    <main className="main">
      <div className="mainWrap">
        <div className="txt_wrap">
          <div className="txt">
            <h3>{txtPoint}</h3>
            {/* <h3>Air Jordan 1 low</h3> */}
            <p>{ptxt}</p>
            <button>More</button>
          </div>
        </div>
        <div className="product_wrap">
          <div
            className={`banner1 banner ${isBanner1Active ? "active" : ""}`}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
          >
            <span
              className={`detail ${isBanner1Active ? "active" : ""}`}
              onMouseLeave={handleMouseLeave1}
              onClick={handleClick}
            >
              +<div className={`box1 ${box1 ? "on" : ""}`}></div>
            </span>
            <span
              className={`detail ${isBanner1Active ? "active" : ""}`}
              onMouseLeave={handleMouseLeave1}
              onClick={handleClick2}
            >
              +<div className={`box2 ${box2 ? "on" : ""}`}></div>
            </span>
          </div>
          <div
            className={`banner2 banner ${isBanner2Active ? "active" : ""}`}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            <span
              className={`detail detail3 ${isBanner2Active ? "active" : ""}`}
              onMouseLeave={handleMouseLeave2}
              onClick={handleClick3}
            >
              +<div className={`box3 ${box3 ? "on" : ""}`}></div>
            </span>
          </div>
          <div
            className={`banner3 banner ${isBanner3Active ? "active" : ""}`}
            onMouseEnter={handleMouseEnter3}
            onMouseLeave={handleMouseLeave3}
          >
            <span
              className={`detail detail4 ${isBanner3Active ? "active" : ""}`}
              onMouseLeave={handleMouseEnter3}
              onClick={handleClick4}
            >
              +<div className={`box4 ${box4 ? "on" : ""}`}></div>
            </span>
            <span
              className={`detail detail5 ${isBanner3Active ? "active" : ""}`}
              onMouseLeave={handleMouseEnter3}
              onClick={handleClick5}
            >
              +<div className={`box5 ${box5 ? "on" : ""}`}></div>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

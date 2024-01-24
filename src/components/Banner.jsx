import React, { useEffect } from "react";
import "./Banner.scss";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Banner() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="banner-wrap">
      <span
        className="t1"
        data-aos="fade-down"
        data-aos-duration="1500"
        data-aos-delay="400"
      >
        나만의 방식으로 달리자.
      </span>
      <span
        className="t2"
        data-aos="fade-down"
        data-aos-duration="1500"
        data-aos-delay="600"
      >
        부드러운 쿠셔닝과 뛰어난 반응성을 경험하는 곳. NIKE
      </span>
    </section>
  );
}

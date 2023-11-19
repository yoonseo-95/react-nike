import React from "react";
import "./Sport.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "../images/sport1.jpg";
import { Autoplay, Navigation } from "swiper/modules";

// img
import sportImg01 from "../images/sport1.jpg";
import sportImg02 from "../images/sport2.jpg";
import sportImg03 from "../images/sport3.jpg";
import sportImg04 from "../images/sport4.jpg";
import sportImg05 from "../images/sport5.jpg";
import sportImg06 from "../images/sport6.jpg";
import sportImg07 from "../images/sport7.jpg";
import sportImg08 from "../images/sport8.jpg";
import sportImg09 from "../images/sport9.jpg";
import sportImg10 from "../images/sport10.jpg";

export default function Sport() {
  return (
    <section className="sport">
      <h3>Shop By Sport</h3>
      <Swiper
        loop={true}
        rewind={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1200: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          425: {
            slidesPerView: 3,
          },
        }}
        navigation={true}
        freeMode={true}
        slidesPerView={5}
        spaceBetween={20}
        modules={[Autoplay, Navigation]}
        className="sportWrap"
      >
        <SwiperSlide className="slide">
          <img src={sportImg01} alt="축구" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg02} alt="골프" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg03} alt="농구" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg04} alt="테니스" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg05} alt="보드" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg06} alt="헬스" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg07} alt="등산" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg08} alt="럭비" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg09} alt="달리기" />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src={sportImg10} alt="요가" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

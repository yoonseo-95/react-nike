import React, { useContext, useEffect, useState } from "react";
import "./Sport.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

import "../images/sport1.jpg";
import { Autoplay, Navigation } from "swiper/modules";
import { SportsProvider, SportsContext } from "./context/SportsContext";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";

export default function Sport() {
  useEffect(() => {
    AOS.init();
  }, []);

  const sportsContext = useContext(SportsContext);

  const categories = [
    "등산화",
    "스포츠 가방",
    "스케이트 보드화",
    "트레이닝화",
    "테니스화",
  ];

  const { data: products } = useQuery(["products"], getProducts);

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        return (
          product.category === categories[selectedCategory] ||
          product.category.includes(categories[selectedCategory])
        );
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (categoryIndex) => {
    setSelectedCategory(categoryIndex);
  };
  return (
    <SportsProvider>
      <section className="sport">
        <h3 data-aos="fade-down" data-aos-delay="1200" data-aos-duration="1500">
          shop by sport
        </h3>
        <div
          className="sport-filters"
          data-aos="fade-down"
          data-aos-delay="1600"
          data-aos-duration="1500"
        >
          {categories.map((category, index) => {
            return (
              <button
                key={index}
                className={`button ${selectedCategory === index ? "on" : ""}`}
                onClick={() => handleCategoryChange(index)}
              >
                #{category}
              </button>
            );
          })}
        </div>
        <Swiper
          data-aos="fade-down"
          data-aos-delay="1800"
          data-aos-duration="1500"
          loop={true}
          rewind={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            425: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 2,
            },
          }}
          navigation={true}
          freeMode={true}
          slidesPerView={5}
          spaceBetween={20}
          modules={[Autoplay, Navigation]}
          className="sportWrap"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide className="slide" key={product.id}>
              <ProductCard
                key={product.id}
                product={product}
                customWidth="sport-width"
                customHeight="sport-height"
                customPosition="sport-position"
                customImageMargin="sport-imageMargin"
                customH3="sport-title"
                customWrapper="sport-wrapper"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </SportsProvider>
  );
}

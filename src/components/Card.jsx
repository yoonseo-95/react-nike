import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Card.scss";
import ProductCard from "./ProductCard";
import {
  BestSellersContext,
  BestSellersProvider,
} from "./context/BestSellersContext";
import { getProducts } from "../api/firebase";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Card() {
  const { bestSellers, setBestSellers } = useContext(BestSellersContext);
  const { data: products } = useQuery(["products"], getProducts);
  useEffect(() => {
    if (products) {
      const filterBestSellers = products.filter(
        (product) => product.subTitleOptions === "베스트 셀러"
      );
      setBestSellers(filterBestSellers);
    }
  }, [products, setBestSellers]);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <BestSellersProvider>
      <section className="card-wrap">
        <div className="card-txt">
          <h3
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-duration="1500"
          >
            best seller
          </h3>
        </div>
        <ul
          className="card"
          data-aos="fade-down"
          data-aos-delay="300"
          data-aos-duration="1500"
        >
          {bestSellers.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </ul>
      </section>
    </BestSellersProvider>
  );
}

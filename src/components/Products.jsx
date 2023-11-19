import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";
import "./Products.scss";

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  return (
    <>
      <div className="products_banner">
        <h2 className="products_banner_title">PRODUCTS</h2>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="products_category">
        <li>
          <button type="button">전체</button>
        </li>
        <li>
          <button type="button">남성 신발</button>
        </li>
        <li>
          <button type="button">여성 신발</button>
        </li>
        <li>
          <button type="button">가방</button>
        </li>
        <li>
          <button type="button">모자</button>
        </li>
      </ul>
      <ul className="productsWrap">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}

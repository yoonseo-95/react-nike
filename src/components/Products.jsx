import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";
import "./Products.scss";

export default function Products({ filter, searchResults }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  const filteredProducts =
    searchResults.length > 0
      ? searchResults
      : products?.filter((product) => {
          if (filter === "전체") return true;
          if (filter === "남성 신발")
            return (
              product.category.includes("남성") ||
              product.title.includes("남성")
            );
          if (filter === "여성 신발")
            return (
              product.category.includes("여성") ||
              product.title.includes("여성")
            );
          if (filter === "가방")
            return (
              product.category.includes("가방") ||
              product.title.includes("가방")
            );
          if (filter === "모자")
            return (
              product.category.includes("모자") ||
              product.title.includes("모자")
            );
          if (filter === "INCLUDES_키즈")
            return (
              product.category.includes("키즈") ||
              product.title.includes("키즈")
            );
        });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="productsWrap">
        {filteredProducts?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";
import "./Products.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Products({ filter, searchResults }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  const numberOfItem = 44;

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      let filteredByName = products;
      if (searchResults.length > 0) {
        filteredByName = searchResults;
      }
      if (filter !== "전체") {
        filteredByName = filteredByName.filter((product) => {
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
          return true;
        });
      }
      setFilteredProducts(filteredByName);
    }
  }, [filter, isLoading, error, products, searchResults]);

  return (
    <>
      {isLoading && (
        <ul className="SkeletonUl">
          {Array.from({ length: numberOfItem }, (_, index) => (
            <li key={index} className="SkeletonList">
              <Skeleton
                width={"292px"}
                height={"300px"}
                className="SkeletonImage"
              />
              <Skeleton width={"50px"} height={"23px"} />
              <Skeleton
                width={"292px"}
                height={"23px"}
                className="SkeletonTitle"
              />
              <Skeleton width={"50px"} height={"23px"} />
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}

      <ul className="productsWrap">
        {filteredProducts?.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </>
  );
}

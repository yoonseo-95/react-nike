import React, { useEffect, useState } from "react";
import Products from "../../components/Products";
import Footer from "../Footer/Footer";
import "./AllProducts.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  enteredFilterState,
  searchQueryState,
  searchResultsState,
} from "../../recoil/RecoilAtoms";

export default function AllProducts() {
  const [filter, setFilter] = useState("전체");
  const [noResults, setNoResults] = useState(false);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);
  const value = useRecoilValue(searchQueryState);

  const handleFilterChange = (newFilter) => {
    console.log("filter change to:", newFilter);
    setFilter(newFilter);
    setNoResults(false);
  };
  console.log("Filter:", filter);
  console.log("Search Results:", searchResults);

  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (value.length > 0) {
      fetch(`REACT_APP_FIREBASE_DB_URL`)
        .then((response) => response.json())
        .then((responseData) => {
          const results = Object.values(responseData).filter((product) => {
            const productTitle = product.title.toLowerCase();
            const productCategory = product.category.toLowerCase();
            const isTitleMatch = productTitle.includes(value.toLowerCase());
            const isCategoryMatch = productCategory.includes(
              value.toLowerCase()
            );

            return isTitleMatch && isCategoryMatch;
          });

          if (results.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
          }
          setSearchResults(results);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, [searchQuery]);

  return (
    <>
      <div className="products_banner">
        <h2 className="products_banner_title">PRODUCTS</h2>
      </div>
      <ul className="products_category">
        <li>
          <button
            type="button"
            onClick={() => handleFilterChange("전체")}
            className={filter === "전체" ? "on" : ""}
          >
            전체
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilterChange("남성 신발")}
            className={filter === "남성 신발" ? "on" : ""}
          >
            남성 신발
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilterChange("여성 신발")}
            className={filter === "여성 신발" ? "on" : ""}
          >
            여성 신발
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilterChange("가방")}
            className={filter === "가방" ? "on" : ""}
          >
            가방
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilterChange("모자")}
            className={filter === "모자" ? "on" : ""}
          >
            모자
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => handleFilterChange("INCLUDES_키즈")}
            className={filter === "INCLUDES_키즈" ? "on" : ""}
          >
            키즈
          </button>
        </li>
      </ul>
      {noResults && (
        <div className="message">
          <span className="noResults">죄송합니다. 검색 결과가 없습니다.</span>
        </div>
      )}
      {!noResults && (
        <Products
          filter={filter}
          setFilter={setFilter}
          searchResults={searchResults}
        />
      )}
      <Footer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import Products from "../../components/Products";
import Footer from "../Footer/Footer";
import "./AllProducts.scss";
import { useRecoilValue, useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { searchQueryState, searchResultsState } from "../../recoil/RecoilAtoms";
import { fetchProductsFirebase } from "../../api/firebase";

export default function AllProducts() {
  const [filter, setFilter] = useState("전체");
  const [noResults, setNoResults] = useState(false);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setNoResults(false);
  };
  const location = useLocation();

  const searchQueryFromURL = new URLSearchParams(location.search).get("search");
  const searchQuery = useRecoilValue(searchQueryState);
  const [searchResults, setSearchResults] = useRecoilState(searchResultsState);

  useEffect(() => {
    setSearchResults([]);
  }, []);

  useEffect(() => {
    if (searchQueryFromURL) {
      const fetchData = async () => {
        try {
          const results = await fetchProductsFirebase(searchQueryFromURL);
          setSearchResults(results);
          if (results.length === 0) {
            setNoResults(true);
          } else {
            setNoResults(false);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, [searchQueryFromURL, setSearchResults]);

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
      {!noResults && <Products filter={filter} searchResults={searchResults} />}
      <Footer />
    </>
  );
}

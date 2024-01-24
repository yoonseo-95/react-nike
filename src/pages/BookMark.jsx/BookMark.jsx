import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import useBookmark from "../../hooks/useBookmark";
import BookmarkItem from "../../components/BookmarkItem";
import "./BookMark.scss";

export default function BookMark(product) {
  const { bookmarkQuery, removeItem } = useBookmark();
  const products = bookmarkQuery.data || [];
  const hasProducts = products.length > 0;

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const initialSelectedProducts = products.map((product) => ({
        ...product,
        isSelected: true,
      }));
      setSelectedProducts(initialSelectedProducts);
    }
  }, [products]);

  const handleToggleSelectAll = () => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) => ({
        ...product,
        isSelected: !selectedProducts.every((item) => item.isSelected),
      }))
    );
  };

  const handleToggleSelect = (productId, isSelected) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === productId ? { ...product, isSelected } : product
      )
    );
  };

  const handleDeleteSelected = () => {
    const selectedIds = selectedProducts
      .filter((product) => product.isSelected)
      .map((product) => product.id);
    selectedIds.forEach((id) => {
      removeItem.mutate(id);
    });
  };

  return (
    <>
      <div className="BookMarkWrap">
        <h2 className="Bookmark-h2">찜한 상품</h2>

        {hasProducts ? (
          <>
            <div className="checkDiv">
              <input
                type="checkbox"
                id="allCheck"
                name="allCheck"
                className="allCheck"
                checked={selectedProducts.every(
                  (product) => product.isSelected
                )}
                onChange={handleToggleSelectAll}
              />
              <label htmlFor="allCheck" className="allCheck-label">
                전체선택
              </label>

              <button onClick={handleDeleteSelected} className="deleteSelect">
                선택상품 삭제
              </button>
            </div>
            {selectedProducts.map((product) => {
              return (
                <div key={product.id}>
                  <BookmarkItem
                    product={product}
                    onToggleSelect={handleToggleSelect}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <p className="bookmarkZero">찜한 상품이 없습니다.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

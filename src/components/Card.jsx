import React, { useState } from "react";
import "./Card.scss";
import DATA from "./data/CardData";

export default function Card() {
  const [items, setItems] = useState(DATA);
  const filterItem = (cateItem) => {
    const updateItems = DATA.filter((item) => {
      return item.category === cateItem;
    });
    setItems(updateItems);
  };

  return (
    <section className="card-wrap">
      <div className="card-txt">
        <span className="bg_txt1">PRODUCT</span>
        <h3>best seller</h3>
        <ul className="card-list">
          <li>
            <button className="btn" onClick={() => setItems(DATA)}>
              ALL
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => filterItem("SHOES")}>
              SHOES
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => filterItem("BAG")}>
              BAG
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => filterItem("HAT")}>
              HAT
            </button>
          </li>
        </ul>
      </div>
      <div className="card">
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <div className="txtBox">
                  <div className="title">
                    <span className="subTxt">{item.subTxt}</span>
                    <h4>{item.title}</h4>
                    <span className="review">{item.review}</span>
                  </div>
                  <div className="txt">
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <img src={`/images/${item.img}`} alt={item.title} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

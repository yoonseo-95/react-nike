import React, { useState } from "react";
import "./NewProduct.scss";
import { addNewProduct } from "../../api/firebase";
import { uploadImage } from "../../api/uploader";
import Button from "../../components/ui/Button";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      console.log(files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addNewProduct(product, url) //
          .then(() => {
            setSuccess("성공적으로 제품이 추가되었습니다.");
            setTimeout(() => {
              setSuccess(null);
            }, 4000);
          });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className="newProduct">
      <div className="container">
        <h2 className="title">상품등록</h2>
        {success && <p>✅ {success}</p>}
        {file && (
          <div className="img">
            <img src={URL.createObjectURL(file)} alt="local file" />
          </div>
        )}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="file"
            accept="image/*"
            name="file"
            className="file"
            required
            onChange={handleChange}
          />
          <span className="name">제품명</span>
          <input
            className="productName"
            type="text"
            name="title"
            value={product.title ?? ""}
            required
            onChange={handleChange}
          />
          <span className="price">판매가</span>
          <input
            className="productPrice"
            type="number"
            name="price"
            value={product.price ?? ""}
            required
            onChange={handleChange}
          />
          <span className="subTitle">유형</span>
          <input
            className="productSubTitle"
            type="text"
            name="subTitle"
            value={product.subTitle ?? ""}
            required
            onChange={handleChange}
          />
          <span className="category">카테고리</span>
          <input
            className="productCategory"
            type="text"
            name="category"
            value={product.category ?? ""}
            required
            onChange={handleChange}
          />
          <span className="description">제품설명</span>
          <input
            className="productDescription"
            type="text"
            name="description"
            value={product.description ?? ""}
            required
            onChange={handleChange}
          />
          <span className="options">size</span>
          <input
            className="productOptions"
            type="text"
            name="size"
            value={product.size ?? ""}
            placeholder="옵션들(콤마(,)로 구분"
            required
            onChange={handleChange}
          />
          <div className="colorWrap1">
            <span className="color">color1</span>
            <input
              className="colorName1"
              type="text"
              name="colorName1"
              value={product.colorName1 ?? ""}
              required
              onChange={handleChange}
            />
            <input
              className="productColor"
              type="color"
              name="color1"
              value={product.color1 ?? ""}
              required
              onChange={handleChange}
            />
          </div>
          <div className="colorWrap2">
            <span className="color">color2</span>
            <input
              className="colorName2"
              type="text"
              name="colorName2"
              value={product.colorName2 ?? ""}
              required
              onChange={handleChange}
            />
            <input
              className="productColor"
              type="color"
              name="color2"
              value={product.color2 ?? ""}
              placeholder="옵션들(콤마(,)로 구분"
              required
              onChange={handleChange}
            />
          </div>
          <Button
            text={isUploading ? "업로드중..." : "제품 등록하기"}
            disabled={isUploading}
          />
        </form>
      </div>
    </section>
  );
}

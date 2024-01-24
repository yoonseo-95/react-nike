import React, { useCallback, useEffect, useState } from "react";
import "./NewProduct.scss";
import { addNewProduct } from "../../api/firebase";
import { uploadImage } from "../../api/uploader";
import Button from "../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [colorFiles, setColorFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [colorFileUrls, setColorFileUrls] = useState([]);

  const queryClient = useQueryClient();
  const addProductMutation = useMutation(
    async () => {
      const mainImageUrl = file ? await uploadImage(file, false) : null;

      const colorImageUrls = await Promise.all(
        colorFiles.map((colorFile) =>
          colorFile ? uploadImage(colorFile, true) : null
        )
      );

      const updatedColors = colors.map((color, index) => ({
        ...color,
        colorFile: colorImageUrls[index] || null,
      }));

      const productData = {
        ...product,
        image: mainImageUrl,
        colors: updatedColors,
      };
      await addNewProduct(productData, mainImageUrl);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        setSuccess("성공적으로 제품을 등록했습니다.");
      },
      onError: () => {
        setError("문제 발생으로 제품이 등록되지 않습니다.");
      },
    }
  );

  // color 추가 삭제
  const [colors, setColors] = useState([{ colorName: "", hex: "#000000" }]);

  const addColor = () => {
    setColors((prevColors) => [
      ...prevColors,
      { colorName: "", hex: "#000000", colorFile: null },
    ]);
    setColorFiles((prevFiles) => [...prevFiles, null]);
  };

  const removeColor = (idx) => {
    setColors((prevColors) =>
      prevColors.filter((_, colorIndex) => idx !== colorIndex)
    );
    setColorFiles((prevFiles) =>
      prevFiles.filter((_, colorIndex) => idx !== colorIndex)
    );
  };

  const handleProductChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "subTitleOptions") {
      setSelectedOption(value);
    }
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }, []);

  const handleColorChange = useCallback((e, i, fieldType) => {
    const { value } = e.target;
    setColors((prevColors) => {
      return prevColors.map((color, colorIndex) => {
        if (colorIndex === i) {
          return { ...color, [fieldType]: value };
        }
        return color;
      });
    });
  }, []);

  const handleColorFileChange = useCallback((e, index) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const newFile = files[0];

      setColorFiles((prev) => {
        const updatedFiles = [...prev];
        updatedFiles[index] = newFile;
        return updatedFiles;
      });

      const objectURL = URL.createObjectURL(newFile);
      setColorFileUrls((prevUrls) => {
        const updatedUrls = [...prevUrls];
        updatedUrls[index] = objectURL;
        return updatedUrls;
      });
    }
  }, []);

  useEffect(() => {}, [colorFiles, colorFileUrls]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsUploading(true);

      try {
        await addProductMutation.mutateAsync();
      } finally {
        setIsUploading(false);
        setTimeout(() => {
          setError(null);
          setSuccess(null);
        }, 4000);
      }
    },
    [file, product, colors, colorFiles]
  );

  return (
    <section className="newProduct">
      <div className="container">
        <h2 className="title">상품등록</h2>
        {success && <p>✅ {success}</p>}
        {error && <p>❎</p>}
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
            onChange={handleFileChange}
          />
          <span className="name">제품명</span>
          <input
            className="productName"
            maxLength="12"
            type="text"
            name="title"
            placeholder="최대 12byte"
            value={product.title ?? ""}
            required
            onChange={handleProductChange}
          />
          <span className="price">판매가</span>
          <input
            className="productPrice"
            type="number"
            name="price"
            value={product.price ?? ""}
            required
            onChange={handleProductChange}
          />
          <span className="category">카테고리</span>
          <input
            className="productCategory"
            type="text"
            name="category"
            value={product.category ?? ""}
            required
            onChange={handleProductChange}
          />
          <span className="description">제품설명</span>
          <input
            className="productDescription"
            type="text"
            name="description"
            value={product.description ?? ""}
            required
            onChange={handleProductChange}
          />
          <span className="options">size</span>
          <input
            className="productOptions"
            type="text"
            name="size"
            value={product.size ?? ""}
            placeholder="옵션들(콤마(,)로 구분"
            required
            onChange={handleProductChange}
          />

          {colors.map((product, index) => {
            return (
              <div key={index} className="colorWrap">
                <span key={index}>색상명{index + 1}</span>
                <input
                  type="text"
                  name={`colorName${index + 1}`}
                  value={product.colorName ?? ""}
                  onChange={(e) => handleColorChange(e, index, "colorName")}
                  className="colorName"
                  required
                />
                <input
                  type="color"
                  name={`hex${index + 1}`}
                  value={product.hex || "#000000"}
                  onChange={(e) => handleColorChange(e, index, "hex")}
                  className="color"
                  required
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="color-btn-add"
                >
                  +
                </button>

                {colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="color-btn-remove"
                  >
                    -
                  </button>
                )}
                {colorFileUrls[index] && (
                  <div className="img">
                    <img src={colorFileUrls[index]} alt="local file" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleColorFileChange(e, index)}
                  name={`colorFile${index}`}
                  className="colorFile"
                  required
                />
              </div>
            );
          })}
          <span className="subTitle">유형</span>
          <select
            id="select"
            name="subTitleOptions"
            className="subTitleOptions"
            onChange={handleProductChange}
            value={selectedOption}
          >
            <option value="베스트 셀러">베스트 셀러</option>
            <option value="신제품">신제품</option>
            <option value="기존">기존</option>
          </select>
          <Button
            text={isUploading ? "업로드중..." : "제품 등록하기"}
            disabled={isUploading}
          />
        </form>
      </div>
    </section>
  );
}

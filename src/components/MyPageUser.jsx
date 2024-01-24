import React, { useRef, useState } from "react";
import "./MyPageUser.scss";
import { TbSettingsSearch, TbHexagonLetterG } from "react-icons/tb";
import { useAuthContext } from "./context/AuthContext";
import { uploadImage } from "../api/uploader";
import { updateProfile } from "../api/firebase";

export default function MyPageUser() {
  const { user } = useAuthContext();
  const { photoURL, displayName } = user;
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState(photoURL);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setImageURL(objectURL);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      if (file) {
        const newPhotoURL = await uploadImage(file);
        await updateProfile({ photoURL: newPhotoURL });
        setImageURL(newPhotoURL);

        alert("프로필이 업데이트 되었습니다.");
      } else {
      }
    } catch (error) {
      console.log("프로필 업데이트 실패: ", error);
    }
  };

  return (
    <div className="My">
      <div className="imgWrap">
        {imageURL && (
          <img
            src={photoURL}
            alt="프로필 이미지"
            className="MyImg"
            referrerPolicy="no-referrer"
            onChange={handleFileChange}
          />
        )}
        {!imageURL && (
          <img
            src={photoURL}
            alt="프로필 이미지"
            className="MyImg"
            referrerPolicy="no-referrer"
            onChange={handleFileChange}
          />
        )}
      </div>
      <label htmlFor="newFileInput">
        <TbSettingsSearch
          className="newFileInputIcon"
          onClick={handleUpdateProfile}
        />
      </label>
      <input
        type="file"
        name="file"
        id="newFileInput"
        accept="image/*"
        className="newFileInput"
        onChange={handleFileChange}
      />
      <h3>
        <span className="UserName">{displayName}</span> 님
        <TbHexagonLetterG className="icon" />
      </h3>
      <button className="degree">등급별혜택</button>
    </div>
  );
}

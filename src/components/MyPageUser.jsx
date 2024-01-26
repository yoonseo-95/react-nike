import React, { useEffect, useState } from "react";
import "./MyPageUser.scss";
import { TbSettingsSearch, TbHexagonLetterG } from "react-icons/tb";
import { useAuthContext } from "./context/AuthContext";
import { uploadImage } from "../api/uploader";
import { updateProfilePhoto } from "../api/firebase";
import { auth } from "../api/firebase";

export default function MyPageUser() {
  const { user, setUser } = useAuthContext();
  let { photoURL, displayName } = user;
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    setImageURL(photoURL);
  }, [photoURL]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      console.log("handleFileChange 함수 호출됨");
      const objectURL = URL.createObjectURL(selectedFile);
      setImageURL(objectURL);
      try {
        const newPhotoURL = await uploadImage(selectedFile);
        const updatedUser = { ...user, photoURL: newPhotoURL };
        await updateProfilePhoto(auth, updatedUser);

        setUser(updatedUser);
        setImageURL(newPhotoURL);

        window.location.reload();
      } catch (error) {
        console.log("프로필 업데이트 실패: ", error);
      }
    } else {
      console.log("파일이 선택되지 않았습니다.");
    }
  };

  return (
    <div className="My">
      <div className="imgWrap">
        {imageURL && (
          <img
            src={imageURL}
            alt="프로필 이미지"
            className="MyImg"
            referrerPolicy="no-referrer"
            id="profileImage"
          />
        )}
        {!imageURL && (
          <img
            src={photoURL}
            alt="프로필 이미지"
            className="MyImg"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <label htmlFor="newFileInput">
        <TbSettingsSearch className="newFileInputIcon" />
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

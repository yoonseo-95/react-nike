import React, { useState } from "react";
import "./Join.scss";
import Footer from "../Footer/Footer";
import { FaCamera } from "react-icons/fa";
import { signUp } from "../../api/firebase";
import { useNavigate } from "react-router";
import { uploadImage } from "../../api/uploader";

export default function Join() {
  // const [user, setUser] = useState("");
  const [filePreview, setFilePreview] = useState();
  const navigate = useNavigate();

  // const handleJoin = async (userData) => {
  //   try {
  //     let photoURL = null;
  //     if (userData.selectedFile) {
  //       photoURL = await uploadImage(userData.selectedFile);
  //     }

  //     const userCredential = await signUp({
  //       email: userData.email,
  //       password: userData.password,
  //       displayName: userData.displayName,
  //       photoURL: photoURL.toString(),
  //     });

  //     if (userCredential) {
  //       const user = userCredential.user;
  //       setUser({ ...user, photoURL: photoURL.toString() });
  //       navigate("/");
  //       window.location.reload();
  //     } else {
  //       console.error("회원가입 오류: userCredential이 null입니다");
  //     }
  //   } catch (error) {
  //     console.error("회원가입 오류:", error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const userData = {
  //     email: formData.get("userEmail"),
  //     password: formData.get("password"),
  //     displayName: formData.get("displayName"),
  //     selectedFile: formData.get("file"),
  //   };
  //   await handleJoin(userData);
  // };

  // const handleChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setFilePreview(e.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSubmit();
  //   }
  // };

  const handleJoin = async (formData) => {
    try {
      if (formData.get("file")) {
        const photoURL = await uploadImage(formData.get("file"));
        formData.set("photoURL", photoURL.toString());
      }
      const userCredential = await signUp(formData);

      if (userCredential) {
        navigate("/");
        window.location.reload();
      } else {
        console.log("회원가입 오류: userCredential이 null입니다");
      }
    } catch (error) {
      console.log("회원가입 오류:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      let photoURL = null;
      if (formData.get("file")) {
        photoURL = await uploadImage(formData.get("file"));
      }
      const signUpData = {
        email: formData.get("userEmail"),
        password: formData.get("password"),
        displayName: formData.get("displayName"),
        photoURL: photoURL?.toString() || "",
      };

      const userCredential = await signUp(signUpData);

      if (userCredential) {
        navigate("/");
        window.location.reload();
      } else {
        console.log("회원가입 오류: userCredential이 null입니다.");
      }
    } catch (error) {
      console.log("회원가입 오류:", error);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className="Join">
        <div className="JoinContain">
          <h2>회원가입</h2>
          <form method="" action="" id="join-form" onSubmit={handleSubmit}>
            {!filePreview && <div className="img-i"></div>}
            {filePreview && (
              <div className="img">
                <img src={filePreview} alt="local file" />
              </div>
            )}
            <label htmlFor="file" className="fileIconBox">
              <FaCamera className="fileIcon" />
            </label>
            <input
              type="file"
              accept="image/*"
              name="file"
              id="file"
              onChange={handleChange}
              required
            />
            <div className="id">
              <label>이름</label>
              <input
                type="text"
                name="displayName"
                placeholder="이름을 입력해주세요."
                autoComplete="off"
                required
              />
            </div>
            <div className="email">
              <label>이메일</label>
              <input
                type="email"
                name="userEmail"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                placeholder="사용하실 이메일을 입력해주세요."
                autoComplete="off"
                required
              />
            </div>
            <div className="pwd">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                maxLength="15"
                placeholder="사용하실 비밀번호를 6자 이상 입력해주세요."
                autoComplete="off"
                required
              />
            </div>
            <button type="submit" onKeyPress={handleKeyPress}>
              가입 완료
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

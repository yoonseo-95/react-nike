import React from "react";
import "./User.scss";

export default function User({ user }) {
  const { photoURL } = user;
  return (
    <div className="user">
      <img
        src={photoURL}
        alt="프로필이미지"
        className="userImg"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

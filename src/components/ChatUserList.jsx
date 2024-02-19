import React from "react";
import "./ChatUserList.scss";

export default function ChatUserList({ chatInfo }) {
  console.log(chatInfo);
  return (
    <ul className="ChatUserList">
      {chatInfo.map((item, index) => (
        <li key={index}>
          <span>{item.uid} 고객님</span>
          <span>{item.timestamp}</span>
          <img />
        </li>
      ))}
    </ul>
  );
}

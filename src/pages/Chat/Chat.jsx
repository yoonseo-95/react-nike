import React, { useRef, useState } from "react";
import "./Chat.scss";
import { useAuthContext } from "../../components/context/AuthContext";
import { chatRoomsState } from "../../recoil/RecoilAtoms";
import shop from "../../images/shop.png";
import { LuMessagesSquare } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useRecoilState } from "recoil";
import ChatList from "../../components/ChatList";
import UserChatRoom from "../../components/UserChatRoom";

export default function Chat() {
  const { user } = useAuthContext();
  const isAdmin = user?.isAdmin;
  const [selectedUser, setSelectedUser] = useState(null);
  const [onClassEvent, setOnClassEvent] = useState(false);
  const channelRef = useRef(null);
  const [chatRooms, setChatRooms] = useRecoilState(chatRoomsState);

  const toggleActive = () => {
    setOnClassEvent(!onClassEvent);
  };

  const closeChatWrap = (e) => {
    if (channelRef.current && !channelRef.current.contains(e.target)) {
      setOnClassEvent(false);
    }
  };

  return (
    <div className="channel">
      <div
        className={`chat-btn ${onClassEvent ? "on" : ""}`}
        onClick={toggleActive}
      >
        <LuMessagesSquare className="icon" />
      </div>

      <div className={`chat-wrap ${onClassEvent ? "on" : ""}`} ref={channelRef}>
        <div className="chat-header">
          <div className="img1">
            <img src={shop} alt="나이키 매장 이미지" />
          </div>
          <div className="txt">
            <h3 className="chat-user-name">나이키</h3>
            <span>평일 오전 9:00부터 운영해요</span>
          </div>
        </div>
        <div className="chat-container">
          {!isAdmin ? (
            <UserChatRoom
              user={user}
              isAdmin={isAdmin}
              setChatRooms={setChatRooms}
              chatRooms={chatRooms}
              selectedUser={selectedUser}
            />
          ) : (
            <ChatList
              user={user}
              isAdmin={isAdmin}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
        </div>
      </div>

      <div
        className={`close-wrap ${onClassEvent ? "on" : ""}`}
        onClick={closeChatWrap}
      >
        <IoClose className="close" />
      </div>
    </div>
  );
}

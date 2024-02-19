import React, { useRef, useState } from "react";
import "./Channel.scss";
import shop from "../../images/nike_logo_2.png";
import { LuMessagesSquare } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
// import ChatList from "../../components/ChatList";
import { useAuthContext } from "../../components/context/AuthContext";
import { getNonLoggedInUid } from "../../api/firebase";
import UserChatRoom from "../../components/UserChatRoom";
import { IoIosArrowBack } from "react-icons/io";
import { useRecoilState } from "recoil";
import {
  chatInfoState,
  endMessageState,
  showChatRoomState,
} from "../../recoil/RecoilAtoms";
import InputEmoji from "react-input-emoji";
import AdminChatRoom from "../../components/AdminChatRoom";

export default function Channel() {
  const [text, setText] = useState("");
  const [onClassEvent, setOnClassEvent] = useState(false);
  const [endMessage, SetEndMessage] = useRecoilState(endMessageState);
  const [chatInfo, setChatInfo] = useRecoilState(chatInfoState);
  const channelRef = useRef(null);

  const { user } = useAuthContext();
  const isAdmin = user?.isAdmin;
  const userChatRoom = user ? user.displayName : getNonLoggedInUid();

  const toggleActive = () => {
    setOnClassEvent(!onClassEvent);
  };

  const closeChatWrap = (e) => {
    if (channelRef.current && !channelRef.current.contains(e.target)) {
      setOnClassEvent(false);
      setChatInfo([]);
      // setChatMessage([]);
      SetEndMessage("");
    }
  };

  const [showChatRoom, setShowChatRoom] = useRecoilState(showChatRoomState);

  const handleShowChatList = () => {
    setShowChatRoom(!showChatRoom);
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
          {isAdmin && showChatRoom && (
            <IoIosArrowBack className="backIcon" onClick={handleShowChatList} />
          )}
          <div className="img1">
            <img src={shop} alt="나이키 매장 이미지" />
          </div>
          <div className="txt">
            <h3 className="chat-user-name">나이키</h3>
            <span>평일 오전 9:00부터 운영해요</span>
          </div>
        </div>
        <div className="chat-container">
          {isAdmin && <AdminChatRoom handleShowChatList={handleShowChatList} />}
          {!isAdmin && (
            <UserChatRoom
              userChatRoom={userChatRoom}
              isAdmin={isAdmin}
              user={user}
            />
          )}
          {!isAdmin && chatInfo.length > 0 ? (
            <div className="chat-bottom">
              <form>
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  shouldReturn
                  onEnter={() => ({ message: text })}
                  fontFamily="Noto Sans KR"
                  placeholder="메세지를 입력해주세요."
                />
              </form>
            </div>
          ) : (
            <div className="chat-bottom"></div>
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

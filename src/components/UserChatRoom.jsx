import React, { useEffect, useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import shop from "../images/shop.png";
import { FaChevronRight } from "react-icons/fa6";
import {
  endChat,
  getChatMessages,
  getNonLoggedInUid,
  sendMessage,
  startChat,
} from "../api/firebase";
import { useRecoilState } from "recoil";
import { endMessageState } from "../recoil/RecoilAtoms";
import InputEmoji from "react-input-emoji";

export default function UserChatRoom({
  isAdmin,
  user,
  setChatRooms,
  chatRooms,
}) {
  const [text, setText] = useState("");
  const [endMessage, SetEndMessage] = useRecoilState(endMessageState);
  const [infoMessage, setInfoMessage] = useState(
    "문의하기 버튼을 눌러 채팅을 시작하세요."
  );

  const [startChatInfo, setStartChatInfo] = useState(
    "상담이 시작되었습니다. 문의하실 내용을 입력해주세요."
  );
  const chatRoomsArray = chatRooms ? Object.values(chatRooms) : [];

  useEffect(() => {
    const unsubscribe = getChatMessages(null, setChatRooms);
    return () => {
      unsubscribe();
    };
  }, [setChatRooms]);

  const handleSendUserMessage = async () => {
    if (text.trim() === "") return;

    const uid = user ? user.displayName : await getNonLoggedInUid();

    const success = await sendMessage(text, Date.now(), uid, uid, "user");

    if (success) {
      setText("");
    } else {
      console.log("메세지 전송 실패");
    }
  };

  const startChatHandler = async () => {
    try {
      await startChat(setChatRooms, user);
    } catch (error) {
      console.error(error);
    }
  };

  const endChatHandler = async () => {
    try {
      await endChat(user);
      SetEndMessage("상담이 종료되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const timePeriod = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${timePeriod} ${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="info">
      <div className="alarm">
        <AiFillNotification className="alarmIcon" />
        <span>나이키 채팅상담</span>
      </div>
      <div className="img2">
        <img src={shop} alt="나이키 매장 이미지" />
      </div>
      <h3 className="chat-title">NIKE에 문의하기</h3>
      <div className="txt-box">
        <p className="txt-sub">운영시간 보기</p>
        <FaChevronRight className="icon1" />
      </div>
      <div className="chat-box">
        {(!user || (user && !isAdmin)) && (
          <span className="today">{getCurrentTime()}</span>
        )}
        <ul>
          {!isAdmin && (
            <li className="chat-contain-admin">
              <div className="chat-admin">
                <div className="img3">
                  <img src={shop} alt="나이키 매장 이미지" />
                </div>
                <div className="chat-box-txt">
                  <span className="userId">나이키</span>
                  <p>{infoMessage}</p>
                </div>
              </div>
              {!isAdmin && (
                <button
                  type="button"
                  className="startChat"
                  onClick={startChatHandler}
                >
                  문의하기
                </button>
              )}
              {!isAdmin && chatRoomsArray.length > 0 && (
                <button
                  type="button"
                  className="endChat"
                  onClick={endChatHandler}
                >
                  상담 종료
                </button>
              )}
            </li>
          )}
          {chatRoomsArray.length > 0 && startChatInfo && (
            <li>
              <span className="chatInfo">{startChatInfo}</span>
            </li>
          )}
          {chatRoomsArray.map((room) => {
            return room.messages
              ? Object.values(room.messages).map((messageData, index) => {
                  console.log("messageData:", messageData);
                  const { message, userType } = messageData;
                  if (userType === "user") {
                    return (
                      <li key={index} className="chatUser-u">
                        <span className="UserMessage-u">{message}</span>
                      </li>
                    );
                  } else if (userType === "admin") {
                    return (
                      <li key={index} className="chatAdmin-a">
                        <span className="AdminMessage-a">{message}</span>
                      </li>
                    );
                  } else {
                    return null;
                  }
                })
              : null;
          })}
          {chatRoomsArray.length > 0 && (
            <li>
              <span className="endMessage">{endMessage}</span>
            </li>
          )}
        </ul>
      </div>
      {(!user && chatRoomsArray.length > 0) ||
      (user && chatRoomsArray.length > 0) ? (
        <div className="chat-bottom">
          <form>
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              shouldReturn
              onEnter={handleSendUserMessage}
              fontFamily="Noto Sans KR"
              placeholder="메세지를 입력해주세요."
            />
          </form>
        </div>
      ) : (
        <div className="chat-bottom"></div>
      )}
    </div>
  );
}

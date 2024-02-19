import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { showChatRoomState } from "../recoil/RecoilAtoms";
import InputEmoji from "react-input-emoji";
import { getChatMessages, sendMessage } from "../api/firebase";
import { BsArrowLeft } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import userImage from "../images/userImg.jpg";

export default function AdminChatRoom({
  selectedUser,
  chatRooms,
  onBack,
  setChatRooms,
}) {
  const [text, setText] = useState("");
  const showChatRoom = useRecoilValue(showChatRoomState);
  const chatRoomsArray = chatRooms ? Object.values(chatRooms) : [];

  useEffect(() => {
    let unsubscribe;
    if (selectedUser && selectedUser.uid) {
      unsubscribe = getChatMessages(selectedUser.uid, setChatRooms);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedUser, setChatRooms]);

  const handleSendAdminMessage = async () => {
    if (text.trim() === "") return;

    const success = await sendMessage(
      text,
      Date.now(),
      selectedUser,
      selectedUser,
      "admin"
    );

    if (success) {
      setText("");
    } else {
      console.log("메세지 전송 실패");
    }
  };

  const handleBackToList = () => {
    onBack();
  };

  return (
    <div className="admin-chat-room">
      {selectedUser && (
        <div className={`user-chat-room ${showChatRoom ? "show" : ""}`}>
          <div className="user-chat-header">
            <BsArrowLeft className="leftIcon" onClick={handleBackToList} />
            {chatRoomsArray
              .filter((item) => item.uid === selectedUser)
              .map((item, index) => {
                return (
                  <div key={index} className="userImg">
                    <img src={item.img || userImage} alt="" />
                  </div>
                );
              })}
            <div className="ChatBox">
              {selectedUser && <h3>{selectedUser} 고객님</h3>}
              <div className="box-length">
                <FaUserLarge className="ChatUserIcon" />
                <p className="userLength">2</p>
              </div>
            </div>
          </div>
          <div className="user-chat-wrap">
            <ul>
              {chatRoomsArray.map((room) =>
                room.messages
                  ? Object.values(room.messages).map((message, index) => {
                      if (message.uid === selectedUser) {
                        return (
                          <li
                            key={index}
                            className={
                              message.userType === "admin"
                                ? "chatAdmin"
                                : "chatUser"
                            }
                          >
                            <span
                              className={
                                message.userType === "admin"
                                  ? "AdminMessage"
                                  : "UserMessage"
                              }
                            >
                              {message.message}
                            </span>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })
                  : null
              )}
            </ul>
          </div>
          <div className="chat-input">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              shouldReturn
              onEnter={handleSendAdminMessage}
              fontFamily="Noto Sans KR"
              placeholder="메세지를 입력해주세요."
            />
          </div>
        </div>
      )}
    </div>
  );
}

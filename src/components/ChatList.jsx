import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { chatRoomsState } from "../recoil/RecoilAtoms";
import { database } from "../api/firebase";
import AdminChatRoom from "./AdminChatRoom";
import { onValue, ref } from "firebase/database";
import userImage from "../images/userImg.jpg";

export default function ChatList({ selectedUser, setSelectedUser, user }) {
  const [chatRooms, setChatRooms] = useRecoilState(chatRoomsState);
  const chatRoomsArray = chatRooms ? Object.values(chatRooms) : [];
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const getCurrentTime = () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const timePeriod = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${timePeriod} ${formattedHours}:${formattedMinutes}`;
  };

  const getLastMessage = (roomId) => {
    const uidMessages = chatRooms[roomId]?.uid_messages;
    if (!uidMessages) return null;

    const lastMessageKey = Object.keys(uidMessages).pop();
    return uidMessages[lastMessageKey];
  };

  useEffect(() => {
    const chatRef = ref(database, "chatRooms");
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const chatData = snapshot.val() || [];
      setChatRooms(chatData);
    });

    return () => unsubscribe();
  }, [setChatRooms]);

  useEffect(() => {}, [selectedUser]);

  const handleUserClick = (userInfo) => {
    setSelectedUser(userInfo.uid);
  };

  return (
    <>
      {!chatRoomsArray || chatRoomsArray.length === 0 ? (
        <span className="chatNon">✖ 채팅 목록이 없어요..</span>
      ) : (
        !selectedUser &&
        chatRoomsArray.map((userInfo, index) => (
          <div
            className="userChatList"
            key={index}
            onClick={() => handleUserClick(userInfo)}
          >
            <div className="imgDiv">
              <img src={userInfo.img || userImage} />
            </div>
            <div className="userDiv">
              <span className="userName" key={index}>
                {userInfo.uid} 고객님
              </span>
              <p className="msg">{getLastMessage(userInfo.room)?.message}</p>
            </div>
            <div className="Div">
              <span className="DivToday">{getCurrentTime()}</span>
              <span className="a">a</span>
            </div>
          </div>
        ))
      )}

      {selectedUser && (
        <AdminChatRoom
          user={user}
          selectedUser={selectedUser}
          selectedRoomId={selectedRoomId}
          chatRooms={chatRooms}
          setChatRooms={setChatRooms}
          onBack={() => setSelectedUser(null)}
        />
      )}
    </>
  );
}

import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import useBookmark from "../hooks/useBookmark";
import "./BookmarkStatus.scss";

export default function BookmarkStatus() {
  const {
    bookmarkQuery: { data: bookmark },
  } = useBookmark();
  const hasProducts = bookmark && bookmark.length > 0;
  return (
    <div className="bookmark-length">
      <IoHeartOutline />

      {hasProducts ? (
        <p className="length">{bookmark.length}</p>
      ) : (
        <p className="length-out"></p>
      )}
    </div>
  );
}

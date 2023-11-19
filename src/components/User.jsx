import React from 'react';
import "./User.scss";

export default function User({user: {photoURL, displayName}}) {
  return (
    <div className="user">
      <img
       src={photoURL} 
       alt={displayName} 
       className="userImg"
       referrerPolicy="no-referrer"
      />
    </div>
  );
}


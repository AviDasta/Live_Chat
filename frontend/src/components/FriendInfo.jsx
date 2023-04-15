import React from "react";
import { FaCaretSquareDown } from "react-icons/fa";

const FriendInfo = ({ currentFriend, activeUser, message }) => {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={`./image/${currentFriend.image}`} alt="" />
        </div>
        {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.userId === currentFriend._id) ? (
          <div className="active-user">מחובר/ת</div>
        ) : (
          ""
        )}

        <div className="name">
          <h4>{currentFriend.userName}</h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>צ'ט מותאם אישית</h3>
          <FaCaretSquareDown />
        </div>

        <div className="privacy">
          <h3>פרטיות ותמיכה </h3>
          <FaCaretSquareDown />
        </div>

        <div className="media">
          <h3>מדיה, קישורים ומסמכים</h3>
          <label htmlFor="gallery">
            {" "}
            <FaCaretSquareDown />{" "}
          </label>
        </div>
      </div>

      <div className="gallery">
        {message && message.length > 0
          ? message.map((m, index) => {
              m.message.image && (
                <img key={index} src={`./image/${m.message.image}`} />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default FriendInfo;

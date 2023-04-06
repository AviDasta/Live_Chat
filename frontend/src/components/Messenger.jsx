import React, { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import { useDispatch, useSelector } from "react-redux";
import RightSide from "./RightSide";
import {
  getFriends,
  messageSend,
  getMessage,
  ImageMessageSend,
} from "../store/actions/messengerAction";
import { io } from "socket.io-client";

const Messenger = () => {
  const scrollRef = useRef();
  const socket = useRef();

  const { friends, message } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);
  
  console.log(socket);
  const inputHendle = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      reseverId: currentFriend._id,
      message: newMessage ? newMessage : "❤",
    };
    dispatch(messageSend(data));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);
  useEffect(() => {
    dispatch(getMessage([currentFriend?._id]));
  }, [currentFriend?._id]);
  useEffect(() => {
    scrollRef.current?.scrollIntroView({ behavior: "smooth" });
  }, [message]);

  const emojiSend = (emu) => {
    setNewMessage(`${newMessage}` + emu);
  };

  const imageSend = (e) => {
    if (e.target.files.length !== 0) {
      const imageName = e.target.files[0].name;
      const newImageName = Date.now() + "-" + imageName;

      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("imageName", newImageName);
      formData.append("reseverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(ImageMessageSend(formData));
    }
  };
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./image/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>{myInfo.userName}</h3>
                </div>
                <div className="icons">
                  <div className="icon">
                    <FaEllipsisH />
                  </div>
                  <div className="icon">
                    <FaEdit />
                  </div>
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              <ActiveFriend />
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      onClick={() => setCurrentFriend(fd)}
                      className={
                        currentFriend._id === fd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                    >
                      <Friends friend={fd} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            inputHendle={inputHendle}
            newMessage={newMessage}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            imageSend={imageSend}
          />
        ) : (
          "בחר בבקשה משתמש"
        )}
      </div>
    </div>
  );
};

export default Messenger;

import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="message-show">
        {message && message.length > 0
          ? message.map((m) =>
              m.senderId === myInfo.id ? (
                <div ref={scrollRef} className="my-message">
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">
                        {" "}
                        {m.message.text === "" ? (
                          <img alt="" src={`./image/${m.message.image}`} />
                        ) : (
                          m.message.text
                        )}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="time"></div>
                </div>
              ) : (
                <div ref={scrollRef} className="fd-message">
                  <div className="image-message-time">
                    <img src={`./image/${currentFriend.image}`} alt="" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text">
                          {" "}
                          {m.message.text === "" ? (
                            <img alt="" src={`./image/${m.message.image}`} />
                          ) : (
                            m.message.text
                          )}
                        </p>
                      </div>
                      <div className="time"></div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
      </div>
      {typingMessage &&
      typingMessage.msg &&
      typingMessage.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={`./image/${currentFriend.image}`} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time">...מקליד/ה</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;

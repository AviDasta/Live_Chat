import React, { useEffect } from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import { useDispatch } from "react-redux";
import RightSide from "./RightSide";
import { getFriends } from "../store/actions/messengerAction";

const Messenger = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src="/image/1507587287ariyan.jpg" alt="" />
                </div>
                <div className="name">
                  <h3>היי אבי</h3>
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
              <div className="hover-friend">
                <Friends />
              </div>
            </div>
          </div>
        </div>
        <RightSide />
      </div>
    </div>
  );
};

export default Messenger;

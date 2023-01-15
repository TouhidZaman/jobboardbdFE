import React from "react";
import { useSelector } from "react-redux";

import { useGetUserByIdQuery } from "features/users/usersAPI";

const Conversation = ({ conversation, onClick }) => {
  const { user } = useSelector((state) => state.auth);
  const friendId = conversation.members.find((m) => m !== user._id);
  const { data: friend = {} } = useGetUserByIdQuery(friendId, { skip: !friendId });

  return (
    <div
      onClick={onClick}
      className="flex space-x-2 align-middle mt-4 cursor-pointer hover:bg-[rgb(245, 243, 243)]"
    >
      <img
        className="w-6 h-6 rounded-full object-cover"
        src={
          friend?.photoURL
            ? friend.photoURL
            : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
        alt=""
      />
      <span className="">{`${friend?.firstName} ${friend?.lastName}`}</span>
    </div>
  );
};

export default Conversation;

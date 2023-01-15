import React from "react";
import TimeAgo from "timeago-react";

const Message = ({ message, isSender }) => {
  return (
    <div className={`flex flex-col mt-4 w-full ${isSender ? "items-end" : ""}`}>
      <div className="flex space-x-2 items-center">
        <img
          className="w-6 h-6 rounded-full object-cover"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={`text-black  bg-[rgb(245, 241, 241)] p-4 rounded-lg`}>
          {message.text}
        </p>
      </div>
      <div className="mt-1">
        <TimeAgo className="text-sm" datetime={message.createdAt} locale="bn" />
      </div>
    </div>
  );
};

export default Message;

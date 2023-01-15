import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useGetChatsByUserQuery,
  useGetMessagesByChatIdQuery,
} from "features/chat/chatAPI";
import { useGetUserByIdQuery } from "features/users/usersAPI";
import Conversation from "./Conversation";
import Message from "./Message";

const Messenger = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data: conversations = [] } = useGetChatsByUserQuery(user?._id, {
    skip: !user?._id,
  });

  const receiverId = conversations?.find((c) => c._id === conversationId)
    ?.members[1]; //need to write better logic here

  const { data: receiver = {} } = useGetUserByIdQuery(receiverId, {
    skip: !receiverId,
  });

  const { data: messages = [] } = useGetMessagesByChatIdQuery(conversationId, {
    skip: !conversationId,
  });

  return (
    <section className="">
      <div className="flex w-full h-screen">
        <div className="flex-1">
          <div className="top-section shadow-lg px-4 py-2">
            <div className="flex space-x-3 items-center cursor-pointer hover:bg-[rgb(245, 243, 243)]">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  receiver?.photoURL
                    ? receiver.photoURL
                    : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
                alt=""
              />
              <div>
                <h3>{`${receiver?.firstName} ${receiver?.lastName}`}</h3>
                <span className="text-xs">Active 1h ago</span>
              </div>
            </div>
          </div>
          <div className="px-4">
            {messages?.length ? (
              messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  isSender={message.senderId === user?._id}
                />
              ))
            ) : (
              <h3 className="text-center text-xl mt-16">
                Oops! no messages history found
              </h3>
            )}
          </div>
        </div>
        <aside className="conversations w-60 border-l-2 border-primary/30 px-4">
          {conversations.map((conversation) => (
            <Conversation
              onClick={() => navigate(`/dashboard/messenger/${conversation._id}`)}
              key={conversation._id}
              conversation={conversation}
            />
          ))}
        </aside>
      </div>
    </section>
  );
};

export default Messenger;

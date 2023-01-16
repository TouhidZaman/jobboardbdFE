import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useAddMessageMutation,
  useGetChatsByUserQuery,
  useGetMessagesByChatIdQuery,
} from "features/chat/chatAPI";
import { useGetUserByIdQuery } from "features/users/usersAPI";
import Conversation from "./Conversation";
import Message from "./Message";

const Messenger = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();
  const { user } = useSelector((state) => state.auth);
  const { data: conversations = [] } = useGetChatsByUserQuery(user?._id, {
    skip: !user?._id,
  });

  const receiverId = conversations
    ?.find((c) => c._id === conversationId)
    ?.members?.find((id) => id !== user?._id); //need to write better logic here

  const { data: receiver = {} } = useGetUserByIdQuery(receiverId, {
    skip: !receiverId,
  });

  const { data: messages = [] } = useGetMessagesByChatIdQuery(conversationId, {
    skip: !conversationId,
    pollingInterval: 1500, //better approach is using socket server
  });

  //Message sending business logics
  const [message, setMessage] = useState("");
  const [sentMessage, { isSuccess: messageSentSuccess }] = useAddMessageMutation();

  const handleMessageSent = () => {
    const newMassage = {
      text: message,
      senderId: user?._id,
      conversationId,
    };
    console.log(newMassage, "newMassage");
    sentMessage(newMassage);
  };

  //Resetting input field after successfully sending a message
  useEffect(() => {
    if (messageSentSuccess) {
      setMessage("");
    }
  }, [messageSentSuccess]);

  //Taking last message into view
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEnterKeyDown = (key) => {
    if (key === "Enter") {
      handleMessageSent();
    }
  };

  return (
    <section className="messenger">
      <div className="flex w-full h-screen">
        <div className="chat-box flex-1 relative overflow-y-scroll">
          <div className="top-section sticky top-0 left-0 bg-white shadow-lg px-4 py-2">
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
          <div className="px-4 pb-10 min-h-[80vh]">
            {messages?.length ? (
              messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  isSender={message.senderId === user?._id}
                  scrollRef={scrollRef}
                />
              ))
            ) : (
              <div className="">
                <h3 className="text-center text-xl pt-16">
                  Oops! no messages history found
                </h3>
              </div>
            )}
          </div>
          <div className="sticky bottom-0 pb-2 bg-white left-0 flex w-full px-4 py-1">
            <input
              type="text"
              value={message}
              className="flex-1 mr-2"
              placeholder="Type your message here"
              onKeyDown={(e) => handleEnterKeyDown(e.key)}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => handleMessageSent()} className="btn btn-primary">
              Send
            </button>
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

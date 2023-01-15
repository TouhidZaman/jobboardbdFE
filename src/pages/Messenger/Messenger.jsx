import { useGetUserByIdQuery } from "features/users/usersAPI";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Conversation from "./Conversation";
import Message from "./Message";

const Messenger = () => {
  const { conversationId } = useParams();

  const { data } = useGetUserByIdQuery(conversationId, { skip: !conversationId });
  const { firstName, lastName, photoURL } = data?.data || {};

  const [messages, setMessages] = useState([
    {
      _id: "1",
      sender: "63bf1723519fe5a9571b34a6",
      text: "Hello how are you",
      createdAt: Date.now(),
    },
    {
      _id: "2",
      sender: "63c048026765b28b143d4452", //Tuhin
      text: "Im fine. how about you",
      createdAt: Date.now(),
    },
    {
      _id: "3",
      sender: "63bf1723519fe5a9571b34a6",
      text: "I'm also fine",
      createdAt: Date.now(),
    },
  ]);
  const [conversations, setConversations] = useState([
    {
      _id: "1",
      members: ["63bf1723519fe5a9571b34a6", "63c048026765b28b143d4452"], //Tuhin
    },
    {
      _id: "2",
      members: ["63bf1723519fe5a9571b34a6", "63bf22e52ae99eae0ede0772"], // Mayeda
    },
    {
      _id: "3",
      members: ["63bf1723519fe5a9571b34a6", "63c406892e23e87ce3252dfc"], // Bappy Das
    },
    {
      _id: "3",
      members: ["63bf1723519fe5a9571b34a6", "63c404f72e23e87ce3252dfb"], // Eity
    },
  ]);

  const [conversation, setConversation] = useState(null);

  return (
    <section className="">
      <div className="flex w-full h-screen">
        <div className="flex-1">
          <div className="top-section shadow-lg px-4 py-2">
            <div className="flex space-x-3 items-center cursor-pointer hover:bg-[rgb(245, 243, 243)]">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={
                  photoURL
                    ? photoURL
                    : "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
                alt=""
              />
              <div>
                <h3>{`${firstName} ${lastName}`}</h3>
                <span className="text-xs">Active 1h ago</span>
              </div>
            </div>
          </div>
          <div className="px-4">
            {messages.map((message) => (
              <Message
                key={message._id}
                message={message}
                isSender={message.sender === "63bf1723519fe5a9571b34a6"}
              />
            ))}
          </div>
        </div>
        <aside className="conversations w-60 border-l-2 border-primary/30 px-4">
          {conversations.map((conversation) => (
            <Conversation
              onClick={() => setConversation(conversation)}
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

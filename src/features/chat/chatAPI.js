import apiSlice from "features/api/apiSlice";

const chatAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addChat: builder.mutation({
      query: (chatInfo) => ({
        url: "conversations",
        method: "POST",
        body: chatInfo,
      }),
      invalidatesTags: ["chats", "user-chats", "chat"],
    }),

    getChatsByUser: builder.query({
      query: (userId) => `conversations/${userId}`,
      providesTags: ["user-chats"],
    }),

    getChat: builder.query({
      query: ({ senderId, receiverId }) =>
        `conversations/find/${senderId}/${receiverId}`,
      providesTags: ["chat"],
    }),

    addMessage: builder.mutation({
      query: (message) => ({
        url: "messages",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["messages"],
    }),

    getMessagesByChatId: builder.query({
      query: (chatId) => `messages/${chatId}`,
      providesTags: ["messages"],
    }),
  }),
});

export const {
  useAddChatMutation,
  useGetChatQuery,
  useGetChatsByUserQuery,
  useAddMessageMutation,
  useGetMessagesByChatIdQuery,
} = chatAPI;

import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import placeholderUser from "../../assets/images/placeholder-user.png";
import { CiMenuKebab } from "react-icons/ci";
import MessageBox from "./MessageBox";
import { IoChevronBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import echo from "@/utils/echo";
import { useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { EmptyMessage } from "./EmptyMessage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserMessaging = () => {
  const [activeUser, setActiveUser] = useState(null); // For mobile view
  const axiosSecure = useAxiosSecure();
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuth();
  const { setUser } = useAuth();
  const users = [
    "Mary Freund",
    "Katie Sims",
    "Mary Freund",
    "Kathy Pacheco",
    "David Elson",
    "Rodger Struck",
    "Ricky Smith",
  ];
  const [currentUserId, setCurrentUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [filteredInbox, setFilteredInbox] = useState([]); // for filtered results
  const [searchTerm, setSearchTerm] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const match = useMatch("/user-dashboard/messages/:sellerId");
  const sellerId = match?.params?.sellerId;
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);

  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;

  const handleUserClick = (chat) => {
    setCurrentUser(chat);
    console.log("current", chat);
  };

  const goBackToUserList = () => {
    setActiveUser(null);
  };

  const createChatMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post("messages/create", data);
      return response?.data;
    },
    onSuccess: (response) => {
      console.log(response);
      setConversationId(response?.data?.conversation?.id);
    },

    onError: (error) => {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    console.log("working");
    if (!currentUser?.id && !sellerId) return;
    createChatMutation.mutate({ user_id: currentUser?.id || sellerId });
  }, [currentUser?.id, sellerId]);

  console.log("conversationId", sellerId);

  useEffect(() => {
    if (!conversationId || !currentUser?.id) return;

    const channelName = `chat.${conversationId}`;
    const channel = echo.private(channelName);

    console.log(`Subscribing to chat channel: ${channelName}`);

    channel.listen(".App\\Events\\MessageCustomEvent", (e) => {
      console.log("listening for messages on channel:", channel.name);
      console.log("📨 New message:", e);
      setCurrentMessages((prevMessages) => [
        ...prevMessages,
        { ...e, body: e?.content },
      ]);
    });

    // Handle auth errors
    channel.error((error) => {
      console.error("Echo subscription error:", error);
      if (
        error?.type === "AuthError" ||
        error?.status === 401 ||
        error?.status === 403 ||
        error?.response?.status === 401 ||
        error?.response?.status === 403
      ) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/sign-in");
        // window.location.href = "/sign-in";
        toast.error("Session expired. Please log in again.");
      }
    });

    return () => {
      echo.leaveChannel(channelName);
    };
  }, [conversationId, currentUser?.id]);
  

  const sendMessageMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post(`/messages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Changed from application/json
        },
      });
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Message sent successfully:", response);
      toast.success("Message sent!");
      setNewMessage("");
    },
    onError: (error) => {
      console.error("Send message error:", error);
      if (error?.response?.status === 401) {
        setUser(null);
        toast.error("Session expired. Please log in again.");
        navigate("/sign-in");
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to send message."
        );
      }
    },
  });

  const {
    data: inbox,
    isLoading: isInboxLoading,
    error,
  } = useQuery({
    queryKey: ["my-inbox"],
    queryFn: async () => {
      const response = await axiosSecure.get("/messages");
      return response?.data?.data?.conversations;
    },
  });

  console.log("inbox data", inbox);

  useEffect(()=>{
    setFilteredInbox(inbox);
  },[inbox])

  // get chat for a particular user
  const {
    data: singleChatInfo,
    isLoading: isSingleChatLoading,
    error: singleChatError,
  } = useQuery({
    queryKey: ["single-chat", currentUser?.id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/messages/${currentUser?.id}`);
      setCurrentMessages(response?.data?.data?.conversations?.messages);
    },
    enabled: !!currentUser?.id, // Prevents firing until ID is available
  });

  const handleSearch = (term) => {
  setSearchTerm(term);
  
  const filtered = inbox.filter((chat) =>
    chat?.participants?.[0]?.participantable?.name
      ?.toLowerCase()
      ?.includes(term.toLowerCase())
  );

  setFilteredInbox(filtered);
};


  console.log("currentMessages", currentMessages);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full text-black rounded-2xl overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/3 border-r border-gray-300 flex flex-col ${
          activeUser && isMobileView ? "hidden" : "block"
        }`}
      >
        {/* Header */}
        <div className="p-4">
          <h1 className="sm:text-xl font-bold text-[#4275F6]">
            Messages ({inbox?.length || "--"})
          </h1>

          <div className="mt-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search"
              className="w-full py-2 px-4 rounded-full bg-white border border-gray-300 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {isInboxLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="py-3 px-4 rounded-l-xl border-b border-gray-100"
                >
                  <div className="flex gap-3 items-center">
                    <Skeleton circle height={40} width={40} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <Skeleton width="60%" height={16} />
                        <Skeleton width={50} height={12} />
                      </div>
                      <Skeleton width="90%" height={14} />
                    </div>
                  </div>
                </div>
              ))
            : filteredInbox
                ?.slice()
                ?.reverse()
                ?.map((chat, index) => {
                  const participant = chat?.participants?.[0]?.participantable;
                  const name = participant?.name || "Unknown";
                  const lastMessage = chat?.last_message;

                  return (
                    <div
                      key={index}
                      onClick={() => handleUserClick(participant)}
                      className="py-3 px-4 rounded-l-xl border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={
                            participant?.avatar
                              ? `${import.meta.env.VITE_IMG_URL}/${
                                  participant?.avatar
                                }`
                              : placeholderUser
                          }
                          alt="User Avatar"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center gap-x-2 flex-wrap">
                            <p className="font-semibold">{name}</p>
                            <p className="text-xs text-[#4275F6]">
                              {lastMessage?.created_at &&
                                formatDistanceToNow(
                                  new Date(lastMessage.created_at),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                            </p>
                          </div>
                          <div className="flex mt-1 justify-between items-center">
                            <p className="text-gray-500 text-sm truncate w-[90%]">
                              {!lastMessage
                                ? "No messages yet"
                                : lastMessage.type === "attachment"
                                ? "📎Attachment"
                                : lastMessage.body}
                            </p>
                            <span className="w-2 h-2 bg-[#4275F6] rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
        </div>
      </div>

      {/* Chat Section */}
      {currentUser ? (
        <div
          className={`w-full flex flex-col ${
            !activeUser && isMobileView ? "hidden" : "flex"
          }`}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-300 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <button onClick={goBackToUserList}>
                  <IoChevronBack className="text-xl text-gray-600" />
                </button>
              )}
              <img
                src={
                  currentUser?.avatar
                    ? `${import.meta.env.VITE_IMG_URL}/${currentUser?.avatar}`
                    : placeholderUser
                }
                alt="user"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <h2 className="font-semibold text-[#4275F6]">
                  {currentUser?.name || "User Name"}
                </h2>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
            <CiMenuKebab className="text-xl text-gray-600 cursor-pointer" />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 w-full hide-scrollbar overflow-y-auto">
            {isSingleChatLoading ? (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-blue-500">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 mb-4"></div>
                <p className="text-lg font-semibold">Loading chat...</p>
              </div>
            ) : (
              <MessageBox
                loading={isSingleChatLoading}
                currentUser={currentUser}
                currentMessages={currentMessages}
                sendMessageMutation={sendMessageMutation}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default UserMessaging;

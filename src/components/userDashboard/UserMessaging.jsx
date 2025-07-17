import React, { useEffect, useState } from "react";
import user from "../../assets/images/user.png";
import { CiMenuKebab } from "react-icons/ci";
import MessageBox from "./MessageBox";
import { IoChevronBack } from "react-icons/io5";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import echo from "@/utils/echo";
import { useMatch, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const UserMessaging = () => {
  const [activeUser, setActiveUser] = useState(null); // For mobile view
  const axiosSecure = useAxiosSecure();
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
  const [currentUserId, setCurrentUserId] = useState(15);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const navigate = useNavigate();
  const match = useMatch("/user-dashboard/messages/:sellerId");
  const sellerId = match?.params?.sellerId;

  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;

  const handleUserClick = (name) => {
    setActiveUser(name);
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
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      toast.error(errorMessage);
    },
  });

  useEffect(() => {
    createChatMutation.mutate({ user_id: 15 });
  }, []);

  console.log("conversationId", conversationId);

  useEffect(() => {
    if (!conversationId) return;

    const channelName = `chat.5`;
    const channel = echo.private(channelName);

    console.log(`Subscribing to chat channel: ${channelName}`);

    channel.listen(".App\\Events\\MessageCustomEvent", (e) => {
      console.log("listening for messages on channel:", channel.name);
      console.log("📨 New message:", e);
    });

    return () => {
      echo.leaveChannel(channelName);
    };
  }, [conversationId]);

  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.post(`/messages`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (response) => {
      console.log("Message sent successfully:", response);
      toast.success("Message sent!");
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

  // Usage function
  const handleSendMessage = () => {
    // if (!message.trim()) {
    //   return toast.error("Message cannot be empty.");
    // }

    sendMessageMutation.mutate({
      to_user_id: 15,
      message: "Hello, this is a test message!",
    });
  };

  const {
    data: inbox,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-inbox"],
    queryFn: async () => {
      const response = await axiosSecure.get("/messages");
      return response?.data?.data?.conversations;
    },
  });

  console.log("inbox data", inbox);

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
          {sellerId ? (
            <p>Messaging with seller ID: {sellerId}</p>
          ) : (
            <p>All messages</p>
          )}
          <h1 className="sm:text-xl font-bold text-[#4275F6]">Messages (04)</h1>
          <div
            onClick={handleSendMessage}
            className="p-4 bg-red-800 cursor-pointer text-white "
          >
            submit
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 rounded-full bg-white border border-gray-300 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {inbox?.map((chat, index) => (
            <div
              key={index}
              onClick={() => handleUserClick(chat)}
              className="py-3 px-4 rounded-l-xl border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex gap-3 items-center">
                <img src={user} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex gap-x-2 flex-wrap justify-between items-center">
                    <p className="font-semibold">
                      {chat?.participants[0]?.participantable?.name}
                    </p>
                    <p className="text-xs text-[#4275F6]">
                      
                      {chat?.last_message?.created_at &&
                        formatDistanceToNow(
                          new Date(chat?.last_message?.created_at),
                          { addSuffix: true }
                        )}
                    </p>
                  </div>
                  <div className="flex mt-1 justify-between items-center">
                    <p className="text-gray-500 text-sm truncate w-[90%]">
                      {chat?.last_message?.body || "No messages yet"}
                    </p>
                    <span className="w-2 h-2 bg-[#4275F6] rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
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
            <img src={user} alt="user" className="w-10 h-10 rounded-full" />
            <div>
              <h2 className="font-semibold text-[#4275F6]">
                {activeUser || "Way Jack"}
              </h2>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
          <CiMenuKebab className="text-xl text-gray-600 cursor-pointer" />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 w-full overflow-y-auto">
          <MessageBox />
        </div>
      </div>
    </div>
  );
};

export default UserMessaging;

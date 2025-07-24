import { useState, useRef, useEffect } from "react";
import placeholderUser from "../../assets/images/placeholder-user.png";
// framer motion
import { motion, AnimatePresence } from "framer-motion";

// react icons
import {
  LuHeart,
  LuSend,
  LuThumbsUp,
  LuPaperclip,
  LuX,
  LuFile,
  LuLoader,
} from "react-icons/lu";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";

import { FaRegSmile } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import toast from "react-hot-toast";

const MessageBox = ({
  currentUser,
  currentMessages,
  loading,
  sendMessageMutation,
  newMessage,
  setNewMessage,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How it going?",
      sender: "other",
      senderProfile: { name: "Jane", avatar: "https://i.pravatar.cc/40?img=5" },
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reaction: null,
      attachments: [],
    },
    {
      id: 2,
      text: "How do you handle theming in ZenUI components?",
      sender: "other",
      senderProfile: { name: "Jane", avatar: "https://i.pravatar.cc/40?img=5" },
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reaction: null,
      attachments: [],
    },
    {
      id: 3,
      text: "Does ZenUI support responsive design out of the box?",
      sender: "other",
      senderProfile: { name: "Jane", avatar: "https://i.pravatar.cc/40?img=5" },
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reaction: null,
      attachments: [],
    },
  ]);
  const [reactingTo, setReactingTo] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [totalAttachments, setTotalAttachments] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // const handleFileUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length === 0) return;

  //   setTotalAttachments(files.length);

  //   setIsUploading(true);

  //   // Simulate file upload with timeout
  //   setTimeout(() => {
  //     const newAttachments = files.map((file) => ({
  //       id: Math.random().toString(36).substring(2, 9),
  //       name: file.name,
  //       size: file.size,
  //       type: file.type,
  //       url: URL.createObjectURL(file),
  //     }));

  //     setAttachments([...attachments, ...newAttachments]);
  //     setIsUploading(false);
  //   }, 1500);

  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setTotalAttachments(files.length);
    setIsUploading(true);

    setTimeout(() => {
      const newAttachments = files.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        raw: file, // ✅ this MUST be the actual File object
      }));

      setAttachments((prev) => [...prev, ...newAttachments]);
      setIsUploading(false);
    }, 1500);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (attachmentId) => {
    setAttachments(
      attachments.filter((attachment) => attachment.id !== attachmentId)
    );
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleReaction = (messageId, reaction) => {
    setMessages(
      messages.map((message) => {
        if (message.id === messageId) {
          const hasReaction = message.reaction === reaction;
          const updatedReaction = hasReaction ? null : reaction;
          return { ...message, reaction: updatedReaction };
        }
        return message;
      })
    );
    setReactingTo(null);
  };

  const toggleReactionMenu = (messageId) => {
    setReactingTo(reactingTo === messageId ? null : messageId);
  };

  const messageVariants = {
    hidden: (message) => ({
      opacity: 0,
      y: 20,
      x: message.sender === "me" ? 50 : -50,
      scale: 0.8,
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 220,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const reactionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  // separate the messages by date
  const formatMessageTime = (timestamp) => {
    return format(parseISO(timestamp), "h:mm a"); // e.g., 6:00 PM
  };

  const formatMessageDate = (timestamp) => {
    const date = parseISO(timestamp);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMMM d, yyyy"); // e.g., July 16, 2025
  };

  const groupedMessages = currentMessages?.reduce((acc, msg) => {
    const dateKey = formatMessageDate(msg.created_at);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  console.log("current user", currentUser);
  // send message mutation

  const handleSendMessage = async () => {
    // Allow sending if either message or attachments exist
    if (!newMessage.trim() && attachments.length === 0) return;

    const formData = new FormData();

    // Only append message if it exists
    if (newMessage.trim()) {
      formData.append("message", newMessage);
    }

    // Append each file with proper FormData handling
    attachments.forEach((file) => {
      if (file.raw instanceof File) {
        formData.append("files[]", file.raw, file.name);
      }
    });

    formData.append("to_user_id", currentUser?.id);

    // Debug check - improved logging
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `${value.name} (File)` : value);
    }

    try {
      await sendMessageMutation.mutateAsync(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewMessage("");
      setAttachments([]);
      setTotalAttachments(0);
    } catch (error) {
      console.error("Send failed", error);
    }
  };

  if (loading)
    return <div className="bg-gray-100 py-20 text-center">Loading...</div>;

  console.log("current g messages", groupedMessages);

  console.log("attachments", attachments);

  return (
    <div className="flex flex-col w-full h-full text-black">
      <div className="flex-1 p-2 md:p-4 hide-scrollbar overflow-y-auto">
        <AnimatePresence>
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="relative">
              {/* Sticky Date Label with Motion */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="sticky top-0 z-10 w-fit mx-auto px-4 py-1 text-xs font-medium rounded-full shadow-sm text-gray-600 bg-white dark:bg-slate-800 dark:text-slate-300"
              >
                {date}
              </motion.div>

              {/* Messages under this date group */}
              {/* {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  custom={message}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={`mb-4 flex ${
                    message?.sendable_id !== currentUser?.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="relative max-w-md flex items-end gap-2">
                    {message?.sendable_id === currentUser?.id && (
                      <img
                        src={currentUser?.avatar || placeholderUser}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <div
                        className={`p-3 rounded-high rounded-2xl dark:text-[#d2e5f5] text-sm ${
                          message?.sendable_id !== currentUser?.id
                            ? "bg-[#4275F6] dark:bg-blue-900/90 text-white rounded-br-none"
                            : "bg-gray-50 dark:bg-slate-800 rounded-bl-none"
                        }`}
                      >
                        {message?.body || "no text found"}
                      </div>
                      <div
                        className={`${
                          message?.sendable_id !== currentUser?.id
                            ? "text-right"
                            : "text-left"
                        } mt-1 text-xs text-gray-500 dark:text-[#abc2d3]/70`}
                      >
                        {formatMessageTime(message.created_at)}
                      </div>
                    </div>
                    {message?.sendable_id !== currentUser?.id && (
                      <img
                        src={user?.avatar || placeholderUser}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
              ))} */}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  custom={message}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={`mb-4 flex ${
                    message?.sendable_id !== currentUser?.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="relative max-w-md flex items-end gap-2">
                    {message?.sendable_id === currentUser?.id && (
                      <img
                        src={currentUser?.avatar || placeholderUser}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    )}

                    <div>
                      <div
                        className={`p-3 rounded-high rounded-2xl dark:text-[#d2e5f5] text-sm ${
                          message?.sendable_id !== currentUser?.id
                            ? "bg-[#4275F6] dark:bg-blue-900/90 text-white rounded-br-none"
                            : "bg-gray-50 dark:bg-slate-800 rounded-bl-none"
                        }`}
                      >
                        {/* Text content */}
                        {message?.body || message?.content || "no text found"}

                        {/* Attachments */}
                        {message?.attachment?.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachment.map((file, index) => {
                              const isImage =
                                file.mime_type?.startsWith("image/");
                              return isImage ? (
                                <img
                                  key={index}
                                  src={`http://nexus.softvencefsd.xyz/${file?.file_path}`}
                                  alt={file?.original_name}
                                  className="rounded-lg max-w-[120px] border border-gray-300 dark:border-gray-700 mt-1"
                                />
                              ) : (
                                <a
                                  key={index}
                                  href={file.url}
                                  download={file.original_name}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-blue-500 underline break-words mt-1"
                                >
                                  📎 {file.original_name}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div
                        className={`${
                          message?.sendable_id !== currentUser?.id
                            ? "text-right"
                            : "text-left"
                        } mt-1 text-xs text-gray-500 dark:text-[#abc2d3]/70`}
                      >
                        {formatMessageTime(message.created_at)}
                      </div>
                    </div>

                    {message?.sendable_id !== currentUser?.id && (
                      <img
                        src={user?.avatar || placeholderUser}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className=" p-4 pb-3 border border-border rounded-t-lg">
        {/* Attachments preview */}
        {(attachments.length || isUploading) && (
          <div className="mb-2 flex flex-wrap gap-2">
            {isUploading &&
              Array.from({ length: totalAttachments }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-[#d2e5f5] p-2 rounded-md border border-gray-200 flex items-center gap-2"
                >
                  <LuLoader className="animate-spin" size={16} />
                  <span className="text-sm">Uploading...</span>
                </div>
              ))}

            {attachments.map((file) =>
              file.type.startsWith("image/") ? (
                <div key={file.id} className="relative group">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-[80px] object-cover h-[60px] dark:border-slate-700 border border-border p-1 rounded-lg"
                  />

                  <button
                    onClick={() => handleRemoveAttachment(file.id)}
                    className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full scale-[0.8] group-hover:scale-100 transition-all duration-200 ease-in"
                  >
                    <LuX size={14} />
                  </button>
                </div>
              ) : (
                <div
                  key={file.id}
                  className="pl-2 pr-3.5 py-2 dark:border-slate-700 rounded-lg border border-border flex items-center gap-2 group relative"
                >
                  <LuFile className="text-[2.2rem] text-gray-600 dark:text-[#d2e5f5]/70" />
                  <div>
                    <p className="text-sm dark:text-[#d2e5f5] max-w-xs truncate">
                      {file.name}
                    </p>
                    <p className="text-xs mt-0.5 dark:text-[#d2e5f5]/70 text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveAttachment(file.id)}
                    className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible scale-[0.8] group-hover:scale-100 transition-all duration-200 absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full ease-in"
                  >
                    <LuX size={14} />
                  </button>
                </div>
              )
            )}
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-[70%] md:flex-1 pr-4 py-1 border-none focus:outline-none focus:ring-0"
          />

          {/* Hidden file input */}

          <input
            type="file"
            name="files[]"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />

          {/* File attachment button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAttachmentClick}
            className="bg-gray-100 text-gray-600 min-w-[30px] p-2.5 rounded-full hover:bg-gray-200 flex items-center justify-center focus:outline-none"
            disabled={isUploading}
          >
            <LuPaperclip size={18} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={sendMessageMutation.isLoading}
            className="bg-[#0FABCA]/80 text-white min-w-[30px] p-2.5 rounded-full hover:bg-[#0FABCA] flex items-center justify-center focus:outline-none"
          >
            {sendMessageMutation.isPending ? (
              <Tailspin size="18" stroke="3" speed="0.9" color="white" />
            ) : (
              <LuSend size={18} />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Initialize chats on component mount
  useEffect(() => {
    if (!initialized) {
      try {
        const savedChats = localStorage.getItem("chats");
        const lastSelectedChatId = localStorage.getItem("selectedChatId");

        if (savedChats) {
          const parsedChats = JSON.parse(savedChats);
          if (parsedChats.length > 0) {
            setChats(parsedChats);

            if (
              lastSelectedChatId &&
              parsedChats.some(
                (chat) => chat.id.toString() === lastSelectedChatId.toString()
              )
            ) {
              setSelectedChatId(lastSelectedChatId);
              const selectedChat = parsedChats.find(
                (chat) => chat.id.toString() === lastSelectedChatId.toString()
              );
              setMessages(selectedChat.messages || []);
            } else {
              setSelectedChatId(parsedChats[0].id);
              setMessages(parsedChats[0].messages || []);
            }
          } else {
            const newChat = createNewChatInternal();
            setChats([newChat]);
            setSelectedChatId(newChat.id);
            setMessages([]);
          }
        } else {
          const newChat = createNewChatInternal();
          setChats([newChat]);
          setSelectedChatId(newChat.id);
          setMessages([]);
        }
        setInitialized(true);
      } catch (err) {
        console.error("Error loading chats:", err);
        const newChat = createNewChatInternal();
        setChats([newChat]);
        setSelectedChatId(newChat.id);
        setMessages([]);
        setInitialized(true);
      }
    }
  }, []);

  useEffect(() => {
    if (initialized && chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats, initialized]);

  useEffect(() => {
    if (initialized && chats.length === 0) {
      localStorage.removeItem("selectedChatId");
      localStorage.removeItem("chats");
    }
  }, [chats, initialized]);

  useEffect(() => {
    if (initialized && selectedChatId && messages) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id.toString() === selectedChatId.toString()
            ? { ...chat, messages }
            : chat
        )
      );
    }
  }, [messages, selectedChatId, initialized]);

  const createNewChatInternal = () => ({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    messages: [],
  });

  const createNewChat = () => {
    try {
      const newChat = createNewChatInternal();
      setChats((prev) => [newChat, ...prev]);
      setSelectedChatId(newChat.id);
      setMessages([]);
      localStorage.setItem("selectedChatId", newChat.id.toString());
      return newChat;
    } catch (err) {
      console.error("Error creating new chat:", err);
      throw new Error("Failed to create new chat");
    }
  };

  const onSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    setMessages(chat.messages || []);
    localStorage.setItem("selectedChatId", chat.id.toString());
  };

  const deleteChat = (chatId) => {
    try {
      const updatedChats = chats.filter((chat) => chat.id !== chatId);
      setChats(updatedChats);

      if (selectedChatId === chatId) {
        if (updatedChats.length > 0) {
          const newSelectedId = updatedChats[0].id;
          setSelectedChatId(newSelectedId);
          setMessages(updatedChats[0].messages || []);
          localStorage.setItem("selectedChatId", newSelectedId.toString());
        } else {
          setSelectedChatId(null);
          setMessages([]);
          localStorage.removeItem("selectedChatId");
        }
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
      throw new Error("Failed to delete chat");
    }
  };

  return {
    chats,
    selectedChatId,
    messages,
    setMessages,
    setSelectedChatId,
    onSelectChat,
    createNewChat,
    deleteChat,
  };
};

export default useChats;

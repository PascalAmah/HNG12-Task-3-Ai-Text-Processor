/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const savedChats = localStorage.getItem("chats");
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        if (parsedChats.length > 0) {
          setSelectedChatId(parsedChats[0].id);
          setMessages(parsedChats[0].messages);
        }
      }
    } catch (err) {
      console.error("Error loading chats:", err);
      throw new Error("Failed to load saved chats");
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedChatId) {
        const updatedChats = chats.map((chat) =>
          chat.id === selectedChatId ? { ...chat, messages } : chat
        );
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        setChats(updatedChats);
      }
    } catch (err) {
      console.error("Error saving chats:", err);
      throw new Error("Failed to save chat");
    }
  }, [messages, selectedChatId]);

  const createNewChat = () => {
    try {
      const newChat = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);
      setSelectedChatId(newChat.id);
      setMessages([]);
      return newChat;
    } catch (err) {
      console.error("Error creating new chat:", err);
      throw new Error("Failed to create new chat");
    }
  };

  const deleteChat = (chatId) => {
    try {
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      if (selectedChatId === chatId) {
        const remainingChats = chats.filter((chat) => chat.id !== chatId);
        if (remainingChats.length > 0) {
          setSelectedChatId(remainingChats[0].id);
          setMessages(remainingChats[0].messages);
        } else {
          setSelectedChatId(null);
          setMessages([]);
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
    createNewChat,
    deleteChat,
    setSelectedChatId,
  };
};

export default useChats;

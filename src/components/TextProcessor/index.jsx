import { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatHeader from "./Chat/ChatHeader";
import ChatContent from "./Chat/ChatContent";
import { useChats } from "./hooks/useChats";
import apiService from "@/service/apiService";

const TextProcessor = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    chats,
    selectedChatId,
    messages,
    setMessages,
    createNewChat,
    deleteChat,
    setSelectedChatId,
  } = useChats();

  useEffect(() => {
    async function initializeApi() {
      try {
        setLoading(true);
        await apiService.initializeServices();
        setInitialized(true);
      } catch (err) {
        setError(
          "Failed to initialize language services. Please reload the page."
        );
        console.error("API service initialization failed:", err);
      } finally {
        setLoading(false);
      }
    }

    initializeApi();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text");
      return;
    }

    if (!initialized) {
      setError(
        "Services are still initializing. Please wait a moment and try again."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const detectionResult = await apiService.detectLanguage(inputText);

      if (
        !detectionResult ||
        !Array.isArray(detectionResult) ||
        detectionResult.length === 0
      ) {
        throw new Error("Invalid detection result");
      }

      console.log(detectionResult[0].language);

      const detectedLang = detectionResult[0].language.substring(0, 2);

      const newMessage = {
        id: Date.now(),
        text: inputText,
        language: detectedLang,
        processed: [],
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    } catch (err) {
      let errorMessage = "Failed to process text. Please try again.";

      if (err.message.includes("not initialized")) {
        errorMessage =
          "Language detection service is not ready. Please try again in a moment.";
      } else if (err.message.includes("Invalid detection")) {
        errorMessage = "Could not detect language. Please try again.";
      }

      setError(errorMessage);
      console.error("Error processing input:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (messageId) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    setLoading(true);
    setError("");

    try {
      const summary = await apiService.summarizeText(message.text);

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              processed: [
                ...m.processed,
                { type: "summary", content: summary },
              ],
            };
          }
          return m;
        })
      );
    } catch (err) {
      setError("Failed to summarize text. Please try again.");
      console.error("Summary error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async (messageId, targetLang) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    if (message.language === targetLang) {
      setError("Cannot translate to the same language");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiService.initializeServices(message.language, targetLang);
      const translation = await apiService.translateText(message.text);

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === messageId) {
            return {
              ...m,
              processed: [
                ...m.processed,
                { type: "translation", content: translation },
              ],
            };
          }
          return m;
        })
      );
    } catch (err) {
      setError("Failed to translate text. Please try again.");
      console.error("Translation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={createNewChat}
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={(chat) => {
          setSelectedChatId(chat.id);
          setMessages(chat.messages);
        }}
        onDeleteChat={deleteChat}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          selectedChat={chats.find((c) => c.id === selectedChatId)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <ChatContent
          messages={messages}
          onSummarize={handleSummarize}
          onTranslate={handleTranslate}
          loading={loading}
          error={error}
          onDismissError={() => setError("")}
          inputText={inputText}
          onInputChange={(e) => setInputText(e.target.value)}
          onSend={handleSend}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default TextProcessor;

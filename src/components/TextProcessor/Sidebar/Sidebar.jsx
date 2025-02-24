/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";

const Sidebar = ({
  sidebarOpen,
  onToggleSidebar,
  onNewChat,
  chats,
  selectedChatId,
  onSelectChat,
  onDeleteChat,
}) => {
  const sidebarRef = useRef(null);

  const handleMobileAction = (action) => {
    if (window.innerWidth < 768 && sidebarOpen) {
      action();
      onToggleSidebar();
    } else {
      action();
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      sidebarOpen ? "16rem" : "4rem"
    );
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarOpen !== null) {
      localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        onToggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, onToggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "fixed top-0 left-0 z-30 h-screen bg-background border-r transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16",
        !sidebarOpen && "translate-x-[-100%] md:translate-x-0"
      )}
    >
      <SidebarHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={onToggleSidebar}
      />

      <div className="p-2 space-y-2">
        <Button
          onClick={() => handleMobileAction(onNewChat)}
          className="w-full justify-start gap-2"
        >
          <Plus className="h-4 w-4" />
          {sidebarOpen && "New Chat"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          sidebarOpen={sidebarOpen}
          onSelectChat={(chatId) =>
            handleMobileAction(() => onSelectChat(chatId))
          }
          onDeleteChat={onDeleteChat}
        />
      </div>
    </aside>
  );
};

export default Sidebar;

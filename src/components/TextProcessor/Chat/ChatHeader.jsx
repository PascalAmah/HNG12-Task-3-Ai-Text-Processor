/* eslint-disable react/prop-types */
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const ChatHeader = ({ selectedChat, onToggleSidebar }) => (
  <header className="fixed top-0 right-0 left-0 md:left-[var(--sidebar-width)] bg-white border-b py-4 px-4 shadow-sm z-10 transition-all duration-300">
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-semibold">
        {selectedChat
          ? `Chat ${format(new Date(selectedChat.createdAt), "MMM d, yyyy")}`
          : "New Chat"}
      </h1>
    </div>
  </header>
);

export default ChatHeader;

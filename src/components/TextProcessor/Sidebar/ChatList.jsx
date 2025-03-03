/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const ChatList = ({
  chats,
  selectedChatId,
  sidebarOpen,
  onSelectChat,
  onDeleteChat,
}) => (
  <ScrollArea className="flex-1">
    <div className="p-2 space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={cn(
            "group flex items-center gap-2 rounded-lg p-2 cursor-pointer hover:bg-gray-100",
            chat.id.toString() === selectedChatId?.toString() && "bg-gray-100"
          )}
        >
          <button
            className="flex-1 text-left truncate"
            onClick={() => onSelectChat(chat)}
            data-selected={chat.id.toString() === selectedChatId?.toString()}
          >
            {sidebarOpen ? (
              <>
                <div className="font-medium truncate">
                  Chat {format(new Date(chat.createdAt), "MMM d, yyyy")}
                </div>
                <div className="text-xs text-gray-500">
                  {format(new Date(chat.createdAt), "h:mm a")}
                </div>
              </>
            ) : (
              <MessageSquare className="h-5 w-5" />
            )}
          </button>
          {sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteChat(chat.id)}
              className={cn(
                "md:opacity-0 md:group-hover:opacity-100 h-8 w-8",
                "hover:bg-red-100 hover:text-red-500"
              )}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      ))}
    </div>
  </ScrollArea>
);

export default ChatList;

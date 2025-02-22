/* eslint-disable react/prop-types */
import { MessageSquare, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SidebarHeader = ({ sidebarOpen, onToggleSidebar }) => (
  <div className="p-4 border-b flex items-center justify-between">
    <div className={cn("flex items-center gap-2", !sidebarOpen && "hidden")}>
      <MessageSquare className="h-6 w-6" />
      <span className="font-semibold">AI Text Processor</span>
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleSidebar}
      className="shrink-0"
    >
      {sidebarOpen ? (
        <PanelLeftClose className="h-5 w-5" />
      ) : (
        <PanelLeft className="h-5 w-5" />
      )}
    </Button>
  </div>
);

export default SidebarHeader;

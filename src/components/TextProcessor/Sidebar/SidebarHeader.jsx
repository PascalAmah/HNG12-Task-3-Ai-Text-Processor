/* eslint-disable react/prop-types */
import { PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SidebarHeader = ({ sidebarOpen, onToggleSidebar }) => (
  <div className="p-4 border-b flex items-center justify-start">
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

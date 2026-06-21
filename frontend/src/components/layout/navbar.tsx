"use client";

import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context/app-context";
import { useNotifications } from "@/hooks/useNotifications";

export function Navbar() {
  const { user } = useAppContext();
  const { data: notifications } = useNotifications();
  const hasNotifications = (notifications?.length ?? 0) > 0;

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      <div className="relative w-80 max-w-[40vw]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search lifts, logs, requests..."
          className="border-border bg-card/60 pl-9 text-sm text-white placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-white">
          <Bell className="h-4 w-4" />
          {hasNotifications && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-danger" />
          )}
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 py-1.5 pl-1.5 pr-3 hover:bg-white/5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary text-xs text-white">
              {user?.name.slice(0, 2).toUpperCase() ?? "??"}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-xs font-medium leading-none text-white">{user?.name}</p>
            <p className="text-[11px] capitalize text-muted-foreground">{user?.role}</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
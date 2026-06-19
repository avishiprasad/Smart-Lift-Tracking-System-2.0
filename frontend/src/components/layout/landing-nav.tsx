"use client";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-glow">
            <ArrowUpDown className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Smart Lift</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#architecture" className="hover:text-white">Architecture</a>
          <a href="#stack" className="hover:text-white">Technology</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="text-sm text-white hover:bg-white/5">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-primary text-sm text-white shadow-glow hover:bg-primary/90">
              Explore Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
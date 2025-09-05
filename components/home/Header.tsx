"use client";

import { useCurrentUser } from "@/hooks/getUser";
import React, { useState } from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Loader, Bell, Plus, LogOut } from "lucide-react";

const Header = () => {
  const user = useCurrentUser();
  const [signoutLoading, setSignoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setSignoutLoading(true);
      await signOut({ redirect: false });
    } catch (error) {
      console.log(error);
    } finally {
      setSignoutLoading(false);
    }
  };

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-md bg-secondary/70
        shadow-md
        flex items-center justify-between px-4 sm:px-6 py-3
        gap-4
      "
    >
      {/* LEFT: Avatar + greeting */}
      <div className="flex items-center gap-3">
        {user && <Avatar image={user.image} name={user.name} size="md" />}
        <div className="flex flex-col">
          <span className="text-xs text-foreground/70">Bonjour,</span>
          <span className="font-bold text-sm capitalize text-foreground">
            {user?.name ?? "Invité"}
          </span>
        </div>
      </div>

      {/* RIGHT: actions */}
      <div className="flex items-center gap-3">
        {/* Ajouter Histoire */}
        <Link href="/create">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1 rounded-full px-3 py-1"
          >
            <Plus className="size-5 md:size-4 " />
            <span className="md:block hidden">Nouvelle histoire</span>
          </Button>
        </Link>

        {/* Notifications */}
        <button
          className="
            relative p-2 rounded-full hover:bg-primary/20 transition-colors
          "
        >
          <Bell className="w-5 h-5 text-foreground" />
          {/* petit badge rouge pour notifications */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        {/* Sign in / out */}
        {user ? (
          <Button
            variant="destructive"
            size="sm"
            disabled={signoutLoading}
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            {signoutLoading && <Loader className="mr-1 animate-spin w-4 h-4" />}
            <LogOut className="md:hidden" />
            <span className="hidden md:inline-block">Sign out</span>
          </Button>
        ) : (
          <Link href="/auth/signin">
            <Button variant="secondary" size="sm">
              Connexion
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

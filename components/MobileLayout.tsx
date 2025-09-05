"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, User } from "lucide-react";
import { useMemo } from "react";

const tabs = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/stories", icon: BookOpen, label: "Histoires" },
  { href: "/profile", icon: User, label: "Profil" },
];

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = useMemo(() => {
    return pathname === "/auth/signin" || pathname === "/auth/signup";
  }, [pathname]);

  return (
    <div className="flex flex-col h-screen w-screen ">
      {/* Contenu */}
      <div className="flex-1 overflow-hidden">{children}</div>

      {/* Barre de navigation en bas */}
      {!isAuthPage && (
        <nav
          className="h-16 bg-background border-t flex 
      items-center justify-around border-foreground/20"
        >
          {tabs.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex flex-col items-center">
              <Icon
                className={`h-6 w-6 ${
                  pathname === href ? "text-pink-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs ${
                  pathname === href
                    ? "text-pink-500 font-bold"
                    : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

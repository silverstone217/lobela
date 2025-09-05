import { getUser } from "@/actions/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

async function AuthLayout({ children }: LayoutProps) {
  const user = await getUser();
  if (user) redirect("/");

  return <>{children}</>;
}

export default AuthLayout;

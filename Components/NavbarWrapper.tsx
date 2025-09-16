"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide navbar on pages that have their own navigation
  if (pathname === "/booking" || pathname?.startsWith("/services/")) {
    return null;
  }

  return <Navbar />;
}

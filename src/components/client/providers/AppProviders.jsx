"use client";

import { SessionProvider } from "next-auth/react";
import StoreProvider from "./StoreProvider";

export default function AppProviders({ children }) {
  return (
    <StoreProvider>
      <SessionProvider>{children}</SessionProvider>
    </StoreProvider>
  );
}

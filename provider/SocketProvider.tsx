"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { connectSocket, getSocket } from "@/utills/connectSocket";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export default function SocketProvider({
  tenantSlug,
  token,
  children,
  enabled = true,
}: {
  tenantSlug?: string;
  token?: string;
  children: React.ReactNode;
  enabled?: boolean;
}) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const socket = connectSocket(token, tenantSlug);

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("connect_error", () => setIsConnected(false));

    return () => {
      socket.disconnect();
    };
  }, [enabled, tenantSlug, token]);

  return (
    <SocketContext.Provider
      value={{ socket: getSocket(), isConnected, setIsConnected }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("something went wrong");
  }
  return context;
};

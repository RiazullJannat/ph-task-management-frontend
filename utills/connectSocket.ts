/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (token?: string, tenantSlug?: string) => {
  if (!socket) {
    socket = io(config.next_public_ws_url, {
      transports: ["websocket"],
      withCredentials: true,
      auth: token ? { token } : undefined,
      extraHeaders: tenantSlug ? { "x-tenant-slug": tenantSlug } : undefined,
    });

    socket.on("connect", () => {
      console.log("✅ connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ connect_error:", err.message);
    });
  }

  // 🔥 THIS IS THE FIX
  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

export const getSocket = () => socket;

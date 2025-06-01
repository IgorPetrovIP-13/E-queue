"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket"]
    });
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{socket ? children: null}</SocketContext.Provider>
  );
}

export function useSocket(): Socket {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("Socket not initialized. Please use SocketProvider.");
  }
  return socket;
}

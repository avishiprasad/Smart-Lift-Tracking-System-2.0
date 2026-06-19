// Socket.IO client setup. Intentionally not invoked anywhere until Phase 7.
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "./constants";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, { autoConnect: false, transports: ["websocket"] });
  }
  return socket;
}
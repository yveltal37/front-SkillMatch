import { io, Socket } from "socket.io-client";

const token = sessionStorage.getItem("accessToken");

export const socket: Socket = io(import.meta.env.VITE_API_URL, {
  auth: { token },
});

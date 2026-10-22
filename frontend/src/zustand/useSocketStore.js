import { create } from "zustand";
import io from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],
  // { [userId]: ISO date } — live updates that override the value fetched with the user list
  lastSeenMap: {},

  connectSocket: () => {
    const { socket } = get();
    if (socket?.connected) return;

    const { authUser } = useAuthStore.getState();
    if (!authUser?.id) return;

    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      query: { userId: authUser.id },
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    newSocket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });

    newSocket.on("userLastSeen", ({ userId, lastSeen }) => {
      set((state) => ({ lastSeenMap: { ...state.lastSeenMap, [userId]: lastSeen } }));
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (!socket) return;
    socket.disconnect();
    set({ socket: null, onlineUsers: [] });
  },
}));

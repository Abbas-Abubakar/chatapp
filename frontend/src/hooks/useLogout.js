import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../zustand/useAuthStore";
import { useSocketStore } from "../zustand/useSocketStore";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthStore();
  const { disconnectSocket } = useSocketStore();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data?.error) {
        throw new Error(data.error);
      }

      // 1️⃣ Close socket
      disconnectSocket();

      // 2️⃣ Clear storage
      localStorage.removeItem("chat-user");

      // 3️⃣ Clear auth state
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;

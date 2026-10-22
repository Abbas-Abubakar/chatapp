import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../zustand/useAuthStore";
import { useSocketStore } from "../zustand/useSocketStore";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthStore();
  const { connectSocket } = useSocketStore();

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || data?.error) {
        throw new Error(data?.error || "Login failed");
      }

      // 1️⃣ Persist user
      localStorage.setItem("chat-user", JSON.stringify(data));

      // 2️⃣ Set global auth state
      setAuthUser(data);

      // 3️⃣ Connect socket immediately
      connectSocket();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

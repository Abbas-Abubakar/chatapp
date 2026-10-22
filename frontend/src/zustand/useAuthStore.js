// useAuthStore.js
import { create } from "zustand"

export const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
  setAuthUser: (user) => {
    if (user) localStorage.setItem("chat-user", JSON.stringify(user))
    else localStorage.removeItem("chat-user")
    set({ authUser: user })
  },
  checkAuth: async () => {
    try {
      const res = await fetch("/auth/check", { credentials: "include" })
      if (!res.ok) throw new Error()
      const user = await res.json()
      localStorage.setItem("chat-user", JSON.stringify(user))
      set({ authUser: user })
    } catch {
      localStorage.removeItem("chat-user")
      set({ authUser: null })
    }
  },
}))
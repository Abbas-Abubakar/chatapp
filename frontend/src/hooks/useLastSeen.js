import { useEffect, useState } from "react"
import { useSocketStore } from "../zustand/useSocketStore"
import { formatLastSeen } from "../utils/extractTime"

// Returns { isOnline, label } for a user object from /users
const useLastSeen = (user) => {
  const { onlineUsers, lastSeenMap } = useSocketStore()
  const [, tick] = useState(0)

  // re-render every minute so "5 min ago" stays fresh
  useEffect(() => {
    const id = setInterval(() => tick((t) => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const isOnline = !!user && onlineUsers.includes(user._id)
  const lastSeen = user ? (lastSeenMap[user._id] || user.lastSeen) : null

  return { isOnline, label: isOnline ? "Online" : formatLastSeen(lastSeen) }
}

export default useLastSeen

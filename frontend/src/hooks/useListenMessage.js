import { useEffect } from 'react'
import { useSocketStore } from '../zustand/useSocketStore'
import { useConversation } from '../zustand/useConservation'

const useListenMessage = () => {
  const { socket } = useSocketStore()

  useEffect(() => {
    if (!socket) return

    const handler = (newMessage) => {
      const { selectedConversation, messages, setMessages } = useConversation.getState()
      if (newMessage.senderId !== selectedConversation?._id) return
      setMessages([...messages, newMessage])
    }

    socket.on("newMessage", handler)
    return () => socket.off("newMessage", handler)
  }, [socket])
}

export default useListenMessage

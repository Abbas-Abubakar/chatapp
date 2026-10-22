import useGetMessage from "../../hooks/useGetMessage"
import Message from "./Message"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import { useEffect, useRef } from "react"
import useListenMessage from "../../hooks/useListenMessage"

const Messages = () => {
  const { messages, loading } = useGetMessage()
  useListenMessage()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4">
      {!loading && messages.map(message => (
        <Message key={message._id} message={message} />
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white/50 mt-10">No messages yet. Say hello 👋</p>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default Messages

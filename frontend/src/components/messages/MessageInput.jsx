import { useState } from "react"
import { IoSend } from "react-icons/io5"
import useSendMessage from "../../hooks/useSendMessage"

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    await sendMessage(message)
    setMessage("")
  }

  return (
    <form onSubmit={handleSubmit}
      className="px-3 sm:px-6 pt-3 bg-black/40 border-t border-white/10 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="relative">
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}
          placeholder="Send a message" aria-label="Message"
          className="field !rounded-full !pl-5 !pr-14" />
        <button type="submit" disabled={loading || !message.trim()} aria-label="Send"
          className="absolute inset-y-0 right-1.5 my-auto size-9 grid place-items-center rounded-full bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white cursor-pointer transition-colors">
          {loading ? <span className="loading loading-spinner loading-xs"></span> : <IoSend />}
        </button>
      </div>
    </form>
  )
}

export default MessageInput

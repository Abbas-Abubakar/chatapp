import { useEffect } from "react"
import { useConversation } from "../../zustand/useConservation"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti"
import { IoArrowBack } from "react-icons/io5"
import { useAuthStore } from "../../zustand/useAuthStore"
import useLastSeen from "../../hooks/useLastSeen"
import Avatar from "../Avatar"

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  return (
    <section className={`${selectedConversation ? "flex" : "hidden md:flex"} flex-1 min-w-0 flex-col h-full`}>
      {!selectedConversation ? <NoChatSelected /> : (
        <>
          <ChatHeader user={selectedConversation} onBack={() => setSelectedConversation(null)} />
          <Messages />
          <MessageInput />
        </>
      )}
    </section>
  )
}

export default MessageContainer

const ChatHeader = ({ user, onBack }) => {
  const { isOnline, label } = useLastSeen(user)

  return (
    <header className="flex items-center gap-3 px-3 sm:px-4 py-3 bg-black/40 border-b border-white/10 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <button type="button" onClick={onBack} aria-label="Back to chats"
        className="md:hidden size-10 grid place-items-center rounded-full text-white hover:bg-white/10 cursor-pointer">
        <IoArrowBack className="size-5" />
      </button>

      <div className="relative shrink-0">
        <Avatar name={user.fullname} size="md" />
        {isOnline && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-400 ring-2 ring-[#161922]" />}
      </div>

      <div className="min-w-0">
        <h2 className="font-bold text-white truncate leading-tight">{user.fullname}</h2>
        <p className={`text-xs truncate ${isOnline ? "text-emerald-400 font-semibold" : "text-white/55"}`}>{label}</p>
      </div>
    </header>
  )
}

const NoChatSelected = () => {
  const { authUser } = useAuthStore()
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="px-6 text-center text-gray-200 flex flex-col items-center gap-3">
        <div className="grid place-items-center size-24 rounded-3xl bg-white/10 border border-white/10">
          <TiMessages className="text-5xl text-amber-500" />
        </div>
        <p className="text-xl md:text-2xl font-extrabold text-white">Welcome 👋 {authUser?.fullname}</p>
        <p className="text-white/60">Select a chat to start messaging</p>
      </div>
    </div>
  )
}

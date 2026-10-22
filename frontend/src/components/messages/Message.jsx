import { useConversation } from "../../zustand/useConservation"
import { extractTIme } from "../../utils/extractTime"
import { useAuthStore } from "../../zustand/useAuthStore"

const Message = ({ message }) => {
  const { authUser } = useAuthStore()
  const { selectedConversation } = useConversation()

  if (!message || !authUser) return null

  const fromMe = message.senderId === authUser.id
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-9 sm:w-10 rounded-full">
          <img alt="" src={profilePic || "https://avatar.iran.liara.run/public"} />
        </div>
      </div>

      <div className={`chat-bubble max-w-[80%] sm:max-w-[65%] break-words text-white ${fromMe ? "bg-amber-700" : "bg-white/15"}`}>
        {message.message}
      </div>
      <div className="chat-footer text-xs text-white/50 mt-0.5">{extractTIme(message.createdAt)}</div>
    </div>
  )
}

export default Message

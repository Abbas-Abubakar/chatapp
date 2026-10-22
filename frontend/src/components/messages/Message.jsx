import { useConversation } from "../../zustand/useConservation"
import { extractTIme } from "../../utils/extractTime"
import { useAuthStore } from "../../zustand/useAuthStore"
import Avatar from "../Avatar"


<div className="chat-image">
  <Avatar name={name} size="sm" />
</div>

const Message = ({ message }) => {
  const { authUser } = useAuthStore()
  const { selectedConversation } = useConversation()

  if (!message || !authUser) return null

  const fromMe = message.senderId === authUser.id
  const name = fromMe ? (authUser.fullname || authUser.username) : selectedConversation?.fullname

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image">
        <Avatar name={name} size="sm" />
      </div>

      <div className={`chat-bubble max-w-[80%] sm:max-w-[65%] wrap-break-word text-white ${fromMe ? "bg-amber-700" : "bg-white/15"}`}>
        {message.message}
      </div>
      <div className="chat-footer text-xs text-white/50 mt-0.5">{extractTIme(message.createdAt)}</div>
    </div>
  )
}

export default Message

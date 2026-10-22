import { useConversation } from "../../zustand/useConservation"
import useLastSeen from "../../hooks/useLastSeen"
import Avatar from "../Avatar"

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation._id
  const { isOnline, label } = useLastSeen(conversation)

  return (
    <button type="button" onClick={() => setSelectedConversation(conversation)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors
        focus-visible:outline-2 focus-visible:outline-amber-400
        ${isSelected ? "bg-amber-600/25 ring-1 ring-amber-500/40" : "hover:bg-white/10"}`}>
      <div className="relative shrink-0">
        <Avatar name={conversation.fullname} size="lg" />
        {isOnline && <span className="absolute bottom-0 right-0 size-3.5 rounded-full bg-emerald-400 ring-2 ring-[#161922]" />}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-white truncate">{conversation.fullname}</p>
        <p className={`text-xs truncate ${isOnline ? "text-emerald-400 font-semibold" : "text-white/50"}`}>{label}</p>
      </div>
    </button>
  )
}

export default Conversation

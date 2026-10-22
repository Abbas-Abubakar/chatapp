import { IoChatbubbles } from "react-icons/io5"
import Conversations from "./Conversations"
import SearchInput from "./SearchInput"
import LogoutButton from "./LogoutButton"
import { useConversation } from "../../zustand/useConservation"
import { useAuthStore } from "../../zustand/useAuthStore"

const Sidebar = () => {
  const { selectedConversation } = useConversation()
  const { authUser } = useAuthStore()

  return (
    <aside className={`${selectedConversation ? "hidden md:flex" : "flex"}
      w-full md:w-80 lg:w-96 shrink-0 flex-col h-full border-r border-white/10 bg-black/30`}>

      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="grid place-items-center size-10 rounded-xl bg-linear-to-br from-amber-500 to-amber-700">
          <IoChatbubbles className="text-white text-xl" />
        </div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex-1">
          Chat<span className="text-blue-400">App</span>
        </h1>
      </div>

      <div className="px-4 pb-3">
        <SearchInput />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-2">
        <Conversations />
      </div>

      {/* current user + logout */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-white/10 bg-black/20 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <img src={authUser?.profilePic} alt="" className="size-10 rounded-full bg-white/10 object-cover" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{authUser?.fullname || authUser?.username}</p>
          <p className="text-xs text-white/50 truncate">@{authUser?.username}</p>
        </div>
        <LogoutButton />
      </div>
    </aside>
  )
}

export default Sidebar

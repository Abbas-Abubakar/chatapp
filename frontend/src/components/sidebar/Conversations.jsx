import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
  const { loading, conversations } = useGetConversations()

  if (loading) {
    return (
      <div className="flex flex-col gap-1 py-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5">
            <div className="skeleton size-12 rounded-full shrink-0"></div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="skeleton h-3.5 w-32"></div>
              <div className="skeleton h-3 w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (conversations.length === 0) {
    return <p className="text-center text-sm text-white/50 py-10 px-4">No one else has signed up yet. Invite a friend to start chatting.</p>
  }

  return (
    <div className="flex flex-col gap-0.5 py-1">
      {conversations.map(conversation => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
    </div>
  )
}

export default Conversations

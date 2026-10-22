import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useConversation } from "../../zustand/useConservation";
import useGetConversations from "../../hooks/useGetConversations"
import { toast } from "react-toastify";

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversations()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long")
    }

    const conversation = conversations.find(c => c.fullname.toLowerCase().includes(search.toLowerCase()))
    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    } else {
      toast.error("No such user found")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search people" aria-label="Search people"
        className="field !rounded-full !pl-4 !pr-12" />
      <button type="submit" aria-label="Search"
        className="absolute inset-y-0 right-1.5 my-auto size-8 grid place-items-center rounded-full bg-amber-600 hover:bg-amber-500 text-white cursor-pointer transition-colors">
        <IoSearchOutline />
      </button>
    </form>
  )
}

export default SearchInput

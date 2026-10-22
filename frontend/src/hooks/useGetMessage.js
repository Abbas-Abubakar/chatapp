import { useEffect, useState } from "react"
import { useConversation } from "../zustand/useConservation"
import { toast } from "react-toastify"

const useGetMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  useEffect(() => {
  const getMessage = async () => {
    setLoading(true)
    try {

      const res = await fetch(`/message/${selectedConversation?._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      
      const contentType = res.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text()
        throw new Error("Server returned HTML instead of JSON")
      }
      
      const data = await res.json()
      
      if (data.error) throw new Error(data.error)
      setMessages(data) // This should be an array from backend
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  if (selectedConversation?._id) getMessage()
}, [selectedConversation?._id, setMessages]) // Added setMessages here

return { loading, messages }
}

export default useGetMessage
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from '../zustand/useAuthStore';
const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthStore()

  const signup = async ({fullname, username, password, confirmPassword, gender}) => {
    const success = handleInputError({fullname, username, password, confirmPassword, gender})
    if(!success) return

    setLoading(true)
    if(success){
      try {
        const res = await fetch('/auth/signup', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({fullname, username, password, confirmPassword, gender})
        })

        const data = await res.json()
        
        localStorage.setItem("chat-user", JSON.stringify(data))
        setAuthUser(data)
        
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return { loading, signup }
}

export default useSignup

function handleInputError({fullname, username, password, confirmPassword, gender}){
  if(!fullname || !username || !password || !confirmPassword || !gender){
    toast.error("Please fill all fields")
    return false
  }

  if(password !== confirmPassword){
    toast.error("Passwords do not match!")
    return false
  }
  
  if(password.length < 6){
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}
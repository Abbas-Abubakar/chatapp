import { ToastContainer } from 'react-toastify'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './zustand/useAuthStore'
import { useSocketStore } from './zustand/useSocketStore'
import { useEffect } from 'react'

function App() {
  const { authUser } = useAuthStore()
  const { connectSocket, disconnectSocket } = useSocketStore()

  useEffect(() => {
    if (authUser?.id) connectSocket()
    else disconnectSocket()

    return () => disconnectSocket()
  }, [authUser?.id])

  return (
    <div className="h-dvh w-full overflow-hidden">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  )
}

export default App

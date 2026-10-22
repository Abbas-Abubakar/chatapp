import { useState } from "react"
import { Link } from "react-router-dom"
import { IoChatbubbles } from "react-icons/io5"
import { handleChange } from "../../utils/utilFunctions"
import useLogin from "../../hooks/useLogin"

const Login = () => {
  const [userData, setUserData] = useState({ username: '', password: '' })
  const { loading, login } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(userData)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="glass w-full max-w-md rounded-3xl p-6 sm:p-9 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="grid place-items-center size-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-900/40 mb-4">
              <IoChatbubbles className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Login <span className="text-blue-400">ChatApp</span>
            </h1>
            <p className="text-sm text-white/60 mt-2">Pick up your conversations where you left off.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-white/80 mb-1.5">Username</label>
              <input id="username" type="text" autoComplete="username" placeholder="Enter your username" className="field"
                name="username" value={userData.username} onChange={e => handleChange(e, setUserData)} />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white/80 mb-1.5">Password</label>
              <input id="password" type="password" autoComplete="current-password" placeholder="Enter your password" className="field"
                name="password" value={userData.password} onChange={e => handleChange(e, setUserData)} />
            </div>

            <button disabled={loading}
              className="mt-2 w-full rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold py-3 transition-colors cursor-pointer">
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
            </button>
          </form>

          <p className="text-sm text-white/60 text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-300 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

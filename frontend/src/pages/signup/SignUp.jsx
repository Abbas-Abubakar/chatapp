import { useState } from "react"
import { Link } from "react-router-dom"
import { IoChatbubbles } from "react-icons/io5"
import useSignup from "../../hooks/useSignup.js"
import { handleChange } from "../../utils/utilFunctions.js"

const GenderOption = ({ value, label, userData, setUserData }) => (
  <label className={`flex-1 text-center cursor-pointer rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors
    ${userData.gender === value
      ? "bg-amber-600 border-amber-500 text-white"
      : "bg-white/10 border-white/15 text-white/70 hover:bg-white/15"}
    has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-amber-400`}>
    {label}
    <input type="radio" name="gender" value={value} checked={userData.gender === value}
      onChange={e => handleChange(e, setUserData)} className="sr-only" />
  </label>
)

const SignUp = () => {
  const [userData, setUserData] = useState({
    fullname: '', username: '', password: '', confirmPassword: '', gender: ''
  })
  const { loading, signup } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(userData)
  }

  const input = (id, label, type, placeholder, autoComplete) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-white/80 mb-1.5">{label}</label>
      <input id={id} name={id} type={type} placeholder={placeholder} autoComplete={autoComplete} className="field"
        value={userData[id]} onChange={e => handleChange(e, setUserData)} />
    </div>
  )

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4">
        <div className="glass w-full max-w-md rounded-3xl p-6 sm:p-9 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-7">
            <div className="grid place-items-center size-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-900/40 mb-4">
              <IoChatbubbles className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Sign up <span className="text-blue-400">Chat App</span>
            </h2>
            <p className="text-sm text-white/60 mt-2">Create an account and start messaging.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {input("fullname", "Full name", "text", "Enter your full name", "name")}
            {input("username", "Username", "text", "Choose a username", "username")}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {input("password", "Password", "password", "Min. 6 characters", "new-password")}
              {input("confirmPassword", "Confirm password", "password", "Repeat password", "new-password")}
            </div>

            <div>
              <span className="block text-sm font-semibold text-white/80 mb-1.5">Gender</span>
              <div className="flex gap-3">
                <GenderOption value="male" label="Male" userData={userData} setUserData={setUserData} />
                <GenderOption value="female" label="Female" userData={userData} setUserData={setUserData} />
              </div>
            </div>

            <button disabled={loading}
              className="mt-2 w-full rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-60 text-white font-bold py-3 transition-colors cursor-pointer">
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Create account"}
            </button>
          </form>

          <p className="text-sm text-white/60 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

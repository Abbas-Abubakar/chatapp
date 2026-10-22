import useLogout from '../../hooks/useLogout'
import { IoLogOut } from "react-icons/io5"

const LogoutButton = () => {
  const { loading, logout } = useLogout()
  return (
    <button type="button" onClick={logout} disabled={loading} aria-label="Log out" title="Log out"
      className="size-10 grid place-items-center rounded-full text-white/70 hover:text-white hover:bg-white/10 cursor-pointer transition-colors">
      {loading ? <span className="loading loading-spinner loading-sm"></span> : <IoLogOut className="size-6" />}
    </button>
  )
}

export default LogoutButton

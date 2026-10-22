import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"

const Home = () => {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-black/30 backdrop-blur-sm">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home

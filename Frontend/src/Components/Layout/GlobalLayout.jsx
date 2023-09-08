import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"

export default function Layout(props) {
  return (
    <div className="App flex fixed h-full w-full p-4 gap-4">
      <Sidebar />     
      <div className={`main-panel grow w-full bg-[#e8edec] rounded-lg overflow-auto relative`}>
        <Outlet />
      </div>
    </div>
  )
}

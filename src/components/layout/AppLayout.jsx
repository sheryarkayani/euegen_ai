import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout({ title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#FCFAF7]">
      <Sidebar />
      <div className="ml-60 flex flex-col min-h-screen">
        <TopBar title={title} subtitle={subtitle} />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 overflow-auto"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

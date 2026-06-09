import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const links = [
    { icon: "📊", label: "Dashboard", path: "/dashboard" },
    { icon: "👥", label: "თანამშრომლები", path: "/employees" },
    { icon: "📋", label: "Hiring", path: "/hiring" },
    { icon: "💰", label: "Payroll", path: "/payroll" },
    { icon: "⏰", label: "დასწრება", path: "/attendance" },
    { icon: "📝", label: "დოკუმენტები", path: "/documents" },
    { icon: "⚙️", label: "პარამეტრები", path: "/settings" },
  ]

  return (
    <aside className="w-64 bg-[#0A1628] min-h-screen flex flex-col fixed left-0 top-0">
      <div className="px-6 py-6 border-b border-white/10 cursor-pointer" onClick={() => navigate('/')}>
        <h1 className="text-white font-bold text-xl">
          Smart <span className="text-[#1E5CDB]">HR</span>
        </h1>
        <p className="text-gray-400 text-xs mt-1">SmartPro Georgia</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((item) => (
          <button key={item.path} onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              location.pathname === item.path
                ? 'bg-[#1E5CDB] text-white'
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
            }`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="w-full text-left text-xs text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-white/5">
          🚪 გასვლა
        </button>
      </div>
    </aside>
  )
}
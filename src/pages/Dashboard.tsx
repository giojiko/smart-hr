import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login')
      else setUser(session.user)
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0A1628] min-h-screen flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-white font-bold text-xl">
            Smart <span className="text-[#1E5CDB]">HR</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1">SmartPro Georgia</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { icon: "📊", label: "Dashboard", path: "/dashboard", active: true },
            { icon: "🏢", label: "კომპანია", path: "/company" },
            { icon: "👥", label: "თანამშრომლები", path: "/employees" },
            { icon: "📋", label: "Hiring", path: "/hiring" },
            { icon: "💰", label: "Payroll", path: "/payroll" },
            { icon: "⏰", label: "დასწრება", path: "/attendance" },
            { icon: "📝", label: "დოკუმენტები", path: "/documents" },
            { icon: "⚙️", label: "პარამეტრები", path: "/settings" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                item.active
                  ? 'bg-[#1E5CDB] text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#1E5CDB] flex items-center justify-content text-white text-xs font-bold flex items-center justify-center">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.email}</p>
              <p className="text-gray-400 text-xs">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-white/5"
          >
            🚪 გასვლა
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0A1628]">გამარჯობა! 👋</h2>
          <p className="text-gray-500 mt-1">Smart HR Dashboard — მიმოხილვა</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "თანამშრომელი", value: "0", icon: "👥", color: "bg-blue-50 text-blue-600" },
            { label: "ამ თვის Payroll", value: "₾0", icon: "💰", color: "bg-green-50 text-green-600" },
            { label: "დღეს გამოცხ.", value: "0", icon: "✅", color: "bg-purple-50 text-purple-600" },
            { label: "ღია ვაკანსია", value: "0", icon: "📋", color: "bg-orange-50 text-orange-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 border border-gray-100">
              <div className={`inline-flex p-2 rounded-lg ${s.color} mb-4`}>
                <span className="text-xl">{s.icon}</span>
              </div>
              <div className="text-2xl font-bold text-[#0A1628]">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
          <h3 className="font-semibold text-[#0A1628] mb-4">სწრაფი მოქმედებები</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "თანამშრომლის დამატება", icon: "➕", path: "/employees/new" },
              { label: "ვაკანსიის გამოქვეყნება", icon: "📢", path: "/hiring/new" },
              { label: "Payroll გაშვება", icon: "💸", path: "/payroll" },
              { label: "ანგარიში", icon: "📊", path: "/reports" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#1E5CDB] hover:bg-blue-50 transition-all"
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs text-gray-600 text-center">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-semibold text-[#0A1628] mb-4">ბოლო აქტივობა</h3>
          <div className="text-center py-8 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">ჯერ აქტივობა არ არის</p>
            <p className="text-xs mt-1">დაამატე პირველი თანამშრომელი დასაწყებად</p>
          </div>
        </div>

      </main>
    </div>
  )
}
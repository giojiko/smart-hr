import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  const navigate = useNavigate()
  const [, setUser] = useState<any>(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login')
      else setUser(session.user)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0A1628]">გამარჯობა! 👋</h2>
          <p className="text-gray-500 mt-1">Smart HR Dashboard — მიმოხილვა</p>
        </div>

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

        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-6">
          <h3 className="font-semibold text-[#0A1628] mb-4">სწრაფი მოქმედებები</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "თანამშრომლის დამატება", icon: "➕", path: "/employees/new" },
              { label: "ვაკანსიის გამოქვეყნება", icon: "📢", path: "/hiring/new" },
              { label: "Payroll გაშვება", icon: "💸", path: "/payroll" },
              { label: "ანგარიში", icon: "📊", path: "/reports" },
            ].map((a) => (
              <button key={a.label} onClick={() => navigate(a.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-[#1E5CDB] hover:bg-blue-50 transition-all">
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs text-gray-600 text-center">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

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
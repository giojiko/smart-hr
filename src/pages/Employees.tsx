import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function Employees() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1628]">თანამშრომლები</h2>
            <p className="text-gray-500 mt-1 text-sm">კომპანიის პერსონალის მართვა</p>
          </div>
          <button onClick={() => navigate('/employees/new')}
            className="bg-[#1E5CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            ➕ თანამშრომლის დამატება
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6 flex gap-4">
          <input type="text" placeholder="🔍 ძებნა სახელით, პოზიციით..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]" />
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]">
            <option>ყველა განყოფილება</option>
            <option>IT</option>
            <option>HR</option>
            <option>ფინანსები</option>
            <option>მარკეტინგი</option>
          </select>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]">
            <option>ყველა სტატუსი</option>
            <option>აქტიური</option>
            <option>შვებულებაში</option>
            <option>გათავისუფლებული</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-100">
          <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase">
            <div className="col-span-2">თანამშრომელი</div>
            <div>პოზიცია</div>
            <div>განყოფილება</div>
            <div>სტატუსი</div>
            <div>მოქმედება</div>
          </div>
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">👥</p>
            <p className="font-medium text-gray-600">თანამშრომლები არ არის</p>
            <p className="text-sm mt-2">დაამატე პირველი თანამშრომელი</p>
            <button onClick={() => navigate('/employees/new')}
              className="mt-6 bg-[#1E5CDB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
              ➕ პირველი თანამშრომლის დამატება
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}
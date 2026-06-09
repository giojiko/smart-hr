import { useState } from 'react'
import Sidebar from '../components/Sidebar'

const defaultDepartments = ['IT', 'HR', 'ფინანსები', 'მარკეტინგი', 'გაყიდვები', 'ოპერაციები', 'იურიდიული']
const defaultPositions = ['CEO', 'CTO', 'HR Manager', 'Developer', 'Designer', 'Accountant', 'Sales Manager']

export default function Settings() {
  const [activeTab, setActiveTab] = useState('departments')
  const [departments, setDepartments] = useState(defaultDepartments)
  const [positions, setPositions] = useState(defaultPositions)
  const [newDept, setNewDept] = useState('')
  const [newPos, setNewPos] = useState('')
  const [benefits, setBenefits] = useState([
    { name: 'ჯანმრთელობის დაზღვევა', company: 100, employee: 50, taxable: false },
    { name: 'ფიტპასი', company: 30, employee: 0, taxable: true },
  ])
  const [newBenefit, setNewBenefit] = useState({ name: '', company: '', employee: '', taxable: false })
  const [onboarding, setOnboarding] = useState([
    { day: 'Day 1', tasks: ['Welcome Email გაგზავნა', 'სამუშაო ადგილის მომზადება', 'სისტემებზე წვდომის მიცემა'] },
    { day: 'Week 1', tasks: ['HR-თან შეხვედრა', 'გუნდის გაცნობა', 'კომპანიის პოლიტიკის გაცნობა'] },
    { day: 'Month 1', tasks: ['პირველი შეფასება', 'OKR-ების დასახვა', 'Mentor-ის დანიშვნა'] },
  ])
  const [offboarding] = useState([
    { day: 'გათავისუფლების დღე', tasks: ['Exit Interview', 'სამუშაო ინსტრუმენტების ჩაბარება', 'წვდომების გაუქმება'] },
    { day: 'ბოლო კვირა', tasks: ['საბოლოო Payroll გაანგარიშება', 'სამუშაოს გადაცემა', 'სერთიფიკატის გაცემა'] },
  ])
  const [newTask, setNewTask] = useState({ phaseIdx: -1, text: '' })

  const inputClass = "border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"

  const tabs = [
    { id: 'departments', label: '🏢 განყოფილებები' },
    { id: 'positions', label: '💼 პოზიციები' },
    { id: 'payroll', label: '💰 Payroll & გადასახადები' },
    { id: 'visibility', label: '👁️ ხელფასის ხილვადობა' },
    { id: 'onboarding', label: '✅ Onboarding' },
    { id: 'offboarding', label: '🚪 Offboarding' },
    { id: 'probation', label: '⏳ საგამოცდო პერიოდი' },
  ]

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0A1628]">კომპანიის პარამეტრები</h2>
          <p className="text-gray-500 text-sm mt-1">მოირგე პლატფორმა შენს კომპანიაზე</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.id
                  ? 'bg-[#1E5CDB] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1E5CDB]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══ DEPARTMENTS ═══ */}
        {activeTab === 'departments' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#0A1628] mb-1">განყოფილებები</h3>
            <p className="text-gray-400 text-sm mb-6">შექმენი შენი კომპანიის სტრუქტურა — სტანდარტული + custom</p>
            <div className="flex gap-3 mb-6">
              <input value={newDept} onChange={e => setNewDept(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (() => { if (newDept.trim()) { setDepartments([...departments, newDept.trim()]); setNewDept('') } })()}
                className={`flex-1 ${inputClass}`} placeholder="ახალი განყოფილება (მაგ: Back-end გუნდი)" />
              <button onClick={() => { if (newDept.trim()) { setDepartments([...departments, newDept.trim()]); setNewDept('') } }}
                className="bg-[#1E5CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                ➕ დამატება
              </button>
            </div>
            <div className="space-y-2">
              {departments.map((d, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-[#1E5CDB]">🏢</span>
                    <span className="text-sm font-medium text-[#0A1628]">{d}</span>
                    {i < defaultDepartments.length && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">სტანდარტული</span>
                    )}
                  </div>
                  <button onClick={() => setDepartments(departments.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 text-sm">🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ POSITIONS ═══ */}
        {activeTab === 'positions' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#0A1628] mb-1">პოზიციები</h3>
            <p className="text-gray-400 text-sm mb-6">კომპანიის Job Title-ების ბიბლიოთეკა — მოირგე შენს სტრუქტურაზე</p>
            <div className="flex gap-3 mb-6">
              <input value={newPos} onChange={e => setNewPos(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (() => { if (newPos.trim()) { setPositions([...positions, newPos.trim()]); setNewPos('') } })()}
                className={`flex-1 ${inputClass}`} placeholder="ახალი პოზიცია (მაგ: Lead Developer)" />
              <button onClick={() => { if (newPos.trim()) { setPositions([...positions, newPos.trim()]); setNewPos('') } }}
                className="bg-[#1E5CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                ➕ დამატება
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {positions.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-[#1E5CDB]">💼</span>
                    <span className="text-sm font-medium text-[#0A1628]">{p}</span>
                  </div>
                  <button onClick={() => setPositions(positions.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 text-sm">🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PAYROLL ═══ */}
        {activeTab === 'payroll' && (
          <div className="space-y-6">

            {/* გადასახადები */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-[#0A1628] mb-1">გადასახადები — ქართული კანონმდებლობა 2024</h3>
              <p className="text-gray-400 text-sm mb-6">ავტომატურად გამოიყენება ყველა თანამშრომელზე</p>
              <div className="space-y-3">
                {[
                  { label: 'საშემოსავლო გადასახადი', rate: '20%', who: 'თანამშრომელი', note: 'გამოიქვითება ხელფასიდან', color: 'red' },
                  { label: 'საპენსიო (თანამშრომელი)', rate: '2%', who: 'თანამშრომელი', note: 'გამოიქვითება ხელფასიდან', color: 'orange' },
                  { label: 'საპენსიო (კომპანია)', rate: '2%', who: 'კომპანია', note: 'კომპანია დამატებით იხდის', color: 'orange' },
                  { label: 'საპენსიო (სახელმწიფო)', rate: '2%', who: 'სახელმწიფო', note: 'ავტომატური', color: 'blue' },
                ].map(t => (
                  <div key={t.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-medium text-sm text-[#0A1628]">{t.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.who} · {t.note}</p>
                    </div>
                    <span className="text-xl font-bold text-[#1E5CDB]">{t.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* დაბეგვრის ცხრილი */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-[#0A1628] mb-4">რა იბეგრება — ზუსტი ცხრილი</h3>
              <div className="space-y-2">
                {[
                  { type: 'ძირითადი ხელფასი', taxable: true },
                  { type: 'ბონუსი', taxable: true },
                  { type: 'ზეგანაკვეთური', taxable: true },
                  { type: 'სამივლინებო (ქვითრის გარეშე)', taxable: true },
                  { type: 'ფიტპასი / სხვა ფულადი ბენეფიტი', taxable: true },
                  { type: 'სამივლინებო (დოკუმენტირებული)', taxable: false },
                  { type: 'ჯანდაცვის დაზღვევა (კომპანიის წილი)', taxable: false },
                  { type: 'საჩუქარი (წელიწადში ₾1,000-მდე)', taxable: false },
                ].map(r => (
                  <div key={r.type} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-[#0A1628]">{r.type}</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      r.taxable ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {r.taxable ? '⚠️ იბეგრება' : '✅ არ იბეგრება'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ბენეფიტები */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-[#0A1628] mb-4">კომპანიის ბენეფიტები</h3>
              <div className="space-y-3 mb-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#0A1628]">{b.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${b.taxable ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {b.taxable ? '⚠️ იბეგრება' : '✅ არ იბეგრება'}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">კომპანია</p>
                      <p className="font-bold text-green-600">₾{b.company}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">თანამშრომელი</p>
                      <p className="font-bold text-orange-500">₾{b.employee}</p>
                    </div>
                    <button onClick={() => setBenefits(benefits.filter((_, idx) => idx !== i))}
                      className="text-gray-400 hover:text-red-500">🗑️</button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <input className={`col-span-2 ${inputClass} bg-white`} placeholder="ბენეფიტის სახელი"
                  value={newBenefit.name} onChange={e => setNewBenefit({...newBenefit, name: e.target.value})} />
                <input type="number" className={`${inputClass} bg-white`} placeholder="კომპანია ₾"
                  value={newBenefit.company} onChange={e => setNewBenefit({...newBenefit, company: e.target.value})} />
                <input type="number" className={`${inputClass} bg-white`} placeholder="თანამშ. ₾"
                  value={newBenefit.employee} onChange={e => setNewBenefit({...newBenefit, employee: e.target.value})} />
                <button onClick={() => {
                  if (newBenefit.name) {
                    setBenefits([...benefits, { name: newBenefit.name, company: Number(newBenefit.company), employee: Number(newBenefit.employee), taxable: newBenefit.taxable }])
                    setNewBenefit({ name: '', company: '', employee: '', taxable: false })
                  }
                }} className="bg-[#1E5CDB] text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  ➕
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <input type="checkbox" id="taxable" checked={newBenefit.taxable}
                  onChange={e => setNewBenefit({...newBenefit, taxable: e.target.checked})} />
                <label htmlFor="taxable" className="text-sm text-gray-600">ეს ბენეფიტი იბეგრება</label>
              </div>
            </div>
          </div>
        )}

        {/* ═══ VISIBILITY ═══ */}
        {activeTab === 'visibility' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#0A1628] mb-1">ხელფასის ხილვადობა</h3>
            <p className="text-gray-400 text-sm mb-6">განსაზღვრე ვინ ხედავს ხელფასის ინფორმაციას</p>
            <div className="space-y-3">
              {[
                { role: 'Super HR Admin', desc: 'ყველა თანამშრომლის ხელფასი', badge: 'სრული წვდომა', color: 'green' },
                { role: 'HR Specialist', desc: 'ხელფასი არ ჩანს', badge: 'შეზღუდული', color: 'red' },
                { role: 'Department Head', desc: 'მხოლოდ საკუთარი გუნდი (HR-ის ნებართვით)', badge: 'პირობითი', color: 'orange' },
                { role: 'Employee', desc: 'მხოლოდ საკუთარი', badge: 'პირადი', color: 'blue' },
              ].map(r => (
                <div key={r.role} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-medium text-sm text-[#0A1628]">{r.role}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full bg-${r.color}-100 text-${r.color}-700`}>
                    {r.badge}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-medium text-[#0A1628] mb-2">👁️ ინდივიდუალური ნებართვა</p>
              <p className="text-xs text-gray-500 mb-3">მიანიჭე კონკრეტულ პირს კონკრეტული თანამშრომლის ხელფასის ხილვა</p>
              <div className="flex gap-3">
                <input className={`flex-1 ${inputClass} bg-white`} placeholder="ვინ ხედავს (მაგ: CTO)" />
                <input className={`flex-1 ${inputClass} bg-white`} placeholder="ვის ხელფასს (მაგ: Dev გუნდი)" />
                <button className="bg-[#1E5CDB] text-white px-4 py-2.5 rounded-lg text-sm hover:bg-blue-700">დამატება</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ ONBOARDING ═══ */}
        {activeTab === 'onboarding' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#0A1628] mb-1">Onboarding (ახალი თანამშრომლის მიღება)</h3>
            <p className="text-gray-400 text-sm mb-6">სტანდარტული პოლიტიკა + შენი custom დავალებები</p>
            <div className="space-y-4">
              {onboarding.map((phase, pi) => (
                <div key={pi} className="border border-gray-100 rounded-xl p-4">
                  <span className="bg-[#1E5CDB] text-white text-xs px-3 py-1 rounded-full font-medium">{phase.day}</span>
                  <div className="space-y-2 mt-3">
                    {phase.tasks.map((task, ti) => (
                      <div key={ti} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>{task}
                        </div>
                        <button onClick={() => {
                          const updated = [...onboarding]
                          updated[pi].tasks = updated[pi].tasks.filter((_, i) => i !== ti)
                          setOnboarding(updated)
                        }} className="text-gray-300 hover:text-red-400 text-xs">🗑️</button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input className={`flex-1 ${inputClass} text-xs`} placeholder="ახალი დავალება..."
                      value={newTask.phaseIdx === pi ? newTask.text : ''}
                      onChange={e => setNewTask({ phaseIdx: pi, text: e.target.value })}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newTask.text.trim()) {
                          const updated = [...onboarding]
                          updated[pi].tasks.push(newTask.text.trim())
                          setOnboarding(updated)
                          setNewTask({ phaseIdx: -1, text: '' })
                        }
                      }} />
                    <button onClick={() => {
                      if (newTask.text.trim()) {
                        const updated = [...onboarding]
                        updated[pi].tasks.push(newTask.text.trim())
                        setOnboarding(updated)
                        setNewTask({ phaseIdx: -1, text: '' })
                      }
                    }} className="bg-[#1E5CDB] text-white px-3 py-2 rounded-lg text-xs hover:bg-blue-700">➕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ OFFBOARDING ═══ */}
        {activeTab === 'offboarding' && (
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-[#0A1628] mb-1">Offboarding (თანამშრომლის გათავისუფლება)</h3>
            <p className="text-gray-400 text-sm mb-6">ქართული შრომის კოდექსით — სწორი და კანონიერი პროცესი</p>
            <div className="space-y-4">
              {offboarding.map((phase, pi) => (
                <div key={pi} className="border border-gray-100 rounded-xl p-4">
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">{phase.day}</span>
                  <div className="space-y-2 mt-3">
                    {phase.tasks.map((task, ti) => (
                      <div key={ti} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-red-400">✓</span>{task}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <p className="text-sm font-medium text-yellow-800 mb-1">⚖️ შრომის კოდექსი — მნიშვნელოვანი</p>
              <p className="text-xs text-yellow-700">გამოსაცდელ ვადაში — <strong>3 კალენდარული დღე</strong> წინასწარ გაფრთხილება</p>
              <p className="text-xs text-yellow-700 mt-1">გამოსაცდელის შემდეგ — <strong>30 კალენდარული დღე</strong> ან კომპენსაცია</p>
            </div>
          </div>
        )}

        {/* ═══ PROBATION ═══ */}
        {activeTab === 'probation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="font-semibold text-[#0A1628] mb-1">საგამოცდო პერიოდი</h3>
              <p className="text-gray-400 text-sm mb-6">ქართული შრომის კოდექსი — მაქს. 6 თვე</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'სტანდარტული ხანგრძლივობა', value: '3 თვე', note: 'ყველაზე გავრცელებული' },
                  { label: 'მაქსიმალური ვადა', value: '6 თვე', note: 'კანონის ლიმიტი' },
                  { label: 'შეწყვეტის გაფრთხილება', value: '3 დღე', note: 'ორივე მხრიდან' },
                ].map(s => (
                  <div key={s.label} className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-[#1E5CDB]">{s.value}</p>
                    <p className="text-sm font-medium text-[#0A1628] mt-1">{s.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.note}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold text-[#0A1628] mb-4">Default საგამოცდო პარამეტრები</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ვადა (თვეებში)</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]">
                    <option>3 თვე (სტანდარტული)</option>
                    <option>1 თვე</option>
                    <option>2 თვე</option>
                    <option>6 თვე (მაქსიმალური)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">შეხსენება ვადის გასვლამდე</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]">
                    <option>2 კვირით ადრე</option>
                    <option>1 კვირით ადრე</option>
                    <option>1 თვით ადრე</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm font-medium text-[#0A1628] mb-3">💰 ხელფასის სტრუქტურა საგამოცდო პერიოდში</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-xs text-gray-400 mb-1">საგამოცდო პერიოდი</p>
                    <p className="text-lg font-bold text-orange-500">₾X,XXX</p>
                    <p className="text-xs text-gray-400 mt-1">HR ადგენს თითოეულ თანამშრომელზე</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-xs text-gray-400 mb-1">საგამოცდო პერიოდის შემდეგ</p>
                    <p className="text-lg font-bold text-green-600">₾X,XXX</p>
                    <p className="text-xs text-gray-400 mt-1">სრული ხელფასი კონტრაქტის მიხედვით</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-sm font-medium text-yellow-800 mb-2">⚖️ კანონიერი სახელშეკრულებო ვარიანტები</p>
                <div className="space-y-2">
                  {[
                    'განუსაზღვრელი ვადის შრომის ხელშეკრულება + საგამოცდო პუნქტი',
                    'განსაზღვრული ვადის ხელშეკრულება (3-6 თვე)',
                    'მომსახურების ხელშეკრულება (ინდივიდუალური მეწარმე)',
                  ].map(v => (
                    <div key={v} className="flex items-center gap-2 text-xs text-yellow-700">
                      <span>📄</span>{v}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-green-700">
            ✓ პარამეტრების შენახვა
          </button>
        </div>

      </main>
    </div>
  )
}
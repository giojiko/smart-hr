import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function EmployeeNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [refFileName, setRefFileName] = useState('')

  const [form, setForm] = useState({
    // პირადი
    first_name: '', last_name: '', first_name_en: '', last_name_en: '',
    personal_id: '', birth_date: '', gender: '',
    email: '', phone: '', address: '', emergency_contact: '',
    // სამუშაო
    job_title: '', department: '', employment_type: '',
    start_date: '', manager: '', work_location: '',
    // საგამოცდო
    has_probation: true, probation_months: '3',
    probation_salary: '', full_salary: '',
    contract_type: 'indefinite',
    // ანაზღაურება
    bank_name: '', bank_iban: '',
    // დამატებითი
    prev_company: '', prev_position: '',
    experience_years: '', leaving_reason: '',
    reference_name: '', reference_phone: '',
    is_student: false, university: '',
    faculty: '', study_year: '', graduation_date: '',
  })

  const update = (field: string, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const probNet = form.probation_salary ? (Number(form.probation_salary) * 0.78).toFixed(0) : null
  const fullNet = form.full_salary ? (Number(form.full_salary) * 0.78).toFixed(0) : null

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    return Array.from({length: 10}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  }
  
  const handleSave = async () => {
    if (!form.email) { alert('ელ-ფოსტა სავალდებულოა'); return }
    if (!form.first_name || !form.last_name) { alert('სახელი და გვარი სავალდებულოა'); return }
  
    setLoading(true)
    const tempPassword = generateTempPassword()
  
    try {
      const response = await fetch('/api/create-employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeData: {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            phone: form.phone,
            job_title: form.job_title,
            department: form.department,
            start_date: form.start_date || null,
            salary_gross: form.full_salary || null,
            probation_salary: form.probation_salary || null,
            has_probation: form.has_probation,
            probation_months: form.probation_months,
          },
          tempPassword,
        })
      })
  
      const result = await response.json()
      if (result.error) throw new Error(result.error)
  
      alert('✅ თანამშრომელი დაემატა! Email გაიგზავნა.')
      navigate('/employees')
  
    } catch (err: any) {
      alert('შეცდომა: ' + err.message)
    }
  
    setLoading(false)
  }

  const steps = [
    { n: 1, label: 'პირადი ინფო' },
    { n: 2, label: 'სამუშაო ინფო' },
    { n: 3, label: 'საგამოცდო' },
    { n: 4, label: 'ანაზღაურება' },
    { n: 5, label: 'დამატებითი' },
  ]

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/employees')}
            className="text-gray-400 hover:text-gray-600 text-sm">
            ← უკან
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#0A1628]">ახალი თანამშრომელი</h2>
            <p className="text-gray-500 text-sm mt-1">სრული პროფილის შევსება</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {steps.map(s => (
            <button key={s.n} onClick={() => setStep(s.n)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                step === s.n
                  ? 'bg-[#1E5CDB] text-white'
                  : step > s.n
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white text-gray-500 border border-gray-200'
              }`}>
              <span>{step > s.n ? '✓' : s.n}</span>
              {s.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">

          {/* ══════════ STEP 1 — პირადი ══════════ */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold text-[#0A1628] mb-6">პირადი ინფორმაცია</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>სახელი (ქართული)</label>
                  <input className={inputClass} placeholder="გიორგი"
                    value={form.first_name} onChange={e => update('first_name', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>გვარი (ქართული)</label>
                  <input className={inputClass} placeholder="გიგაური"
                    value={form.last_name} onChange={e => update('last_name', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>სახელი (ლათინური)</label>
                  <input className={inputClass} placeholder="Giorgi"
                    value={form.first_name_en} onChange={e => update('first_name_en', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>გვარი (ლათინური)</label>
                  <input className={inputClass} placeholder="Gigauri"
                    value={form.last_name_en} onChange={e => update('last_name_en', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>პირადი ნომერი</label>
                  <input className={inputClass} placeholder="11 ნიშნა" maxLength={11}
                    value={form.personal_id} onChange={e => update('personal_id', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>დაბადების თარიღი</label>
                  <input type="date" className={inputClass}
                    value={form.birth_date} onChange={e => update('birth_date', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>სქესი</label>
                  <select className={inputClass} value={form.gender} onChange={e => update('gender', e.target.value)}>
                    <option value="">აირჩიე...</option>
                    <option value="male">მამრობითი</option>
                    <option value="female">მდედრობითი</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>ტელეფონი</label>
                  <input className={inputClass} placeholder="+995 5XX XXX XXX"
                    value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>ელ-ფოსტა</label>
                  <input type="email" className={inputClass} placeholder="giorgi@company.ge"
                    value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>მისამართი</label>
                  <input className={inputClass} placeholder="თბილისი, ვაკე..."
                    value={form.address} onChange={e => update('address', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>სასწრაფო კონტაქტი</label>
                  <input className={inputClass} placeholder="სახელი — ტელეფონი — კავშირი"
                    value={form.emergency_contact} onChange={e => update('emergency_contact', e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={() => setStep(2)}
                  className="bg-[#1E5CDB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                  შემდეგი →
                </button>
              </div>
            </div>
          )}

          {/* ══════════ STEP 2 — სამუშაო ══════════ */}
          {step === 2 && (
            <div>
              <h3 className="font-semibold text-[#0A1628] mb-6">სამუშაო ინფორმაცია</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>პოზიცია</label>
                  <input className={inputClass} placeholder="Software Developer"
                    value={form.job_title} onChange={e => update('job_title', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>განყოფილება</label>
                  <select className={inputClass} value={form.department} onChange={e => update('department', e.target.value)}>
                    <option value="">აირჩიე...</option>
                    <option>IT</option>
                    <option>HR</option>
                    <option>ფინანსები</option>
                    <option>მარკეტინგი</option>
                    <option>გაყიდვები</option>
                    <option>ოპერაციები</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>დასაქმების ტიპი</label>
                  <select className={inputClass} value={form.employment_type} onChange={e => update('employment_type', e.target.value)}>
                    <option value="">აირჩიე...</option>
                    <option value="full_time">სრული განაკვეთი</option>
                    <option value="part_time">ნახევარი განაკვეთი</option>
                    <option value="contract">კონტრაქტი</option>
                    <option value="intern">სტაჟიორი</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>სამუშაო ადგილი</label>
                  <select className={inputClass} value={form.work_location} onChange={e => update('work_location', e.target.value)}>
                    <option value="">აირჩიე...</option>
                    <option value="office">ოფისი</option>
                    <option value="remote">დისტანციური</option>
                    <option value="hybrid">ჰიბრიდული</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>სამუშაოდ მიღების თარიღი</label>
                  <input type="date" className={inputClass}
                    value={form.start_date} onChange={e => update('start_date', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>ხელმძღვანელი</label>
                  <input className={inputClass} placeholder="მენეჯერის სახელი"
                    value={form.manager} onChange={e => update('manager', e.target.value)} />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50">
                  ← უკან
                </button>
                <button onClick={() => setStep(3)}
                  className="bg-[#1E5CDB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                  შემდეგი →
                </button>
              </div>
            </div>
          )}

          {/* ══════════ STEP 3 — საგამოცდო ══════════ */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-[#0A1628] mb-6">საგამოცდო პერიოდი & ხელშეკრულება</h3>

              {/* ხელშეკრულების ტიპი */}
              <div className="mb-6">
                <label className={labelClass}>ხელშეკრულების ტიპი</label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { value: 'indefinite', label: 'განუსაზღვრელი ვადის', note: 'სტანდარტული' },
                    { value: 'fixed', label: 'განსაზღვრული ვადის', note: '3-6 თვე' },
                    { value: 'service', label: 'მომსახურების', note: 'ინდ. მეწარმე' },
                  ].map(c => (
                    <div key={c.value} onClick={() => update('contract_type', c.value)}
                      className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                        form.contract_type === c.value
                          ? 'border-[#1E5CDB] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <p className="font-medium text-sm text-[#0A1628]">{c.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* საგამოცდო toggle */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-[#0A1628]">საგამოცდო პერიოდი</p>
                    <p className="text-xs text-gray-400 mt-0.5">მაქს. 6 თვე — შრომის კოდექსი</p>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer"
                    onClick={() => update('has_probation', !form.has_probation)}>
                    <div className={`w-12 h-6 rounded-full transition-all ${form.has_probation ? 'bg-[#1E5CDB]' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-all shadow ${form.has_probation ? 'ml-6' : 'ml-0.5'}`} />
                    </div>
                    <span className="text-sm text-gray-600">{form.has_probation ? 'ჩართული' : 'გამორთული'}</span>
                  </div>
                </div>

                {form.has_probation && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>ხანგრძლივობა</label>
                      <select className={inputClass} value={form.probation_months}
                        onChange={e => update('probation_months', e.target.value)}>
                        <option value="1">1 თვე</option>
                        <option value="2">2 თვე</option>
                        <option value="3">3 თვე (სტანდარტული)</option>
                        <option value="6">6 თვე (მაქსიმალური)</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>ხელფასი საგამოცდოში ₾</label>
                      <input type="number" className={inputClass} placeholder="2000"
                        value={form.probation_salary} onChange={e => update('probation_salary', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>ხელფასი შემდეგ ₾</label>
                      <input type="number" className={inputClass} placeholder="3000"
                        value={form.full_salary} onChange={e => update('full_salary', e.target.value)} />
                    </div>
                  </div>
                )}

                {form.has_probation && probNet && fullNet && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-100">
                      <p className="text-xs text-gray-400">საგამოცდოში (Net ხელზე)</p>
                      <p className="font-bold text-orange-500 text-xl mt-1">₾{probNet}</p>
                      <p className="text-xs text-gray-400 mt-1">Gross: ₾{form.probation_salary}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                      <p className="text-xs text-gray-400">საგამოცდოს შემდეგ (Net)</p>
                      <p className="font-bold text-green-600 text-xl mt-1">₾{fullNet}</p>
                      <p className="text-xs text-gray-400 mt-1">Gross: ₾{form.full_salary}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-xs text-yellow-800 font-medium mb-1">⚖️ შრომის კოდექსი</p>
                <p className="text-xs text-yellow-700">საგამოცდო პერიოდში — <strong>3 კალენდარული დღე</strong> წინასწარ გაფრთხილება</p>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50">
                  ← უკან
                </button>
                <button onClick={() => setStep(4)}
                  className="bg-[#1E5CDB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                  შემდეგი →
                </button>
              </div>
            </div>
          )}

          {/* ══════════ STEP 4 — ანაზღაურება ══════════ */}
          {step === 4 && (
            <div>
              <h3 className="font-semibold text-[#0A1628] mb-6">საბაზო ანაზღაურება</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>ძირითადი ხელფასი Gross ₾</label>
                  <input type="number" className={inputClass} placeholder="3000"
                    value={form.full_salary} onChange={e => update('full_salary', e.target.value)} />
                  <p className="text-xs text-gray-400 mt-1">ბონუსები და დანამატები — Employee Profile-ში</p>
                </div>
                <div>
                  <label className={labelClass}>ბანკი</label>
                  <select className={inputClass} value={form.bank_name} onChange={e => update('bank_name', e.target.value)}>
                    <option value="">აირჩიე...</option>
                    <option>TBC Bank</option>
                    <option>Bank of Georgia</option>
                    <option>Credo Bank</option>
                    <option>Liberty Bank</option>
                    <option>სხვა</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>IBAN (საბანკო ანგარიში)</label>
                  <input className={inputClass} placeholder="GE00TB0000000000000000"
                    value={form.bank_iban} onChange={e => update('bank_iban', e.target.value)} />
                </div>
              </div>

              {form.full_salary && (
                <div className="mt-6 bg-[#0A1628] rounded-xl p-5">
                  <p className="text-white font-medium mb-3">💰 საბაზო კალკულაცია</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gross ხელფასი</span>
                      <span className="text-white">₾{Number(form.full_salary).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">- საშემოსავლო (20%)</span>
                      <span className="text-red-400">-₾{(Number(form.full_salary) * 0.20).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">- საპენსიო (2%)</span>
                      <span className="text-red-400">-₾{(Number(form.full_salary) * 0.02).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-2 mt-2 flex justify-between">
                      <span className="text-white font-medium">= Net (ხელზე)</span>
                      <span className="text-green-400 font-bold">₾{(Number(form.full_salary) * 0.78).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-400 text-xs">კომპანიის სრული ხარჯი (+საპენს. 2%)</span>
                      <span className="text-yellow-400 text-xs">₾{(Number(form.full_salary) * 1.02).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(3)}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50">
                  ← უკან
                </button>
                <button onClick={() => setStep(5)}
                  className="bg-[#1E5CDB] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                  შემდეგი →
                </button>
              </div>
            </div>
          )}

          {/* ══════════ STEP 5 — დამატებითი (არასავალდებულო) ══════════ */}
          {step === 5 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-semibold text-[#0A1628]">დამატებითი ინფორმაცია</h3>
                <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">არასავალდებულო</span>
              </div>

              {/* წინა გამოცდილება */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                <p className="font-medium text-sm text-[#0A1628] mb-4">💼 წინა სამუშაო გამოცდილება</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>წინა სამსახური / კომპანია</label>
                    <input className={inputClass} placeholder="კომპანიის სახელი"
                      value={form.prev_company} onChange={e => update('prev_company', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>პოზიცია წინა სამსახურში</label>
                    <input className={inputClass} placeholder="Software Developer"
                      value={form.prev_position} onChange={e => update('prev_position', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>გამოცდილების ხანგრძლივობა</label>
                    <select className={inputClass} value={form.experience_years}
                      onChange={e => update('experience_years', e.target.value)}>
                      <option value="">აირჩიე...</option>
                      <option value="0">გამოცდილების გარეშე</option>
                      <option value="1">1 წელი</option>
                      <option value="2">2 წელი</option>
                      <option value="3">3 წელი</option>
                      <option value="5">5+ წელი</option>
                      <option value="10">10+ წელი</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>გათავისუფლების მიზეზი</label>
                    <select className={inputClass} value={form.leaving_reason}
                      onChange={e => update('leaving_reason', e.target.value)}>
                      <option value="">აირჩიე...</option>
                      <option value="career">კარიერული ზრდა</option>
                      <option value="salary">ანაზღაურება</option>
                      <option value="relocation">გადასახლება</option>
                      <option value="contract_end">კონტრაქტის დასრულება</option>
                      <option value="other">სხვა</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* სარეკომენდაციო წერილი */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
                <p className="font-medium text-sm text-[#0A1628] mb-4">📄 სარეკომენდაციო წერილი</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>რეკომენდატორის სახელი</label>
                    <input className={inputClass} placeholder="სახელი გვარი"
                      value={form.reference_name} onChange={e => update('reference_name', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>რეკომენდატორის ტელეფონი</label>
                    <input className={inputClass} placeholder="+995 5XX XXX XXX"
                      value={form.reference_phone} onChange={e => update('reference_phone', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>სარეკომენდაციო წერილის ატვირთვა</label>
                    <div
                      className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#1E5CDB] transition-all cursor-pointer"
                      onClick={() => document.getElementById('ref-file')?.click()}>
                      <p className="text-3xl mb-2">📎</p>
                      <p className="text-sm text-gray-500">დააჭირე ან გადმოათრიე ფაილი</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOCX — მაქს. 5MB</p>
                      <input id="ref-file" type="file" accept=".pdf,.docx" className="hidden"
                        onChange={e => setRefFileName(e.target.files?.[0]?.name || '')} />
                    </div>
                    {refFileName && (
                      <p className="text-sm text-green-600 mt-2">✅ {refFileName}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* სტუდენტი */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium text-sm text-[#0A1628]">🎓 სტუდენტი</p>
                  <div className="flex items-center gap-2 cursor-pointer"
                    onClick={() => update('is_student', !form.is_student)}>
                    <div className={`w-12 h-6 rounded-full transition-all ${form.is_student ? 'bg-[#1E5CDB]' : 'bg-gray-300'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full mt-0.5 shadow transition-all ${form.is_student ? 'ml-6' : 'ml-0.5'}`} />
                    </div>
                    <span className="text-sm text-gray-600">{form.is_student ? 'დიახ' : 'არა'}</span>
                  </div>
                </div>

                {form.is_student && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>სასწავლებლის სახელი</label>
                      <input className={inputClass} placeholder="თბილისის სახელმწიფო უნივერსიტეტი"
                        value={form.university} onChange={e => update('university', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>ფაკულტეტი</label>
                      <input className={inputClass} placeholder="ინფორმატიკა და მათემატიკა"
                        value={form.faculty} onChange={e => update('faculty', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>კურსი</label>
                      <select className={inputClass} value={form.study_year}
                        onChange={e => update('study_year', e.target.value)}>
                        <option value="">აირჩიე...</option>
                        <option value="1">I კურსი (ბაკალავრი)</option>
                        <option value="2">II კურსი (ბაკალავრი)</option>
                        <option value="3">III კურსი (ბაკალავრი)</option>
                        <option value="4">IV კურსი (ბაკალავრი)</option>
                        <option value="master">მაგისტრი</option>
                        <option value="phd">დოქტორანტი</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>სწავლის დამთავრების თარიღი</label>
                      <input type="date" className={inputClass}
                        value={form.graduation_date} onChange={e => update('graduation_date', e.target.value)} />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(4)}
                  className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm hover:bg-gray-50">
                  ← უკან
                </button>
                <button onClick={handleSave} disabled={loading}
                  className="bg-green-600 text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                  {loading ? 'ინახება...' : '✓ თანამშრომლის შენახვა'}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
import { useState } from 'react'
import { supabase } from '../supabase'

export default function Register() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [industry, setIndustry] = useState('')
  const [size, setSize] = useState('')
  const [plan, setPlan] = useState('growth')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('პაროლები არ ემთხვევა')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          company_id: companyId,
          plan,
        }
      }
    })
    if (error) setError(error.message)
    else setStep(4)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
            <a href="/" className="inline-block">
                <h1 className="text-2xl font-bold text-[#0A1628]">
            Smart <span className="text-[#1E5CDB]">HR</span>
                </h1>
            </a>
          <p className="text-gray-500 mt-1 text-sm">კომპანიის რეგისტრაცია</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step > s ? 'bg-green-500 text-white' :
                step === s ? 'bg-[#1E5CDB] text-white' :
                'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Step 1 — ადმინისტრატორი */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-[#0A1628] mb-4">ადმინისტრატორის ანგარიში</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">სახელი</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                  placeholder="გიორგი" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">გვარი</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                  placeholder="გიგაური" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ელ-ფოსტა</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                placeholder="you@company.ge" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">პაროლი</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                placeholder="მინ. 8 სიმბოლო" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">პაროლის დადასტურება</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                placeholder="••••••••" required />
            </div>
            <button onClick={() => {
              if (!firstName || !lastName || !email || !password) { setError('შეავსე ყველა ველი'); return }
              if (password !== confirmPassword) { setError('პაროლები არ ემთხვევა'); return }
              if (password.length < 8) { setError('პაროლი მინ. 8 სიმბოლო'); return }
              setError(''); setStep(2)
            }} className="w-full bg-[#1E5CDB] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
              შემდეგი →
            </button>
          </div>
        )}

        {/* Step 2 — კომპანია */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-[#0A1628] mb-4">კომპანიის ინფორმაცია</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">კომპანიის სახელი</label>
              <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                placeholder="შპს მაგალითი" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">საიდენტიფიკაციო კოდი</label>
              <input type="text" value={companyId} onChange={e => setCompanyId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
                placeholder="11 ნიშნა კოდი" maxLength={11} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ინდუსტრია</label>
              <select value={industry} onChange={e => setIndustry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]">
                <option value="">აირჩიე...</option>
                <option>ტექნოლოგია</option>
                <option>ფინანსები</option>
                <option>ჯანდაცვა</option>
                <option>განათლება</option>
                <option>სამშენებლო</option>
                <option>საცალო ვაჭრობა</option>
                <option>სხვა</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">კომპანიის ზომა</label>
              <select value={size} onChange={e => setSize(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]">
                <option value="">აირჩიე...</option>
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
                <option>201-500</option>
                <option>500+</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50">
                ← უკან
              </button>
              <button onClick={() => {
                if (!companyName || !companyId) { setError('შეავსე ყველა ველი'); return }
                setError(''); setStep(3)
              }} className="flex-1 bg-[#1E5CDB] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                შემდეგი →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — პლანი */}
        {step === 3 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="font-semibold text-[#0A1628] mb-4">პლანის არჩევა</h2>
            {[
              { id: 'starter', name: 'Starter', price: '₾15', desc: '10-50 თანამშრომელი' },
              { id: 'growth', name: 'Growth', price: '₾25', desc: '51-250 თანამშრომელი' },
              { id: 'enterprise', name: 'Enterprise', price: 'Custom', desc: '250+ თანამშრომელი' },
            ].map((p) => (
              <div key={p.id} onClick={() => setPlan(p.id)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  plan === p.id ? 'border-[#1E5CDB] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-[#0A1628]">{p.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0A1628]">{p.price}</div>
                    {p.price !== 'Custom' && <div className="text-xs text-gray-400">user/თვე</div>}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 mt-2">
              <button type="button" onClick={() => setStep(2)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50">
                ← უკან
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 bg-[#1E5CDB] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'იქმნება...' : 'რეგისტრაცია ✓'}
              </button>
            </div>
          </form>
        )}

        {/* Step 4 — დადასტურება */}
        {step === 4 && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="font-bold text-[#0A1628] text-lg">შეამოწმე ელ-ფოსტა!</h2>
            <p className="text-gray-500 text-sm mt-2">
              დადასტურების ბმული გამოვაგზავნეთ:<br />
              <span className="font-medium text-[#0A1628]">{email}</span>
            </p>
            <a href="/login" className="mt-6 inline-block bg-[#1E5CDB] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
              შესვლაზე გადასვლა
            </a>
          </div>
        )}

        {step < 4 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            უკვე გაქვს ანგარიში?{' '}
            <a href="/login" className="text-[#1E5CDB] hover:underline">შესვლა</a>
          </p>
        )}
      </div>
    </div>
  )
}
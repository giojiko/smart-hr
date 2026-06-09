import { useState } from 'react'
import { supabase } from '../supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    if (data.session) {
      window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-[#0A1628]">
              Smart <span className="text-[#1E5CDB]">HR</span>
            </h1>
          </a>
          <p className="text-gray-500 mt-2 text-sm">სისტემაში შესვლა</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ელ-ფოსტა
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
              placeholder="you@company.ge"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              პაროლი
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5CDB]"
              placeholder="••••••••"
              required
            />
            <div className="text-right mt-1">
              <a href="/forgot-password" className="text-xs text-[#1E5CDB] hover:underline">
                პაროლი დამავიწყდა?
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E5CDB] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'შედის...' : 'შესვლა'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ანგარიში არ გაქვს?{' '}
          <a href="/register" className="text-[#1E5CDB] hover:underline">
            რეგისტრაცია
          </a>
        </p>
      </div>
    </div>
  )
}
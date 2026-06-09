function App() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="bg-[#0A1628] px-8 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Smart <span className="text-[#1E5CDB]">HR</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white">მოდულები</a>
          <a href="#pricing" className="hover:text-white">ფასი</a>
          <a href="#contact" className="hover:text-white">კონტაქტი</a>
        </div>
        <div className="flex gap-3">
          <button className="text-sm text-gray-300 hover:text-white px-4 py-2">
            შესვლა
          </button>
          <button className="bg-[#1E5CDB] text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
            უფასოდ სცადე
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0A1628] px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-[#1E5CDB]/20 text-[#60A5FA] text-sm px-4 py-1 rounded-full">
            SmartPro Georgia — HR პროდუქტი
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-6 leading-tight">
            ადამიანური რესურსები —{" "}
            <span className="text-[#1E5CDB]">ჭკვიანად</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6 leading-relaxed">
            ქართული HR პლატფორმა, მორგებული ქართულ ბაზარსა და შრომის კოდექსზე.
            BambooHR-ის საუკეთესო ალტერნატივა.
          </p>
          <div className="flex gap-4 justify-center mt-10">
            <button className="bg-[#1E5CDB] text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-blue-700">
              უფასოდ სცადე →
            </button>
            <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg text-base hover:border-gray-400">
              Demo ნახვა
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            კრედიტ ბარათი არ გჭირდება · 14 დღე უფასოდ
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0F1F3D] px-8 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: "50+", label: "კომპანია" },
            { num: "2,000+", label: "თანამშრომელი" },
            { num: "40%", label: "დაზოგილი დრო" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-white">{s.num}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A1628] text-center">
            ყველაფერი ერთ პლატფორმაში
          </h2>
          <p className="text-gray-500 text-center mt-3">
            HR-ის სამართავი სრული ინსტრუმენტები
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "👤", title: "თანამშრომლების პროფილები", desc: "360° პროფილი, დოკუმენტები, ისტორია — ყველაფერი ერთ ადგილას" },
              { icon: "📋", title: "Hiring & Onboarding", desc: "LinkedIn სინქრონიზაცია, კანდიდატების ტრეკინგი, ავტომატური onboarding" },
              { icon: "💰", title: "Payroll — ხელფასები", desc: "ქართული გადასახადები, ლარში, RS.ge-ს ანგარიშგება" },
              { icon: "⏰", title: "დასწრების კონტროლი", desc: "Web, GPS, QR — მოსვლა/წასვლის ავტომატური ჩაწერა" },
              { icon: "📝", title: "ციფრული ხელმოწერა", desc: "ხელშეკრულებები, ბრძანებები — ქაღალდის გარეშე" },
              { icon: "⚖️", title: "ქართული შრომის კოდექსი", desc: "შვებულება, დეკრეტი, ზეგანაკვეთური — კანონის მიხედვით" },
            ].map((f) => (
              <div key={f.title} className="border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-[#1E5CDB]/30 transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-[#0A1628] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-8 py-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A1628] text-center">ფასი</h2>
          <p className="text-gray-500 text-center mt-3">გამჭვირვალე, მარტივი</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { name: "Starter", price: "₾15", per: "user/თვე", features: ["10-50 თანამშრომელი", "ძირითადი 5 მოდული", "Email მხარდაჭერა"], highlight: false },
              { name: "Growth", price: "₾25", per: "user/თვე", features: ["51-250 თანამშრომელი", "ყველა 15 მოდული", "Chat + Email"], highlight: true },
              { name: "Enterprise", price: "Custom", per: "", features: ["250+ თანამშრომელი", "Custom მოდულები", "Dedicated მენეჯერი"], highlight: false },
            ].map((p) => (
              <div key={p.name} className={`rounded-xl p-6 ${p.highlight ? "bg-[#0A1628] text-white ring-2 ring-[#1E5CDB]" : "bg-white border border-gray-200"}`}>
                {p.highlight && <div className="text-xs text-[#60A5FA] font-medium mb-3">ყველაზე პოპულარული</div>}
                <div className={`font-semibold text-lg ${p.highlight ? "text-white" : "text-[#0A1628]"}`}>{p.name}</div>
                <div className="mt-3 mb-6">
                  <span className={`text-4xl font-bold ${p.highlight ? "text-white" : "text-[#0A1628]"}`}>{p.price}</span>
                  <span className={`text-sm ml-1 ${p.highlight ? "text-gray-400" : "text-gray-500"}`}>{p.per}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className={`text-sm flex gap-2 ${p.highlight ? "text-gray-300" : "text-gray-600"}`}>
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 rounded-lg text-sm font-medium ${p.highlight ? "bg-[#1E5CDB] text-white hover:bg-blue-600" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                  დაწყება
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A1628] px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">მზად ხარ დასაწყებად?</h2>
        <p className="text-gray-400 mt-4">14 დღე უფასოდ. კრედიტ ბარათი არ გჭირდება.</p>
        <button className="mt-8 bg-[#1E5CDB] text-white px-10 py-3 rounded-lg font-medium hover:bg-blue-700">
          უფასოდ სცადე →
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#060E1A] px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white font-bold">Smart <span className="text-[#1E5CDB]">HR</span></div>
          <div className="text-gray-500 text-sm">SmartPro Georgia © 2026 · hr.smartpro.ge</div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">კონფიდენციალურობა</a>
            <a href="#" className="hover:text-gray-300">პირობები</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
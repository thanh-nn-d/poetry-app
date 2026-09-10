import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

const students = [
  { id: "HS001", name: "Nguyễn Minh Anh", level: 2, progress: 68, last: "Hôm nay" },
  { id: "HS002", name: "Trần Gia Hân", level: 1, progress: 42, last: "Hôm qua" },
  { id: "HS003", name: "Lê Hoàng Nam", level: 3, progress: 91, last: "Hôm nay" },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const stats = useMemo(() => ({ total: students.length, active: students.filter(s => s.last === "Hôm nay").length, avg: Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length) }), [])
  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="bg-[#7f1d2d] text-white px-8 py-5 flex items-center justify-between">
        <div><p className="text-xs tracking-widest text-yellow-200">GIÁO VIÊN</p><h1 className="text-2xl font-bold">Dashboard học tập</h1></div>
        <button onClick={() => navigate("/")} className="text-sm underline">Đăng xuất</button>
      </header>
      <main className="max-w-6xl mx-auto p-8 space-y-7">
        <div className="grid md:grid-cols-3 gap-5">
          <Stat title="Tổng số học sinh" value={stats.total}/><Stat title="Đang học hôm nay" value={stats.active}/><Stat title="Tiến độ trung bình" value={`${stats.avg}%`}/>
        </div>
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-5"><h2 className="text-xl font-bold text-[#7f1d2d]">Danh sách học sinh</h2><button onClick={() => navigate("/teacher/students")} className="text-sm font-semibold text-[#7f1d2d]">Xem hồ sơ →</button></div>
          <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b text-sm text-gray-500"><th className="py-3">HỌC SINH</th><th>MỨC HỖ TRỢ</th><th>TIẾN ĐỘ</th><th>HOẠT ĐỘNG GẦN NHẤT</th></tr></thead><tbody>{students.map(s => <tr key={s.id} className="border-b last:border-0"><td className="py-4 font-semibold">{s.name}<div className="text-xs text-gray-400">{s.id}</div></td><td>Mức {s.level}</td><td><div className="w-40 h-2 bg-gray-100 rounded-full"><div className="h-2 bg-[#7f1d2d] rounded-full" style={{width:`${s.progress}%`}}/></div><span className="text-xs">{s.progress}%</span></td><td>{s.last}</td></tr>)}</tbody></table></div>
        </section>
        <div className="flex gap-3"><button onClick={() => navigate("/teacher/grading")} className="rounded-xl bg-[#7f1d2d] text-white px-5 py-3 font-semibold">Chấm bài</button><button onClick={() => navigate("/teacher/feedback")} className="rounded-xl border border-[#7f1d2d] text-[#7f1d2d] px-5 py-3 font-semibold">Phản hồi học sinh</button></div>
      </main>
    </div>
  )
}
function Stat({title,value}) { return <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"><p className="text-sm text-gray-500">{title}</p><p className="text-3xl font-bold text-[#7f1d2d] mt-2">{value}</p></div> }

// src/pages/student/ChallengeResult.jsx
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { getLevelInfo, getSupportLevel, saveLearningRecord, loadChallengeResult, clearChallengeResult } from "./supportLevel"

export default function ChallengeResult() {
  const navigate = useNavigate()
  const data = useMemo(() => loadChallengeResult(), [])
  const level = data?.level || getSupportLevel()
  const info = getLevelInfo(level)

  const finish = () => {
    saveLearningRecord({
      type: "challenge",
      supportLevel: level,
      passed: null,
      status: "pending-research-confirmation",
      elapsedSeconds: data?.elapsedSeconds || 0,
      helpCount: data?.helpCount || 0,
    })
    clearChallengeResult()
    navigate("/student/text-selection")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="border-b border-[#eadfd5] bg-white"><div className="mx-auto max-w-5xl px-6 py-5"><p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">KẾT QUẢ THỬ THÁCH</p><h1 className="mt-1 text-2xl font-bold text-[#7f1d2d]">Thử thách chuyển mức hỗ trợ</h1></div></header>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#eadfd5]"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1d6] text-2xl font-bold text-[#a16207]">!</div><h2 className="mt-5 text-2xl font-bold text-[#7f1d2d]">Kết quả đã được ghi nhận</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">Cơ chế tự động xác định đạt/chưa đạt cần được nhóm nghiên cứu xác nhận cụ thể trước khi dùng để chuyển mức hỗ trợ. Hiện tại hệ thống giữ nguyên mức hỗ trợ.</p></section>
        <section className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-white p-5 ring-1 ring-[#eadfd5]"><p className="text-xs text-gray-500">Mức hiện tại</p><p className="mt-2 font-bold text-[#7f1d2d]">{info.label}</p><p className="mt-1 text-xs text-gray-500">{info.shortName}</p></div><div className="rounded-2xl bg-white p-5 ring-1 ring-[#eadfd5]"><p className="text-xs text-gray-500">Thời gian</p><p className="mt-2 font-bold text-[#7f1d2d]">{data?.elapsedSeconds ?? 0} giây</p></div><div className="rounded-2xl bg-white p-5 ring-1 ring-[#eadfd5]"><p className="text-xs text-gray-500">Yêu cầu hỗ trợ</p><p className="mt-2 font-bold text-[#7f1d2d]">{data?.helpCount ?? 0} lần</p></div></section>
        <div className="mt-6 flex justify-end"><button type="button" onClick={finish} className="rounded-2xl bg-[#8f1d2c] px-7 py-3.5 font-semibold text-white hover:bg-[#741624]">Tiếp tục luyện tập</button></div>
      </main>
    </div>
  )
}

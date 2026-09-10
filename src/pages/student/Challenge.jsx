// src/pages/student/Challenge.jsx
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevelInfo, getSupportLevel, saveChallengeResult } from "./supportLevel"

const questions = [
  "Xác định một hình ảnh hoặc từ ngữ nổi bật trong văn bản.",
  "Nêu nghĩa trực tiếp của hình ảnh được lựa chọn.",
  "Giải thích một liên tưởng hoặc tưởng tượng được gợi ra từ hình ảnh.",
  "Nêu ý nghĩa tượng trưng mà em nhận thấy.",
  "Chỉ ra một bằng chứng cụ thể từ văn bản cho nhận định của em.",
  "Phân tích mối quan hệ giữa bằng chứng và nhận định.",
  "Nhận xét về cảm xúc của chủ thể trữ tình.",
  "Nhận xét sự vận động của cảm xúc trong văn bản.",
  "Nhận xét một đặc điểm về nhịp điệu hoặc âm thanh.",
  "Khái quát cách các yếu tố nghệ thuật góp phần thể hiện ý nghĩa văn bản.",
]

export default function Challenge() {
  const navigate = useNavigate()
  const level = getSupportLevel()
  const info = getLevelInfo(level)
  const startedAt = useRef(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(10).fill(""))
  const [helpCount, setHelpCount] = useState(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const update = (value) => setAnswers((items) => items.map((item, index) => index === current ? value : item))

  const next = () => {
    if (!answers[current].trim()) {
      alert("Hãy hoàn thành câu trả lời trước khi tiếp tục.")
      return
    }

    if (current < questions.length - 1) {
      setCurrent((value) => value + 1)
      return
    }

    const elapsedSeconds = Math.max(0, Math.round((Date.now() - (startedAt.current || Date.now())) / 1000))
    saveChallengeResult({
      level,
      answers,
      helpCount,
      elapsedSeconds,
      submittedAt: new Date().toISOString(),
    })
    navigate("/student/challenge-result")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="border-b border-[#eadfd5] bg-white"><div className="mx-auto max-w-5xl px-6 py-5"><p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">THỬ THÁCH CHUYỂN MỨC HỖ TRỢ</p><h1 className="mt-1 text-2xl font-bold text-[#7f1d2d]">Bài thử thách</h1><p className="mt-1 text-sm text-gray-500">{info.label} · mức hỗ trợ tối thiểu · Câu {current + 1}/10</p></div></header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 h-2 rounded-full bg-gray-200"><div className="h-2 rounded-full bg-[#8f1d2c] transition-all" style={{ width: `${((current + 1) / 10) * 100}%` }} /></div>
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#eadfd5]">
          <p className="text-sm font-semibold text-[#a16207]">Câu {current + 1}</p>
          <h2 className="mt-3 text-xl font-bold text-gray-800">{questions[current]}</h2>
          <textarea value={answers[current]} onChange={(e) => update(e.target.value)} rows={9} className="mt-6 w-full rounded-2xl border border-[#eadfd5] bg-[#fffdf9] p-4 outline-none focus:border-[#8f1d2c]" placeholder="Nhập câu trả lời của em..." />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fffaf2] p-4 ring-1 ring-[#eadfd5]"><div><p className="text-sm font-semibold text-gray-700">Cần hỗ trợ?</p><p className="mt-1 text-xs text-gray-500">Số lần yêu cầu: {helpCount}</p></div><button type="button" onClick={() => setHelpCount((value) => value + 1)} className="rounded-xl border border-[#d8c7b8] px-4 py-2 text-sm font-semibold text-[#7f1d2d] hover:bg-white">Yêu cầu hỗ trợ</button></div>
          <div className="mt-6 flex items-center justify-between gap-4"><span className="text-xs text-gray-400">Hệ thống ghi nhận thời gian và số lần yêu cầu hỗ trợ.</span><button type="button" onClick={next} className="rounded-2xl bg-[#8f1d2c] px-7 py-3 font-semibold text-white hover:bg-[#741624]">{current === 9 ? "Nộp thử thách" : "Câu tiếp theo"}</button></div>
        </section>
      </main>
    </div>
  )
}

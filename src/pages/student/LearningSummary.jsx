// src/pages/student/LearningSummary.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  loadLearningProgress,
  saveLearningRecord,
} from "./supportLevel"

const TEXTS_PER_LEVEL = 3

const TEXT_IDS_BY_LEVEL = {
  1: ["buon-mua-dem", "van-ban-2", "van-ban-3"],
  2: ["van-ban-4", "van-ban-5", "van-ban-6"],
  3: ["van-ban-7", "van-ban-8", "van-ban-9"],
}

const ACTIVITIES = [
  "Tìm hiểu đặc sắc từ ngữ, hình ảnh qua sự tương giao cảm giác",
  "Tìm hiểu yếu tố tượng trưng",
  "Tìm hiểu nhạc điệu",
  "Tìm hiểu tình cảm, cảm xúc của chủ thể trữ tình",
  "Tìm hiểu cấu tứ",
]

export default function LearningSummary() {
  const navigate = useNavigate()

  const [reflection, setReflection] = useState("")
  const [saved, setSaved] = useState(false)

  const level = getSupportLevel()
  const info = getLevelInfo(level)
  const progress = loadLearningProgress()

  const currentText = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentText") || "null")
    } catch {
      return null
    }
  })()

  const currentTextId = currentText?.id || "buon-mua-dem"

  const completedTexts = Array.isArray(progress.completedTexts)
    ? progress.completedTexts
    : []

  const levelTextIds = TEXT_IDS_BY_LEVEL[level] || TEXT_IDS_BY_LEVEL[1]

  const levelTextCount = completedTexts.filter((id) =>
    levelTextIds.includes(id)
  ).length

  const elapsedSeconds = (() => {
    try {
      const records = JSON.parse(localStorage.getItem("learningRecords") || "[]")
      const currentRecord = [...records]
        .reverse()
        .find((item) => item.type === "text" && item.textId === currentTextId)
      return Number(currentRecord?.elapsedSeconds || 0)
    } catch {
      return 0
    }
  })()

  const handleContinue = () => {
    saveLearningRecord({
      type: "reflection",
      textId: currentTextId,
      supportLevel: level,
      reflection: reflection.trim(),
    })

    setSaved(true)

    if (levelTextCount >= TEXTS_PER_LEVEL) {
      navigate("/student/challenge")
    } else {
      navigate("/student/text-selection")
    }
  }

  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">
            TỔNG KẾT VÀ TỰ ĐÁNH GIÁ
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#7f1d2d]">
            {currentText?.title || "Văn bản vừa học"}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {info.label} · {levelTextCount}/{TEXTS_PER_LEVEL} văn bản của mức
            hiện tại
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Thời gian hoàn thành</p>
            <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">
              {minutes}:{String(seconds).padStart(2, "0")}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Thời gian được ghi nhận trong quá trình học.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Phần đã hoàn thành</p>
            <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">5 / 5</p>

            <div className="mt-4 h-2 rounded-full bg-gray-100">
              <div className="h-2 w-full rounded-full bg-[#8f1d2c]" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Tiến độ mức hiện tại</p>
            <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">
              {levelTextCount} / {TEXTS_PER_LEVEL}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Tổng số văn bản đã học trong toàn bộ quá trình:{" "}
              {completedTexts.length}.
            </p>
          </div>
        </div>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">
            Em đã thực hiện
          </h2>

          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {ACTIVITIES.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl bg-[#fff8ee] p-4 ring-1 ring-[#eadfd5]"
              >
                <span className="text-xs font-bold text-[#a16207]">
                  {index + 1}
                </span>

                <p className="mt-2 text-sm font-semibold leading-5">
                  {item}
                </p>

                <p className="mt-2 text-xs text-green-700">
                  Đã hoàn thành
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">
            Tự phản tư
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Điều gì trong văn bản vẫn còn khiến em băn khoăn hoặc muốn được
            giải đáp thêm?
          </p>

          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            rows={5}
            className="mt-4 w-full rounded-2xl border border-[#eadfd5] bg-[#fffdf9] p-4 outline-none focus:border-[#8f1d2c]"
            placeholder="Ghi lại câu hỏi, thắc mắc hoặc suy nghĩ của em..."
          />

          {saved && (
            <p className="mt-2 text-sm text-green-700">
              Phản hồi đã được lưu vào quá trình học tập.
            </p>
          )}
        </section>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/student/profile")}
            className="rounded-2xl border border-[#d8c7b8] px-6 py-3 font-semibold text-[#7f1d2d] hover:bg-white"
          >
            Xem hồ sơ học tập
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="rounded-2xl bg-[#8f1d2c] px-7 py-3.5 font-semibold text-white hover:bg-[#741624]"
          >
            {levelTextCount >= TEXTS_PER_LEVEL
              ? "Bắt đầu thử thách"
              : "Học văn bản tiếp theo"}
          </button>
        </div>
      </main>
    </div>
  )
}

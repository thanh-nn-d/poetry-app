// src/pages/student/LearningProfile.jsx

import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  loadInitialAssessment,
  loadLearningProgress,
  loadLearningRecords,
} from "./supportLevel"

const TEXT_IDS_BY_LEVEL = {
  1: ["buon-mua-dem", "van-ban-2", "van-ban-3"],
  2: ["van-ban-4", "van-ban-5", "van-ban-6"],
  3: ["van-ban-7", "van-ban-8", "van-ban-9"],
}

const ACTIVITY_NAMES = [
  "Tìm hiểu đặc sắc từ ngữ, hình ảnh qua sự tương giao cảm giác",
  "Tìm hiểu yếu tố tượng trưng",
  "Tìm hiểu nhạc điệu",
  "Tìm hiểu tình cảm, cảm xúc của chủ thể trữ tình",
  "Tìm hiểu cấu tứ",
]

function formatDuration(seconds = 0) {
  const value = Number(seconds || 0)
  const minutes = Math.floor(value / 60)
  const secs = value % 60
  if (minutes === 0) return `${secs} giây`
  return `${minutes} phút ${secs} giây`
}

function formatDate(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("vi-VN")
}

function ProgressBar({ value, label, detail }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="text-gray-500">{detail || `${Math.round(safe)}%`}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#f1ece7]">
        <div
          className="h-full rounded-full bg-[#8f1d2c] transition-all"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  )
}

function EmptyState({ children }) {
  return <p className="mt-4 rounded-2xl bg-[#faf8f3] p-4 text-sm text-gray-500">{children}</p>
}

export default function LearningProfile() {
  const navigate = useNavigate()
  const level = getSupportLevel()
  const info = getLevelInfo(level)
  const progress = loadLearningProgress()
  const initialAssessment = loadInitialAssessment()
  const records = loadLearningRecords()

  const completedTexts = Array.isArray(progress.completedTexts) ? progress.completedTexts : []
  const textRecords = records.filter((item) => item.type === "text")
  const challengeRecords = records.filter((item) => item.type === "challenge")
  const reflectionRecords = records.filter((item) => item.type === "reflection")

  const currentLevelTexts = TEXT_IDS_BY_LEVEL[level] || []
  const currentLevelCompleted = completedTexts.filter((id) => currentLevelTexts.includes(id)).length
  const textProgress = currentLevelTexts.length
    ? Math.round((currentLevelCompleted / currentLevelTexts.length) * 100)
    : 0

  const completedActivities = (() => {
    try {
      const value = JSON.parse(localStorage.getItem("currentTextActivities") || "[]")
      return Array.isArray(value) ? value : []
    } catch {
      return []
    }
  })()

  const taskProgress = Math.round(
    ((completedActivities.length + completedTexts.length * 5) /
      Math.max(1, currentLevelTexts.length * 5)) * 100
  )

  const transitionProgress = level === 1 ? 0 : Math.round(((level - 1) / 2) * 100)
  const totalStudyTime = Number(progress.totalStudyTime || 0)

  const cognitiveLoad = initialAssessment?.totalCognitiveLoad ?? initialAssessment?.rawTotalCognitiveLoad
  const readingScore = initialAssessment?.readingScore ?? initialAssessment?.score
  const provisionalLevel = initialAssessment?.provisionalSupportLevel

  const resultTrend = challengeRecords.slice(-6).map((item) => ({
    score: Number(item.score ?? item.correctAnswers ?? 0),
    passed: item.passed,
  }))

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">THEO DÕI HỌC TẬP</p>
          <h1 className="mt-1 text-2xl font-bold text-[#7f1d2d]">Hồ sơ học tập</h1>
          <p className="mt-1 text-sm text-gray-500">Theo dõi tiến độ, mức hỗ trợ và dữ liệu quá trình học tập của em.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Mức hỗ trợ hiện tại</p>
            <p className="mt-3 text-2xl font-bold text-[#7f1d2d]">Mức {level}</p>
            <p className="mt-1 text-sm text-gray-500">{info.shortName}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Văn bản đã học</p>
            <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">{completedTexts.length}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Thử thách đã thực hiện</p>
            <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">{challengeRecords.length}</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-sm text-gray-500">Tổng thời gian học</p>
            <p className="mt-3 text-2xl font-bold text-[#7f1d2d]">{formatDuration(totalStudyTime)}</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">Tiến độ học tập</h2>
          <div className="mt-6 space-y-6">
            <ProgressBar
              label="Nhiệm vụ học tập"
              value={taskProgress}
              detail={`${Math.min(completedActivities.length, 5)}/5 thao tác của văn bản hiện tại`}
            />
            <ProgressBar
              label={`Văn bản ở Mức ${level}`}
              value={textProgress}
              detail={`${currentLevelCompleted}/${currentLevelTexts.length || 3} văn bản`}
            />
            <ProgressBar
              label="Tiến độ chuyển mức hỗ trợ"
              value={transitionProgress}
              detail={level === 1 ? "Chưa chuyển mức" : `${level - 1}/2 lần chuyển mức`}
            />
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <h2 className="text-lg font-bold text-[#7f1d2d]">Kết quả đánh giá ban đầu</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#faf8f3] p-4">
                <p className="text-xs text-gray-500">Mức hỗ trợ tạm thời</p>
                <p className="mt-1 text-xl font-bold text-[#7f1d2d]">{provisionalLevel ? `Mức ${provisionalLevel}` : "—"}</p>
              </div>
              <div className="rounded-2xl bg-[#faf8f3] p-4">
                <p className="text-xs text-gray-500">Tải nhận thức</p>
                <p className="mt-1 text-xl font-bold text-[#7f1d2d]">{cognitiveLoad != null ? Number(cognitiveLoad).toFixed(2) : "—"}</p>
              </div>
              <div className="rounded-2xl bg-[#faf8f3] p-4 sm:col-span-2">
                <p className="text-xs text-gray-500">Điểm đọc hiểu</p>
                <p className="mt-1 text-xl font-bold text-[#7f1d2d]">{readingScore != null ? readingScore : "Chờ giáo viên chấm"}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-5 text-gray-500">
              Mức hỗ trợ ban đầu trên hệ thống hiện là kết quả tạm thời từ dữ liệu tải nhận thức; công thức hiệu quả học tập chính thức cần dữ liệu chuẩn hóa theo nghiên cứu.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <h2 className="text-lg font-bold text-[#7f1d2d]">Xu hướng kết quả thử thách</h2>
            {resultTrend.length === 0 ? (
              <EmptyState>Chưa có dữ liệu thử thách. Sau khi hoàn thành thử thách, kết quả sẽ được ghi nhận tại đây.</EmptyState>
            ) : (
              <div className="mt-6 flex h-40 items-end gap-3 border-b border-l border-[#eadfd5] px-4 pb-0 pt-4">
                {resultTrend.map((item, index) => {
                  const height = Math.max(12, Math.min(100, item.score > 10 ? item.score : item.score * 10))
                  return (
                    <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className="text-xs font-semibold text-gray-500">{item.score}</span>
                      <div className="w-full max-w-10 rounded-t-xl bg-[#8f1d2c]" style={{ height: `${height}%` }} />
                      <span className="text-[11px] text-gray-400">{item.passed === true ? "Đạt" : item.passed === false ? "Chưa đạt" : `#${index + 1}`}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">Thay đổi tải nhận thức</h2>
          {cognitiveLoad == null ? (
            <EmptyState>Chưa có đủ dữ liệu để hiển thị xu hướng tải nhận thức.</EmptyState>
          ) : (
            <div className="mt-5">
              <div className="flex items-end gap-2">
                {[1, 2, 3, 4, 5].map((score) => {
                  const active = score <= Math.round(Number(cognitiveLoad))
                  return <div key={score} className={`h-${score * 8} flex-1 rounded-t-xl ${active ? "bg-[#8f1d2c]" : "bg-[#eee7e1]"}`} style={{ height: `${score * 18}px` }} />
                })}
              </div>
              <div className="mt-3 flex justify-between text-xs text-gray-400"><span>Thấp</span><span>Cao</span></div>
              <p className="mt-4 text-sm text-gray-600">Tải nhận thức hiện ghi nhận: <strong>{Number(cognitiveLoad).toFixed(2)}/5</strong>.</p>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">Lịch sử học tập</h2>
          {textRecords.length === 0 ? (
            <EmptyState>Chưa có dữ liệu văn bản đã hoàn thành.</EmptyState>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#eadfd5] text-gray-500">
                    <th className="px-3 py-3">Ngày</th>
                    <th className="px-3 py-3">Văn bản</th>
                    <th className="px-3 py-3">Mức hỗ trợ</th>
                    <th className="px-3 py-3">Thời gian</th>
                    <th className="px-3 py-3">Kết quả</th>
                  </tr>
                </thead>
                <tbody>
                  {textRecords.map((item, index) => (
                    <tr key={`${item.textId}-${index}`} className="border-b border-gray-100">
                      <td className="px-3 py-3">{formatDate(item.createdAt)}</td>
                      <td className="px-3 py-3 font-medium">{item.textTitle || item.textId || "—"}</td>
                      <td className="px-3 py-3">Mức {item.supportLevel || level}</td>
                      <td className="px-3 py-3">{formatDuration(item.elapsedSeconds)}</td>
                      <td className="px-3 py-3">{item.result ?? item.score ?? "Hoàn thành"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">Lịch sử thử thách và hỗ trợ</h2>
          {challengeRecords.length === 0 && reflectionRecords.length === 0 ? (
            <EmptyState>Chưa có lịch sử thử thách hoặc phản hồi.</EmptyState>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#eadfd5] text-gray-500">
                    <th className="px-3 py-3">Ngày</th>
                    <th className="px-3 py-3">Hoạt động</th>
                    <th className="px-3 py-3">Mức</th>
                    <th className="px-3 py-3">Kết quả</th>
                    <th className="px-3 py-3">Gợi ý/hỗ trợ</th>
                  </tr>
                </thead>
                <tbody>
                  {challengeRecords.map((item, index) => (
                    <tr key={`challenge-${index}`} className="border-b border-gray-100">
                      <td className="px-3 py-3">{formatDate(item.createdAt)}</td>
                      <td className="px-3 py-3">Thử thách chuyển mức</td>
                      <td className="px-3 py-3">Mức {item.supportLevel || level}</td>
                      <td className="px-3 py-3">{item.passed === true ? "Đạt" : item.passed === false ? "Chưa đạt" : item.score ?? "—"}</td>
                      <td className="px-3 py-3">{item.hintCount ?? item.supportRequests ?? "—"}</td>
                    </tr>
                  ))}
                  {reflectionRecords.slice(-5).map((item, index) => (
                    <tr key={`reflection-${index}`} className="border-b border-gray-100">
                      <td className="px-3 py-3">{formatDate(item.createdAt)}</td>
                      <td className="px-3 py-3">Tự phản tư</td>
                      <td className="px-3 py-3">Mức {item.supportLevel || level}</td>
                      <td className="px-3 py-3" colSpan={2}>{item.reflection || "Không có nội dung phản tư."}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">Các thao tác luyện tập</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {ACTIVITY_NAMES.map((name, index) => (
              <div key={name} className="flex items-center gap-3 rounded-2xl bg-[#faf8f3] p-4">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${completedActivities.includes(index + 1) ? "bg-[#8f1d2c] text-white" : "bg-white text-gray-400 ring-1 ring-[#eadfd5]"}`}>{index + 1}</span>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/student/text-selection")} className="rounded-2xl border border-[#d8c8bd] bg-white px-6 py-3 font-semibold text-[#7f1d2d] hover:bg-[#faf8f3]">Chọn văn bản</button>
          <button type="button" onClick={() => navigate("/student/challenge")} className="rounded-2xl bg-[#8f1d2c] px-6 py-3 font-semibold text-white hover:bg-[#741624]">Thử thách chuyển mức</button>
        </div>
      </main>
    </div>
  )
}

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  loadLearningProgress,
} from "./supportLevel"
import { logoutAccount } from "../../auth"

const tiles = [
  {
    id: "practice",
    number: "01",
    title: "Luyện tập",
    description: "Chọn văn bản và thực hiện các hoạt động đọc hiểu thơ.",
  },
  {
    id: "profile",
    number: "02",
    title: "Hồ sơ học tập",
    description: "Theo dõi tiến độ, mức hỗ trợ và kết quả học tập.",
  },
  {
    id: "knowledge",
    number: "03",
    title: "Kho tri thức",
    description: "Ôn lại các kiến thức và kỹ năng đọc hiểu thơ.",
  },
  {
    id: "feedback",
    number: "04",
    title: "Phản hồi",
    description: "Gửi ý kiến và phản hồi về quá trình học tập.",
  },
]

const knowledgeItems = [
  {
    title: "Hình ảnh và từ ngữ",
    description:
      "Chú ý những từ ngữ, hình ảnh nổi bật và cách chúng góp phần thể hiện cảm xúc, ý nghĩa của văn bản.",
  },
  {
    title: "Yếu tố tượng trưng",
    description:
      "Xác định hình ảnh hoặc chi tiết mang ý nghĩa vượt ra ngoài nghĩa tả thực và xem xét mối liên hệ với chủ đề.",
  },
  {
    title: "Nhạc điệu",
    description:
      "Quan sát nhịp thơ, cách ngắt nhịp, vần và sự lặp lại để nhận xét âm hưởng của bài thơ.",
  },
  {
    title: "Tình cảm, cảm xúc",
    description:
      "Xác định cảm xúc của chủ thể trữ tình và những căn cứ trong văn bản giúp thể hiện cảm xúc đó.",
  },
  {
    title: "Cấu tứ",
    description:
      "Theo dõi cách bài thơ tổ chức hình ảnh, cảm xúc và ý tưởng để nhận ra mạch vận động của toàn văn bản.",
  },
]

export default function StudentHome() {
  const navigate = useNavigate()

  const [activeTile, setActiveTile] = useState(null)
  const [feedback, setFeedback] = useState("")
  const [feedbackSaved, setFeedbackSaved] = useState(false)

  const hasAssessment = Boolean(
    localStorage.getItem("initialAssessmentResult"),
  )

  const level = hasAssessment ? getSupportLevel() : null
  const info = hasAssessment ? getLevelInfo(level) : null

  const progress = loadLearningProgress()
  const completedTexts = progress.completedTexts?.length || 0

  const progressPercent = useMemo(() => {
    return Math.min(Math.round((completedTexts / 3) * 100), 100)
  }, [completedTexts])

  const handleTileClick = (tileId) => {
    setActiveTile((current) => (current === tileId ? null : tileId))
    setFeedbackSaved(false)
  }

  const handleLogout = () => {
    logoutAccount()
    navigate("/", { replace: true })
  }

  const handleSaveFeedback = () => {
    if (!feedback.trim()) return

    const feedbackData = {
      content: feedback.trim(),
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      "studentFeedback",
      JSON.stringify(feedbackData),
    )

    setFeedbackSaved(true)
    setFeedback("")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      {/* Header */}
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">
                LUYỆN TẬP ĐỌC HIỂU THƠ
              </p>

              <div className="mt-2">
                <h1 className="text-2xl font-bold text-[#7f1d2d]">
                  Trang chủ học sinh
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Chọn một chức năng để bắt đầu.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate("/student/home")}
                className="rounded-xl bg-[#8f1d2c] px-4 py-2 text-sm font-semibold text-white"
              >
                Trang chủ
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-[#eadfd5] bg-white px-4 py-2 text-sm font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {hasAssessment && (
            <div className="mt-4">
              <span className="inline-flex w-fit items-center rounded-full border border-[#ead7c8] bg-[#fffaf3] px-4 py-2 text-sm font-semibold text-[#7f1d2d]">
                Mức hỗ trợ {level}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Tổng quan */}
        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Mức hỗ trợ hiện tại
            </p>

            {hasAssessment ? (
              <>
                <h2 className="mt-3 text-xl font-bold text-[#7f1d2d]">
                  {info.shortName}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {info.description}
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-3 text-xl font-bold text-[#7f1d2d]">
                  Chưa xác định
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Thực hiện bài đánh giá đầu vào để hệ thống xác định mức hỗ
                  trợ phù hợp.
                </p>
              </>
            )}
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Tiến độ luyện tập
                </p>

                <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">
                  {progressPercent}%
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffaf3] px-4 py-3 text-right">
                <p className="text-2xl font-bold text-[#7f1d2d]">
                  {completedTexts}
                </p>
                <p className="text-xs text-gray-500">
                  văn bản hoàn thành
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#8f1d2c] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </article>
        </section>

        {/* 4 chức năng chính */}
        <section className="mt-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a16207]">
              KHU VỰC HỌC TẬP
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#7f1d2d]">
              Em muốn làm gì?
            </h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((tile) => {
              const isActive = activeTile === tile.id

              return (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => handleTileClick(tile.id)}
                  className={`rounded-3xl p-6 text-left shadow-sm ring-1 transition ${
                    isActive
                      ? "bg-[#8f1d2c] text-white ring-[#8f1d2c]"
                      : "bg-white text-gray-800 ring-[#eadfd5] hover:-translate-y-0.5 hover:bg-[#fffaf3]"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isActive ? "text-[#f8df9d]" : "text-[#a16207]"
                    }`}
                  >
                    {tile.number}
                  </span>

                  <h3
                    className={`mt-4 text-lg font-bold ${
                      isActive ? "text-white" : "text-[#7f1d2d]"
                    }`}
                  >
                    {tile.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-6 ${
                      isActive ? "text-white/75" : "text-gray-500"
                    }`}
                  >
                    {tile.description}
                  </p>

                  <p
                    className={`mt-5 text-xs font-semibold ${
                      isActive ? "text-[#f8df9d]" : "text-[#8f1d2c]"
                    }`}
                  >
                    {isActive ? "Đang mở" : "Nhấn để mở →"}
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        {/* Chức năng được chọn */}
        {activeTile && (
          <section className="mt-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            {/* LUYỆN TẬP */}
            {activeTile === "practice" && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Luyện tập
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#7f1d2d]">
                  Luyện tập đọc hiểu thơ
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  Chọn văn bản và thực hiện các hoạt động luyện tập theo mức
                  hỗ trợ được hệ thống xác định.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {!hasAssessment && (
                    <button
                      type="button"
                      onClick={() => navigate("/student/assessment")}
                      className="rounded-xl bg-[#8f1d2c] px-5 py-3 text-sm font-semibold text-white"
                    >
                      Đánh giá đầu vào
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate("/student/texts")}
                    className="rounded-xl bg-[#8f1d2c] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Chọn văn bản luyện tập
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/student/challenge")}
                    className="rounded-xl border border-[#eadfd5] bg-white px-5 py-3 text-sm font-semibold text-[#7f1d2d]"
                  >
                    Thử thách chuyển mức
                  </button>
                </div>
              </div>
            )}

            {/* HỒ SƠ */}
            {activeTile === "profile" && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Hồ sơ học tập
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#7f1d2d]">
                  Theo dõi quá trình học tập
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  Xem mức hỗ trợ, tiến độ luyện tập, kết quả các hoạt động và
                  thông tin được hệ thống ghi nhận trong quá trình học.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/student/profile")}
                  className="mt-5 rounded-xl bg-[#8f1d2c] px-5 py-3 text-sm font-semibold text-white"
                >
                  Xem hồ sơ học tập
                </button>
              </div>
            )}

            {/* KHO TRI THỨC */}
            {activeTile === "knowledge" && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Kho tri thức
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#7f1d2d]">
                  Kiến thức đọc hiểu thơ
                </h2>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {knowledgeItems.map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-2xl bg-[#fffaf3] p-5 ring-1 ring-[#eadfd5]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8f1d2c] text-xs font-bold text-white">
                          {index + 1}
                        </span>

                        <div>
                          <h3 className="font-bold text-[#7f1d2d]">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* PHẢN HỒI */}
            {activeTile === "feedback" && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Phản hồi
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#7f1d2d]">
                  Gửi phản hồi về quá trình học tập
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                  Em có thể chia sẻ cảm nhận, khó khăn hoặc đề xuất để cải
                  thiện quá trình luyện tập.
                </p>

                <div className="mt-5 max-w-3xl">
                  <textarea
                    value={feedback}
                    onChange={(event) => {
                      setFeedback(event.target.value)
                      setFeedbackSaved(false)
                    }}
                    rows={5}
                    placeholder="Nhập phản hồi của em..."
                    className="w-full rounded-2xl border border-[#eadfd5] bg-[#fffdf9] px-4 py-3 text-sm outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                  />

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSaveFeedback}
                      disabled={!feedback.trim()}
                      className="rounded-xl bg-[#8f1d2c] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Gửi phản hồi
                    </button>

                    {feedbackSaved && (
                      <span className="text-sm font-semibold text-green-700">
                        Đã ghi nhận phản hồi.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
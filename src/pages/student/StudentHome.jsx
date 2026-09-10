import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  loadLearningProgress,
} from "./supportLevel"

export default function StudentHome() {
  const navigate = useNavigate()

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

  const handleContinue = () => {
    if (!hasAssessment) {
      navigate("/student/assessment")
      return
    }

    navigate("/student/texts")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      {/* Header */}
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">
            LUYỆN TẬP ĐỌC HIỂU THƠ
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#7f1d2d]">
                Trang chủ học sinh
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Bắt đầu hoặc tiếp tục quá trình luyện tập của em.
              </p>
            </div>

            {/* Chỉ hiển thị mức hỗ trợ khi đã làm bài */}
            {hasAssessment && (
              <span className="inline-flex w-fit items-center rounded-full border border-[#ead7c8] bg-[#fffaf3] px-4 py-2 text-sm font-semibold text-[#7f1d2d]">
                Mức hỗ trợ {level}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* CTA chính */}
        <section className="rounded-3xl bg-[#8f1d2c] p-7 text-white shadow-sm">
          <p className="text-sm font-semibold text-[#f8df9d]">
            {hasAssessment ? "TIẾP TỤC HỌC TẬP" : "BẮT ĐẦU HỌC TẬP"}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {hasAssessment
              ? "Tiếp tục luyện tập đọc hiểu thơ"
              : "Hoàn thành đánh giá đầu vào"}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
            {hasAssessment
              ? "Em có thể tiếp tục chọn văn bản và thực hiện các hoạt động luyện tập theo mức hỗ trợ hiện tại."
              : "Bài đánh giá đầu vào giúp hệ thống xác định mức hỗ trợ phù hợp trước khi em bắt đầu luyện tập."}
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-[#7f1d2d] hover:bg-[#fff8ee]"
          >
            {hasAssessment
              ? "Tiếp tục luyện tập"
              : "Bắt đầu đánh giá đầu vào"}
          </button>
        </section>

        {/* Các thông tin tổng quan */}
        <section className="mt-6 grid gap-5 md:grid-cols-3">
          {/* Mức hỗ trợ */}
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Mức hỗ trợ hiện tại
            </p>

            {hasAssessment ? (
              <>
                <h3 className="mt-3 text-xl font-bold text-[#7f1d2d]">
                  {info.shortName}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {info.description}
                </p>
              </>
            ) : (
              <>
                <h3 className="mt-3 text-xl font-bold text-[#7f1d2d]">
                  Chưa xác định
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Thực hiện bài kiểm tra để nhận mức hỗ trợ phù hợp với năng
                  lực của em.
                </p>
              </>
            )}
          </article>

          {/* Tiến độ */}
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Tiến độ luyện tập
            </p>

            <p className="mt-3 text-3xl font-bold text-[#7f1d2d]">
              {progressPercent}%
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-[#8f1d2c]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {completedTexts} văn bản đã hoàn thành
            </p>
          </article>

          {/* Lối tắt */}
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Lối tắt
            </p>

            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => navigate("/student/texts")}
                className="w-full rounded-xl border border-[#eadfd5] px-4 py-2.5 text-left text-sm font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
              >
                Văn bản luyện tập
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/profile")}
                className="w-full rounded-xl border border-[#eadfd5] px-4 py-2.5 text-left text-sm font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
              >
                Hồ sơ học tập
              </button>
            </div>
          </article>
        </section>

        {/* Quy trình học tập */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <h2 className="text-lg font-bold text-[#7f1d2d]">
            Quy trình học tập
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Đánh giá đầu vào"],
              ["02", "Chọn văn bản"],
              ["03", "5 hoạt động luyện tập"],
              ["04", "Thử thách chuyển mức"],
            ].map(([number, title]) => (
              <div
                key={number}
                className="rounded-2xl bg-[#fffaf3] p-4 ring-1 ring-[#eadfd5]"
              >
                <span className="text-xs font-bold text-[#a16207]">
                  {number}
                </span>

                <p className="mt-2 text-sm font-semibold leading-5 text-gray-700">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  loadInitialAssessment,
  loadLearningProgress,
} from "./supportLevel"

export default function StudentHome() {
  const navigate = useNavigate()

  const level = getSupportLevel()
  const info = getLevelInfo(level)
  const progress = loadLearningProgress()
  const initialAssessment = loadInitialAssessment()

  const hasAssessment = Boolean(initialAssessment)

  const completedTexts = Array.isArray(progress.completedTexts)
    ? progress.completedTexts.length
    : 0

  const progressPercent = useMemo(() => {
    return Math.min(Math.round((completedTexts / 3) * 100), 100)
  }, [completedTexts])

  const handleAssessment = () => {
    navigate("/student/assessment")
  }

  const handlePractice = () => {
    if (!hasAssessment) {
      navigate("/student/assessment")
      return
    }

    navigate("/student/texts")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
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
                Bắt đầu hoặc tiếp tục quá trình học tập của em.
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-full border border-[#ead7c8] bg-[#fffaf3] px-4 py-2 text-sm font-semibold text-[#7f1d2d]">
              Mức hỗ trợ {level}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* =====================================================
            BÀI TEST ĐẦU VÀO
        ===================================================== */}
        {!hasAssessment && (
          <section className="rounded-3xl bg-[#8f1d2c] p-7 text-white shadow-sm">
            <p className="text-sm font-semibold text-[#f8df9d]">
              BƯỚC KHỞI ĐẦU
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Bài test đầu vào
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
              Hãy hoàn thành bài đánh giá đầu vào để hệ thống xác định
              mức hỗ trợ phù hợp với quá trình luyện tập của em.
            </p>

            <button
              type="button"
              onClick={handleAssessment}
              className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-[#7f1d2d] hover:bg-[#fff8ee]"
            >
              Làm bài test đầu vào
            </button>
          </section>
        )}

        {/* =====================================================
            THÔNG TIN TỔNG QUAN
        ===================================================== */}
        <section
          className={`grid gap-5 ${
            hasAssessment ? "mt-0" : "mt-6"
          } md:grid-cols-3`}
        >
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Mức hỗ trợ hiện tại
            </p>

            <h3 className="mt-3 text-xl font-bold text-[#7f1d2d]">
              {info.shortName}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {info.description}
            </p>

            {!hasAssessment && (
              <p className="mt-4 rounded-xl bg-[#fff8ee] px-4 py-3 text-xs leading-5 text-[#8f1d2c]">
                Mức hỗ trợ mặc định trước khi làm test: Mức 1 – Hỗ trợ cao.
              </p>
            )}
          </article>

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

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Trạng thái
            </p>

            <h3 className="mt-3 text-xl font-bold text-[#7f1d2d]">
              {hasAssessment ? "Đã hoàn thành test" : "Chưa làm test đầu vào"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {hasAssessment
                ? "Em có thể bắt đầu hoặc tiếp tục các hoạt động luyện tập."
                : "Hoàn thành bài test để mở khóa khu vực luyện tập."}
            </p>
          </article>
        </section>

        {/* =====================================================
            4 KHU VỰC CHÍNH
        ===================================================== */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-[#7f1d2d]">
            Các khu vực học tập
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Chọn một khu vực để tiếp tục.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* LUYỆN TẬP */}
            <button
              type="button"
              onClick={handlePractice}
              className={`rounded-3xl p-6 text-left shadow-sm ring-1 transition ${
                hasAssessment
                  ? "bg-white ring-[#eadfd5] hover:-translate-y-0.5 hover:shadow-md"
                  : "bg-gray-50 ring-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-3xl">📚</p>

                  <h3 className="mt-4 text-xl font-bold text-[#7f1d2d]">
                    Luyện tập
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {hasAssessment
                      ? "Chọn văn bản và thực hiện các hoạt động đọc hiểu theo mức hỗ trợ hiện tại."
                      : "Hoàn thành bài test đầu vào trước khi bắt đầu luyện tập."}
                  </p>
                </div>

                {!hasAssessment && (
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-500">
                    Chưa mở
                  </span>
                )}
              </div>
            </button>

            {/* HỒ SƠ */}
            <button
              type="button"
              onClick={() => navigate("/student/profile")}
              className="rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-[#eadfd5] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-3xl">👤</p>

              <h3 className="mt-4 text-xl font-bold text-[#7f1d2d]">
                Hồ sơ học tập
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Theo dõi mức hỗ trợ, tiến độ và kết quả học tập của em.
              </p>
            </button>

            {/* KHO TRI THỨC */}
            <button
              type="button"
              className="rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-[#eadfd5] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-3xl">📖</p>

              <h3 className="mt-4 text-xl font-bold text-[#7f1d2d]">
                Kho tri thức
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Tra cứu kiến thức Ngữ văn hỗ trợ quá trình đọc hiểu thơ.
              </p>
            </button>

            {/* PHẢN HỒI */}
            <button
              type="button"
              className="rounded-3xl bg-white p-6 text-left shadow-sm ring-1 ring-[#eadfd5] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-3xl">💬</p>

              <h3 className="mt-4 text-xl font-bold text-[#7f1d2d]">
                Phản hồi
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Gửi câu hỏi, nhận xét hoặc chia sẻ về quá trình học tập.
              </p>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
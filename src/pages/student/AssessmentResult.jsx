import { useNavigate } from "react-router-dom"
import { getLevelInfo, loadInitialAssessment } from "./supportLevel"

function AssessmentResult() {
  const navigate = useNavigate()
  const assessment = loadInitialAssessment()
  const level = assessment?.provisionalSupportLevel || 1
  const levelInfo = getLevelInfo(level)

  let readingResult = null
  try {
    readingResult = JSON.parse(
      localStorage.getItem("initialReadingTestResult") || "null"
    )
  } catch {
    readingResult = null
  }

  const cognitiveLoad = assessment?.totalCognitiveLoad

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-lg font-bold text-[#7f1d2d]">
            Luyện tập đọc hiểu thơ
          </h1>
          <p className="text-sm text-gray-500">Kết quả đánh giá đầu vào</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#a16207]">
            Hoàn thành đánh giá
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            Mức hỗ trợ phù hợp với em
          </h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Hệ thống đã ghi nhận phần đánh giá tải nhận thức và bài kiểm tra đọc hiểu.
            Mức hỗ trợ hiện tại được xác định theo cách tính MVP đã triển khai.
          </p>
        </div>

        <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#eadfd5]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f8e9c8] text-3xl font-bold text-[#7f1d2d]">
            {level}
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#a16207]">
            {levelInfo.label}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-[#7f1d2d]">
            {levelInfo.shortName}
          </h3>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-600">
            {levelInfo.description}
          </p>

          <div className="mt-7 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-2xl bg-[#fffaf0] p-5">
              <p className="text-sm text-gray-500">Tải nhận thức tổng hợp</p>
              <p className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                {cognitiveLoad ?? "—"}
              </p>
              <p className="mt-1 text-xs text-gray-500">Thang điểm 1–5</p>
            </div>

            <div className="rounded-2xl bg-[#fffaf0] p-5">
              <p className="text-sm text-gray-500">Bài đọc hiểu</p>
              <p className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                {readingResult?.answeredQuestions || 0}/{readingResult?.totalQuestions || 13}
              </p>
              <p className="mt-1 text-xs text-gray-500">Đã ghi nhận câu trả lời</p>
            </div>
          </div>

          <div className="mt-7 rounded-2xl border border-[#eadfd5] bg-[#fffdf9] p-5 text-left">
            <p className="font-semibold text-gray-800">Lưu ý</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Điểm bài đọc hiểu hiện được lưu lại để phục vụ bước chấm và phân tích.
              Khi hệ thống có dữ liệu chuẩn hóa, mức hỗ trợ có thể được xác định lại bằng chỉ số hiệu quả học tập.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/student/texts")}
            className="mt-8 rounded-xl bg-[#8f1d2c] px-8 py-3 font-semibold text-white transition hover:bg-[#741624]"
          >
            Bắt đầu luyện tập
          </button>
        </section>
      </main>
    </div>
  )
}

export default AssessmentResult

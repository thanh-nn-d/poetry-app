// src/pages/student/TextSelection.jsx

import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import {
  getLevelInfo,
  getSupportLevel,
  loadLearningProgress,
} from "./supportLevel"

const textBySupportLevel = {
  1: {
    id: "nguyet-cam",
    title: "NGUYỆT CẦM",
    author: "Xuân Diệu",
    description:
      "Bộ luyện tập đọc hiểu thơ có yếu tố tượng trưng dành cho học sinh ở Mức hỗ trợ 1, với nhiều câu hỏi dẫn dắt, gợi ý và hướng dẫn từng bước.",
  },

  2: {
    id: "nguyet-cam",
    title: "NGUYỆT CẦM",
    author: "Xuân Diệu",
    description:
      "Bộ luyện tập đọc hiểu thơ có yếu tố tượng trưng dành cho học sinh ở Mức hỗ trợ 2, với các gợi ý được rút gọn để học sinh chủ động phân tích nhiều hơn.",
  },

  3: {
    id: "nguyet-cam",
    title: "NGUYỆT CẦM",
    author: "Xuân Diệu",
    description:
      "Bộ luyện tập đọc hiểu thơ có yếu tố tượng trưng dành cho học sinh ở Mức hỗ trợ 3, tập trung vào việc tự khám phá, tự lí giải và tự điều chỉnh quá trình đọc hiểu.",
  },
}

function LevelBadge({ level }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#ead7c8] bg-[#fffaf3] px-4 py-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8f1d2c] text-xs font-bold text-white">
        {level}
      </span>

      <span className="text-sm font-semibold text-[#7f1d2d]">
        Mức hỗ trợ {level}
      </span>
    </div>
  )
}

export default function TextSelection() {
  const navigate = useNavigate()

  // Lấy mức hỗ trợ hiện tại
  // Nếu chưa làm test đầu vào thì supportLevel.js sẽ mặc định Mức 1
  const level = getSupportLevel()

  const info = getLevelInfo(level)

  // Lấy tiến độ học tập
  const progress = loadLearningProgress()

  // Lấy đúng bộ luyện tập Nguyệt Cầm tương ứng với mức hỗ trợ
  const text = useMemo(
    () => textBySupportLevel[level] || textBySupportLevel[1],
    [level],
  )

  // Vì hiện tại hệ thống chỉ có 1 văn bản luyện tập là Nguyệt Cầm
  const completed = Array.isArray(progress.completedTexts)
    ? progress.completedTexts.includes(text.id)
    : false

  const completedCount = completed ? 1 : 0
  const totalTexts = 1

  const startText = () => {
    // Lưu văn bản hiện tại
    localStorage.setItem(
      "currentText",
      JSON.stringify({
        ...text,
        supportLevel: level,
      }),
    )

    // Lưu mức hỗ trợ hiện tại
    localStorage.setItem(
      "currentSupportLevel",
      String(level),
    )

    // Lưu thời điểm bắt đầu
    localStorage.setItem(
      "learningStartedAt",
      String(Date.now()),
    )

    // Chuyển sang không gian luyện tập
    navigate("/student/learning")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      {/* HEADER */}
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">
                BẮT ĐẦU LUYỆN TẬP
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                Chọn văn bản
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Chọn một văn bản để bắt đầu quá trình luyện tập đọc hiểu.
              </p>
            </div>

            <LevelBadge level={level} />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* SUPPORT LEVEL */}
        <section className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#a16207]">
                MỨC HỖ TRỢ HIỆN TẠI
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#7f1d2d]">
                {info.shortName}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {info.description}
              </p>
            </div>

            <div className="min-w-[190px] rounded-2xl bg-[#fff8ee] px-5 py-4">
              <p className="text-xs font-medium text-gray-500">
                Tiến độ văn bản
              </p>

              <p className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                {completedCount}/{totalTexts}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                văn bản đã hoàn thành
              </p>
            </div>
          </div>
        </section>

        {/* TEXT LIST */}
        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Văn bản luyện tập
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Nguyệt Cầm có bộ nhiệm vụ luyện tập riêng tương ứng với mức
                hỗ trợ hiện tại.
              </p>
            </div>

            <span className="hidden text-sm text-gray-500 sm:block">
              1 bộ luyện tập khả dụng
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-1">
            <article className="flex min-h-[330px] flex-col rounded-3xl border border-[#eadfd5] bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:max-w-2xl">
              {/* CARD HEADER */}
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1d6] text-sm font-bold text-[#a16207]">
                  1
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    completed
                      ? "bg-green-50 text-green-700"
                      : "bg-[#fff8ee] text-[#a16207]"
                  }`}
                >
                  {completed ? "Đã hoàn thành" : "Sẵn sàng"}
                </span>
              </div>

              {/* TITLE */}
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#7f1d2d]">
                    {text.title}
                  </h3>

                  <p className="mt-1 text-sm italic text-gray-500">
                    {text.author}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-[#f8e9c8] px-3 py-1 text-xs font-bold text-[#7f1d2d]">
                  Bộ mức {level}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-5 flex-1 text-sm leading-6 text-gray-600">
                {text.description}
              </p>

              {/* BUTTON */}
              <button
                type="button"
                onClick={startText}
                className="mt-6 w-full rounded-2xl bg-[#8f1d2c] px-5 py-3 font-semibold text-white transition hover:bg-[#741624]"
              >
                {completed
                  ? "Học lại văn bản"
                  : "Bắt đầu luyện tập"}
              </button>
            </article>
          </div>
        </section>

        {/* NOTE */}
        <section className="mt-6 rounded-2xl border border-dashed border-[#dfcdbb] bg-[#fffaf3] px-5 py-4">
          <p className="text-sm leading-6 text-gray-600">
            <span className="font-semibold text-[#7f1d2d]">
              Lưu ý:
            </span>{" "}
            <strong>NGUYỆT CẦM</strong> có 3 bộ luyện tập tương ứng với
            Mức hỗ trợ 1, 2 và 3. Hệ thống tự động mở đúng bộ nhiệm vụ
            theo mức hỗ trợ hiện tại của học sinh.
          </p>
        </section>
      </main>
    </div>
  )
}
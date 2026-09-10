import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

const TEXTS_BY_LEVEL = {
  1: [
    {
      id: "buon-mua-dem",
      title: "BUỒN MƯA ĐÊM",
      author: "Huy Cận",
      description:
        "Văn bản luyện tập đọc hiểu thơ có yếu tố tượng trưng.",
      available: true,
    },
    {
      id: "van-ban-2",
      title: "Văn bản luyện tập 2",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
    {
      id: "van-ban-3",
      title: "Văn bản luyện tập 3",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
  ],
  2: [
    {
      id: "van-ban-4",
      title: "Văn bản luyện tập 4",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
    {
      id: "van-ban-5",
      title: "Văn bản luyện tập 5",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
    {
      id: "van-ban-6",
      title: "Văn bản luyện tập 6",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
  ],
  3: [
    {
      id: "van-ban-7",
      title: "Văn bản luyện tập 7",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
    {
      id: "van-ban-8",
      title: "Văn bản luyện tập 8",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
    {
      id: "van-ban-9",
      title: "Văn bản luyện tập 9",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      description: "Chưa có dữ liệu văn bản chính thức.",
      available: false,
    },
  ],
}

const LEVEL_INFO = {
  1: {
    label: "Mức 1",
    shortName: "Hỗ trợ cao",
    description:
      "Hệ thống cung cấp nhiều câu hỏi dẫn dắt, gợi ý và hướng dẫn từng bước.",
  },
  2: {
    label: "Mức 2",
    shortName: "Hỗ trợ vừa",
    description:
      "Hệ thống giảm số lượng câu hỏi dẫn dắt và cung cấp gợi ý khi học sinh cần.",
  },
  3: {
    label: "Mức 3",
    shortName: "Hỗ trợ thấp",
    description:
      "Học sinh chủ động thực hiện nhiệm vụ; hệ thống chủ yếu phản hồi sau khi hoàn thành.",
  },
}

function getLevel() {
  const value = Number(localStorage.getItem("supportLevel"))
  return value === 2 || value === 3 ? value : 1
}

function getStartTimestamp() {
  return Date.now()
}

function getCompletedTexts() {
  try {
    const data = JSON.parse(
      localStorage.getItem("poetry_learning_progress") || "{}"
    )
    return Array.isArray(data.completedTexts) ? data.completedTexts : []
  } catch {
    return []
  }
}

export default function TextSelection() {
  const navigate = useNavigate()
  const level = getLevel()
  const info = LEVEL_INFO[level]
  const completedTexts = getCompletedTexts()

  const texts = useMemo(
    () => TEXTS_BY_LEVEL[level] || TEXTS_BY_LEVEL[1],
    [level]
  )

  const completedCount = texts.filter((text) =>
    completedTexts.includes(text.id)
  ).length

  const startText = (text) => {
    if (!text.available) return

    localStorage.setItem("currentText", JSON.stringify(text))
    localStorage.setItem("learningStartedAt", String(getStartTimestamp()))
    navigate("/student/learning")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a16207]">
            BẮT ĐẦU LUYỆN TẬP
          </p>

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#7f1d2d]">
                Chọn văn bản
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Chọn một văn bản để bắt đầu quá trình luyện tập đọc hiểu.
              </p>
            </div>

            <div className="rounded-full border border-[#ead7c8] bg-[#fffaf3] px-4 py-2 text-sm font-semibold text-[#7f1d2d]">
              Mức hỗ trợ {level}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#7f1d2d]">
                {info.label} · {info.shortName}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                {info.description}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-[#fff8ee] px-4 py-3 text-sm text-[#8a5a13]">
              Đã hoàn thành{" "}
              <span className="font-bold">{completedCount}/3</span> văn bản
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {texts.map((text, index) => {
            const completed = completedTexts.includes(text.id)

            return (
              <article
                key={text.id}
                className="flex min-h-[330px] flex-col rounded-3xl border border-[#eadfd5] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff1d6] text-sm font-bold text-[#a16207]">
                    {index + 1}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      completed
                        ? "bg-green-50 text-green-700"
                        : text.available
                          ? "bg-[#fff8ee] text-[#a16207]"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {completed
                      ? "Đã hoàn thành"
                      : text.available
                        ? "Chưa học"
                        : "Chưa có dữ liệu"}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#7f1d2d]">
                  {text.title}
                </h2>

                <p className="mt-1 text-sm italic text-gray-500">
                  {text.author}
                </p>

                <p className="mt-5 flex-1 text-sm leading-6 text-gray-600">
                  {text.description}
                </p>

                <button
                  type="button"
                  disabled={!text.available}
                  onClick={() => startText(text)}
                  className={`mt-6 w-full rounded-2xl px-5 py-3 font-semibold transition ${
                    text.available
                      ? "bg-[#8f1d2c] text-white hover:bg-[#741624]"
                      : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
                >
                  {completed
                    ? "Học lại văn bản"
                    : text.available
                      ? "Bắt đầu văn bản"
                      : "Chưa mở"}
                </button>
              </article>
            )
          })}
        </section>

        <section className="mt-6 rounded-2xl border border-dashed border-[#dfcdbb] bg-[#fffaf3] px-5 py-4">
          <p className="text-sm leading-6 text-gray-600">
            <span className="font-semibold text-[#7f1d2d]">Lưu ý:</span>{" "}
            hiện mới có nội dung văn bản{" "}
            <strong>BUỒN MƯA ĐÊM</strong> để chạy thử hệ thống. Các văn bản
            còn lại được giữ chỗ cho dữ liệu chính thức của nhóm nghiên cứu.
          </p>
        </section>
      </main>
    </div>
  )
}

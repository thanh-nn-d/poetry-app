// src/pages/student/TextSelection.jsx
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  loadLearningProgress,
} from "./supportLevel"

const textsByLevel = {
  1: [
    {
      id: "nguyet-cam",
      title: "NGUYỆT CẦM",
      author: "Xuân Diệu",
      available: true,
      description:
        "Văn bản luyện tập đọc hiểu thơ có yếu tố tượng trưng. Học sinh thực hiện lần lượt 5 nội dung luyện tập theo mức hỗ trợ được xác định.",
    },
    {
      id: "buon-mua-dem",
      title: "BUỒN MƯA ĐÊM",
      author: "Huy Cận",
      available: false,
      description:
        "Văn bản đã được sử dụng cho bài kiểm tra năng lực đầu vào. Nội dung luyện tập riêng chưa được kích hoạt trong phiên bản này.",
    },
    {
      id: "van-ban-3",
      title: "Văn bản luyện tập 3",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
  ],
  2: [
    {
      id: "van-ban-4",
      title: "Văn bản luyện tập 4",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
    {
      id: "van-ban-5",
      title: "Văn bản luyện tập 5",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
    {
      id: "van-ban-6",
      title: "Văn bản luyện tập 6",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
  ],
  3: [
    {
      id: "van-ban-7",
      title: "Văn bản luyện tập 7",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
    {
      id: "van-ban-8",
      title: "Văn bản luyện tập 8",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
    {
      id: "van-ban-9",
      title: "Văn bản luyện tập 9",
      author: "[CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]",
      available: false,
      description:
        "Ngữ liệu chưa được cung cấp trong tài liệu hiện có.",
    },
  ],
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
  const level = getSupportLevel()
  const info = getLevelInfo(level)
  const progress = loadLearningProgress()

  const texts = useMemo(
    () => textsByLevel[level] || textsByLevel[1],
    [level],
  )

  const availableTexts = texts.filter((text) => text.available)
  const completedCount = texts.filter((text) =>
    progress.completedTexts.includes(text.id),
  ).length

  const startText = (text) => {
    if (!text.available) return

    localStorage.setItem("currentText", JSON.stringify(text))
    localStorage.setItem("learningStartedAt", String(Date.now()))
    navigate("/student/learning")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
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

      <main className="mx-auto max-w-6xl px-6 py-8">
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
                Tiến độ văn bản của mức này
              </p>
              <p className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                {completedCount}/{texts.length}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                văn bản đã hoàn thành
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Văn bản luyện tập
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Các văn bản được tổ chức theo mức hỗ trợ nhận thức hiện tại.
              </p>
            </div>
            <span className="hidden text-sm text-gray-500 sm:block">
              {availableTexts.length} văn bản khả dụng
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {texts.map((text, index) => {
              const completed = progress.completedTexts.includes(text.id)

              return (
                <article
                  key={text.id}
                  className={`flex min-h-[330px] flex-col rounded-3xl border bg-white p-6 shadow-sm transition ${
                    text.available
                      ? "border-[#eadfd5] hover:-translate-y-0.5 hover:shadow-md"
                      : "border-dashed border-gray-300 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1d6] text-sm font-bold text-[#a16207]">
                      {index + 1}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
                          ? "Sẵn sàng"
                          : "Chưa có nội dung"}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#7f1d2d]">
                    {text.title}
                  </h3>

                  <p className="mt-1 text-sm italic text-gray-500">
                    {text.author}
                  </p>

                  <p className="mt-4 flex-1 text-sm leading-6 text-gray-600">
                    {text.description}
                  </p>

                  <button
                    type="button"
                    disabled={!text.available}
                    onClick={() => startText(text)}
                    className="mt-6 w-full rounded-2xl bg-[#8f1d2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#741624] disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {completed
                      ? "Học lại văn bản"
                      : text.available
                        ? "Bắt đầu luyện tập"
                        : "Chưa khả dụng"}
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-dashed border-[#dfcdbb] bg-[#fffaf3] px-5 py-4">
          <p className="text-sm leading-6 text-gray-600">
            <span className="font-semibold text-[#7f1d2d]">Lưu ý:</span>{" "}
            hiện nội dung luyện tập khả dụng là <strong>NGUYỆT CẦM</strong>.
            Các văn bản còn lại sẽ được bổ sung khi có dữ liệu chính thức của
            nhóm nghiên cứu.
          </p>
        </section>
      </main>
    </div>
  )
}

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { logoutAccount } from "../../auth"

// =========================================================
// DỮ LIỆU HỌC SINH
// =========================================================
//
// Hiện chưa kết nối dữ liệu thật.
// Để null để trang ở trạng thái mặc định.
// =========================================================

const student = null

// =========================================================
// KẾT QUẢ ĐÁNH GIÁ
// =========================================================

const criteria = [
  {
    id: "TC1",
    name: "Tải nội tại",
    description:
      "Khó khăn do độ phức tạp của nội dung",
    type: "difficulty",
  },
  {
    id: "TC2",
    name: "Tải nhận thức",
    description:
      "Khó khăn trong quá trình xử lí thông tin",
    type: "difficulty",
  },
  {
    id: "TC3",
    name: "Tải ngoại lai",
    description:
      "Khó khăn do cách trình bày và tổ chức thông tin",
    type: "difficulty",
  },
  {
    id: "TC4",
    name: "Điều kiện học tập",
    description:
      "Ảnh hưởng từ môi trường và điều kiện học tập",
    type: "difficulty",
  },
  {
    id: "TC5",
    name: "Trạng thái cá nhân",
    description:
      "Ảnh hưởng của tâm trạng và sức khỏe",
    type: "difficulty",
  },
  {
    id: "TC6",
    name: "Hứng thú",
    description:
      "Mức độ hứng thú khi đọc hiểu thơ",
    type: "interest",
  },
  {
    id: "TC7",
    name: "Tính chủ động",
    description:
      "Mức độ chủ động trong quá trình đọc hiểu",
    type: "interest",
  },
]

// =========================================================
// COMPONENT
// =========================================================

export default function AssessmentResult() {
  const nav = useNavigate()

  const [supportLevel, setSupportLevel] = useState(null)
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(false)

  // =========================================================
  // ĐĂNG XUẤT
  // =========================================================

  const handleLogout = () => {
    logoutAccount()
    nav("/", { replace: true })
  }

  // =========================================================
  // TRẠNG THÁI MẶC ĐỊNH
  // =========================================================

  if (!student) {
    return (
      <div className="min-h-screen bg-[#faf8f3] text-gray-800">
        <header className="sticky top-0 z-40 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                GIÁO VIÊN
              </p>

              <h1 className="text-xl font-bold text-[#7f1d2d]">
                Kết quả đánh giá đầu vào
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => nav("/teacher")}
                className="rounded-xl border border-[#eadfd5] px-4 py-2 text-sm font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
              >
                Dashboard
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-semibold text-[#7f1d2d] underline underline-offset-4 hover:text-[#a16207]"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-4xl items-center justify-center px-6 py-16">
          <section className="w-full rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-[#eadfd5]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fffaf3] text-2xl">
              📊
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#7f1d2d]">
              Chưa có kết quả đánh giá
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Hiện chưa có kết quả đánh giá đầu vào của học sinh.
              Kết quả sẽ hiển thị tại đây sau khi học sinh hoàn thành
              bài đánh giá.
            </p>

            <button
              type="button"
              onClick={() => nav("/teacher")}
              className="mt-6 rounded-xl bg-[#8f1d2c] px-5 py-3 font-semibold text-white hover:bg-[#741624]"
            >
              Về Dashboard
            </button>
          </section>
        </main>
      </div>
    )
  }

  // =========================================================
  // ĐIỂM COGNITIVE LOAD
  // =========================================================

  const cognitiveLoad = useMemo(() => {
    const reversedScores = criteria.map((criterion) => {
      if (criterion.type === "interest") {
        return 6 - criterion.score
      }

      return criterion.score
    })

    return (
      reversedScores.reduce(
        (total, score) => total + score,
        0,
      ) / reversedScores.length
    )
  }, [])

  // =========================================================
  // PHÂN MỨC HỖ TRỢ
  // =========================================================

  const supportInfo = {
    1: {
      title: "Mức 1 — Hỗ trợ cao",
      description:
        "Học sinh cần nhiều gợi ý và hướng dẫn trong quá trình đọc hiểu.",
    },
    2: {
      title: "Mức 2 — Hỗ trợ vừa",
      description:
        "Học sinh cần một mức hỗ trợ vừa phải để thực hiện các nhiệm vụ đọc hiểu.",
    },
    3: {
      title: "Mức 3 — Hỗ trợ thấp",
      description:
        "Học sinh có khả năng thực hiện nhiệm vụ với mức hỗ trợ tối thiểu.",
    },
  }

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = () => {
    if (!supportLevel) {
      alert("Vui lòng chọn mức hỗ trợ trước khi xác nhận.")
      return
    }

    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              GIÁO VIÊN
            </p>

            <h1 className="text-xl font-bold text-[#7f1d2d]">
              Kết quả đánh giá đầu vào
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => nav("/teacher")}
              className="rounded-xl border border-[#eadfd5] px-4 py-2 text-sm font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-semibold text-[#7f1d2d] underline underline-offset-4 hover:text-[#a16207]"
            >
              Đăng xuất
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-[#8f1d2c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#741624]"
            >
              Lưu kết quả
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* STUDENT INFO */}
        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8e9c8] text-lg font-bold text-[#7f1d2d]">
                MA
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {student.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Lớp {student.className}
                  {" · "}
                  Ngày đánh giá {student.assessmentDate}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#fffaf0] px-6 py-4">
              <p className="text-xs text-gray-500">
                Điểm bài đọc hiểu
              </p>

              <p className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                {readingTest.score.toFixed(2)}

                <span className="text-sm font-medium text-gray-400">
                  {" "}
                  / {readingTest.maxScore}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* COGNITIVE LOAD */}
        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              KẾT QUẢ BẢNG ĐÁNH GIÁ
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-800">
              Mức tải nhận thức
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kết quả được tổng hợp từ 7 tiêu chí đánh giá.
            </p>
          </div>

          {/* SCORE */}
          <div className="mb-6 rounded-2xl bg-[#fffaf0] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Điểm tải nhận thức tổng hợp
                </p>

                <p className="mt-1 text-3xl font-bold text-[#7f1d2d]">
                  {cognitiveLoad.toFixed(2)}

                  <span className="ml-2 text-sm font-medium text-gray-400">
                    / 5.00
                  </span>
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
                TC6 và TC7 đã được đảo chiều điểm
              </div>
            </div>
          </div>

          {/* CRITERIA */}
          <div className="grid gap-4 md:grid-cols-2">
            {criteria.map((criterion) => {
              const displayScore =
                criterion.type === "interest"
                  ? 6 - criterion.score
                  : criterion.score

              return (
                <div
                  key={criterion.id}
                  className="rounded-2xl border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-[#f6eee6] px-2 py-1 text-xs font-bold text-[#7f1d2d]">
                          {criterion.id}
                        </span>

                        <h3 className="font-semibold text-gray-800">
                          {criterion.name}
                        </h3>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {criterion.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-lg font-bold text-[#7f1d2d]">
                      {displayScore.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#8f1d2c]"
                      style={{
                        width: `${(displayScore / 5) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SUPPORT LEVEL */}
        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              PHÂN LOẠI HỖ TRỢ
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-800">
              Mức hỗ trợ đề xuất
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Giáo viên có thể xác nhận hoặc điều chỉnh mức hỗ trợ
              trước khi học sinh bắt đầu luyện tập.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((level) => {
              const selected = supportLevel === level

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    setSupportLevel(level)
                    setSaved(false)
                  }}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    selected
                      ? "border-[#8f1d2c] bg-[#fff8f5]"
                      : "border-gray-200 bg-white hover:border-[#d9b4a8]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                        selected
                          ? "bg-[#8f1d2c] text-white"
                          : "bg-[#f6eee6] text-[#7f1d2d]"
                      }`}
                    >
                      {level}
                    </span>

                    {selected && (
                      <span className="text-xs font-bold text-[#8f1d2c]">
                        ĐANG CHỌN
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-bold text-gray-800">
                    {supportInfo[level].title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {supportInfo[level].description}
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        {/* NOTE */}
        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">
          <label className="block text-sm font-bold text-gray-700">
            Ghi chú của giáo viên
          </label>

          <p className="mt-1 text-sm text-gray-500">
            Ghi chú thêm về kết quả đánh giá hoặc mức hỗ trợ.
          </p>

          <textarea
            value={note}
            onChange={(event) => {
              setNote(event.target.value)
              setSaved(false)
            }}
            rows={4}
            placeholder="Nhập ghi chú..."
            className="mt-4 w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-3 text-[15px] leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
          />
        </section>

        {/* SAVE */}
        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-2xl bg-[#8f1d2c] px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#741624]"
          >
            Xác nhận kết quả
          </button>

          {saved && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
              Đã lưu kết quả đánh giá.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
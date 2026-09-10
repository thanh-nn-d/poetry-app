import { useMemo, useState } from "react"

const student = {
  name: "Nguyễn Minh Anh",
  className: "10A1",
  assessmentDate: "09/09/2026",
}

// =========================================================
// MOCK KẾT QUẢ ĐÁNH GIÁ
// =========================================================

// Điểm 7 tiêu chí TC1 → TC7
// TC1–TC5: mức độ khó khăn
// TC6–TC7: hứng thú / chủ động
const criteria = [
  {
    id: "TC1",
    name: "Tải nội tại",
    description: "Khó khăn do độ phức tạp của nội dung",
    score: 3.8,
    type: "difficulty",
  },
  {
    id: "TC2",
    name: "Tải nhận thức",
    description: "Khó khăn trong quá trình xử lí thông tin",
    score: 4.1,
    type: "difficulty",
  },
  {
    id: "TC3",
    name: "Tải ngoại lai",
    description: "Khó khăn do cách trình bày và tổ chức thông tin",
    score: 3.6,
    type: "difficulty",
  },
  {
    id: "TC4",
    name: "Điều kiện học tập",
    description: "Ảnh hưởng từ môi trường và điều kiện học tập",
    score: 2.8,
    type: "difficulty",
  },
  {
    id: "TC5",
    name: "Trạng thái cá nhân",
    description: "Ảnh hưởng của tâm trạng và sức khỏe",
    score: 3.2,
    type: "difficulty",
  },
  {
    id: "TC6",
    name: "Hứng thú",
    description: "Mức độ hứng thú khi đọc hiểu thơ",
    score: 2.4,
    type: "interest",
  },
  {
    id: "TC7",
    name: "Tính chủ động",
    description: "Mức độ chủ động trong quá trình đọc hiểu",
    score: 2.1,
    type: "interest",
  },
]

const readingTest = {
  score: 6.75,
  maxScore: 10,
}

// =========================================================
// COMPONENT
// =========================================================

function AssessmentResult() {
  const [supportLevel, setSupportLevel] = useState(2)
  const [note, setNote] = useState("")
  const [saved, setSaved] = useState(false)

  // ---------------------------------------------------------
  // ĐIỂM COGNITIVE LOAD
  // ---------------------------------------------------------

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
        0
      ) / reversedScores.length
    )
  }, [])

  // ---------------------------------------------------------
  // PHÂN MỨC HỖ TRỢ
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  // SAVE
  // ---------------------------------------------------------

  const handleSave = () => {
    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#eadfd5] bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              Giáo viên
            </p>

            <h1 className="text-xl font-bold text-[#7f1d2d]">
              Kết quả đánh giá đầu vào
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-[#8f1d2c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#741624]"
          >
            Lưu kết quả
          </button>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* ===================================================
            STUDENT INFO
        =================================================== */}

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

        {/* ===================================================
            COGNITIVE LOAD
        =================================================== */}

        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              Kết quả bảng đánh giá
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

        {/* ===================================================
            SUPPORT LEVEL
        =================================================== */}

        <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              Phân loại hỗ trợ
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

              const selected =
                supportLevel === level

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

        {/* ===================================================
            NOTE
        =================================================== */}

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

        {/* ===================================================
            SAVE
        =================================================== */}

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

export default AssessmentResult
import { useMemo, useState } from "react"

// =========================================================
// MOCK BÀI LÀM CỦA HỌC SINH
// =========================================================

const student = {
  name: "Nguyễn Minh Anh",
  className: "10A1",
  submittedAt: "09/09/2026 - 08:42",
  duration: "38 phút",
}

// =========================================================
// RUBRIC
// =========================================================

const questions = [
  {
    id: "C1",
    maxScore: 0.25,
    answer:
      "Đêm mưa thường gợi cho em cảm giác buồn, cô đơn và nhớ nhung.",
    rubric: [
      {
        id: "C1a",
        description:
          "Nêu được cảm xúc phù hợp với đặc điểm của đêm mưa.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C2",
    maxScore: 0.5,
    answer:
      "Em dự đoán bài thơ nói về nỗi buồn và sự cô đơn của con người trong đêm mưa. Vì nhan đề có từ “Buồn” và “mưa đêm” thường gợi cảm giác vắng lặng.",
    rubric: [
      {
        id: "C2a",
        description:
          "Dự đoán phù hợp về chủ đề của văn bản.",
        score: 0.25,
      },
      {
        id: "C2b",
        description:
          "Có lí giải dựa vào nhan đề và kinh nghiệm đọc.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C3",
    maxScore: 0.5,
    answer:
      "“Trời nằng nặng” không chỉ là cảm giác về bầu trời mà còn gợi sự nặng nề, u buồn. Nhân vật trữ tình cảm nhận như vậy vì tâm trạng buồn khiến cảnh vật bên ngoài cũng trở nên nặng nề.",
    rubric: [
      {
        id: "C3a",
        description:
          "Giải thích được ý nghĩa của “trời nằng nặng”.",
        score: 0.25,
      },
      {
        id: "C3b",
        description:
          "Lí giải được vì sao nhân vật trữ tình cảm nhận “trời nặng nặng”.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C4",
    maxScore: 0.5,
    answer:
      "Em hình dung nhân vật trữ tình đang nằm nghiêng, thả mình trong giấc mộng và lắng nghe tiếng mưa. Tư thế ấy thể hiện trạng thái buông lỏng, hững hờ và chìm vào thế giới riêng.",
    rubric: [
      {
        id: "C4a",
        description:
          "Hình dung được tư thế của nhân vật trữ tình.",
        score: 0.25,
      },
      {
        id: "C4b",
        description:
          "Hình dung được trạng thái, tâm thế của nhân vật trữ tình.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C5",
    maxScore: 0.5,
    answer:
      "a) Những hình ảnh: đêm mưa, nước giọt mái nhà, gió, hơi may hiu hắt. b) Những hình ảnh tạo nên không gian buồn, lạnh, vắng lặng. Nhan đề thể hiện nỗi buồn được gợi lên từ không gian mưa đêm.",
    rubric: [
      {
        id: "C5a",
        description:
          "Xác định được các từ ngữ, hình ảnh khắc họa không gian đêm mưa.",
        score: 0.25,
      },
      {
        id: "C5b",
        description:
          "Nhận xét được bầu không khí và giải thích ý nghĩa nhan đề.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C6",
    maxScore: 0.75,
    answer:
      "Biện pháp điệp từ “nghe” được lặp lại nhiều lần, tạo cảm giác tiếng mưa vang vọng và kéo dài. Qua đó thể hiện sự cô đơn, buồn bã và trạng thái nhạy cảm của chủ thể trữ tình.",
    rubric: [
      {
        id: "C6a",
        description:
          "Xác định đúng một biện pháp tu từ.",
        score: 0.25,
      },
      {
        id: "C6b",
        description:
          "Phân tích được tác dụng của biện pháp tu từ.",
        score: 0.25,
      },
      {
        id: "C6c",
        description:
          "Liên hệ được tác dụng với tâm trạng của chủ thể trữ tình.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C7",
    maxScore: 0.75,
    answer:
      "Các hình ảnh gợi sự xa cách, cô đơn và một thế giới nội tâm rộng lớn nhưng không có nơi che chở. Chúng cho thấy con người đang lạc lõng và chìm trong nỗi buồn.",
    rubric: [
      {
        id: "C7a",
        description:
          "Giải thích được ý nghĩa tượng trưng của các hình ảnh.",
        score: 0.5,
      },
      {
        id: "C7b",
        description:
          "Lí giải được mối quan hệ giữa ngoại cảnh và nội tâm.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C8",
    maxScore: 0.75,
    answer:
      "Tác giả dùng thính giác để cảm nhận những điều vốn thuộc về cảm xúc và không gian. Cách kết hợp này khiến nỗi buồn như có thể nghe thấy được, tạo cảm giác mơ hồ và ám ảnh.",
    rubric: [
      {
        id: "C8a",
        description:
          "Nhận diện được sự kết hợp giữa các giác quan.",
        score: 0.25,
      },
      {
        id: "C8b",
        description:
          "Phân tích được tác dụng nghệ thuật của sự kết hợp.",
        score: 0.5,
      },
    ],
  },

  {
    id: "C9",
    maxScore: 1.25,
    answer:
      "a) Chủ thể trữ tình mang tâm trạng buồn, cô đơn, nhớ nhung và tương tư. Những từ ngữ như “buồn buồn”, “lẻ loi”, “hững hờ”, “hiu hắt” cho thấy cảm xúc ngày càng chìm sâu. b) Con người cần biết đối diện với nỗi buồn thay vì luôn né tránh, bởi việc nhận diện cảm xúc giúp con người hiểu chính mình.",
    rubric: [
      {
        id: "C9a",
        description:
          "Phân tích được tâm trạng, cảm xúc của chủ thể trữ tình.",
        score: 0.5,
      },
      {
        id: "C9b",
        description:
          "Rút ra được suy ngẫm phù hợp và có lí giải.",
        score: 0.75,
      },
    ],
  },

  {
    id: "C10",
    maxScore: 1.5,
    answer:
      "a) Nhịp thơ chậm, kết hợp với các từ láy “rơi rơi”, “buồn buồn”, “dìu dịu”, “hiu hắt” tạo âm hưởng nhẹ, buồn và kéo dài. b) Nhạc điệu bài thơ chậm rãi, da diết, phù hợp với mạch cảm xúc cô đơn và buồn thương.",
    rubric: [
      {
        id: "C10a",
        description:
          "Xác định và phân tích được cách ngắt nhịp kết hợp với từ láy.",
        score: 0.75,
      },
      {
        id: "C10b",
        description:
          "Nhận xét được nhạc điệu của bài thơ.",
        score: 0.75,
      },
    ],
  },

  {
    id: "C11",
    maxScore: 1.0,
    answer:
      "Mạch cảm xúc được triển khai từ cảm nhận không gian mưa đến sự cộng hưởng với nỗi buồn, cô đơn và cuối cùng là trạng thái chìm vào thế giới nội tâm. Cách triển khai này giúp tâm trạng của chủ thể trữ tình ngày càng sâu và lan rộng.",
    rubric: [
      {
        id: "C11a",
        description:
          "Nhận xét được cách triển khai mạch cảm xúc.",
        score: 0.75,
      },
      {
        id: "C11b",
        description:
          "Phân tích được tác dụng đối với tâm trạng nhân vật trữ tình.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C12",
    maxScore: 0.75,
    answer:
      "Bài thơ gợi thông điệp rằng con người cần biết lắng nghe và đối diện với thế giới nội tâm của mình. Em rút ra thông điệp từ những hình ảnh và cảm xúc cô đơn, buồn bã của chủ thể trữ tình.",
    rubric: [
      {
        id: "C12a",
        description:
          "Nêu được thông điệp phù hợp.",
        score: 0.5,
      },
      {
        id: "C12b",
        description:
          "Chỉ ra được căn cứ để rút ra thông điệp.",
        score: 0.25,
      },
    ],
  },

  {
    id: "C13",
    maxScore: 1.0,
    answer:
      "Em đồng tình một phần với quan điểm trên. Đôi khi sự tĩnh lặng giúp con người có thời gian nhìn lại cảm xúc và xoa dịu tổn thương. Tuy nhiên, nếu chìm đắm quá lâu trong mộng mị, con người có thể né tránh thực tại thay vì giải quyết vấn đề.",
    rubric: [
      {
        id: "C13a",
        description:
          "Thể hiện rõ quan điểm đối với vấn đề được nêu.",
        score: 0.25,
      },
      {
        id: "C13b",
        description:
          "Có lí giải, lập luận phù hợp.",
        score: 0.5,
      },
      {
        id: "C13c",
        description:
          "Đảm bảo yêu cầu về hình thức và dung lượng.",
        score: 0.25,
      },
    ],
  },
]

// =========================================================
// COMPONENT
// =========================================================

function Grading() {
  // scores chỉ chứa những tiêu chí ĐÃ được nhập điểm.
  //
  // Ví dụ:
  // {}
  // → chưa chấm
  //
  // { C1a: 0 }
  // → đã chấm 0 điểm
  //
  // { C1a: 0.2 }
  // → đã chấm 0.2 điểm

  const [scores, setScores] = useState({})
  const [feedback, setFeedback] = useState({})
  const [activeQuestion, setActiveQuestion] = useState("C1")
  const [saved, setSaved] = useState(false)

  // =========================================================
  // TỔNG SỐ TIÊU CHÍ
  // =========================================================

  const totalCriteria = useMemo(() => {
    return questions.reduce(
      (total, question) =>
        total + question.rubric.length,
      0
    )
  }, [])

  // =========================================================
  // SỐ TIÊU CHÍ ĐÃ CHẤM
  // =========================================================

  const gradedCriteria = useMemo(() => {
    return Object.keys(scores).length
  }, [scores])

  // =========================================================
  // KIỂM TRA ĐÃ CHẤM ĐỦ
  // =========================================================

  const allGraded = gradedCriteria === totalCriteria

  // =========================================================
  // TỔNG ĐIỂM
  // =========================================================

  const totalScore = useMemo(() => {
    return Object.values(scores).reduce(
      (total, score) => total + Number(score || 0),
      0
    )
  }, [scores])

  // =========================================================
  // ĐIỂM TỐI ĐA
  // =========================================================

  const maxScore = useMemo(() => {
    return questions.reduce(
      (total, question) => total + question.maxScore,
      0
    )
  }, [])

  // =========================================================
  // ĐIỂM CỦA TỪNG CÂU
  // =========================================================

  const getQuestionScore = (question) => {
    return question.rubric.reduce(
      (total, criterion) => {
        const score = scores[criterion.id]

        if (
          score === undefined ||
          score === null ||
          score === ""
        ) {
          return total
        }

        return total + Number(score)
      },
      0
    )
  }

  // =========================================================
  // KIỂM TRA TỪNG CÂU ĐÃ CHẤM
  // =========================================================

  const isQuestionGraded = (question) => {
    return question.rubric.every(
      (criterion) =>
        scores[criterion.id] !== undefined &&
        scores[criterion.id] !== null &&
        scores[criterion.id] !== ""
    )
  }

  // =========================================================
  // NHẬP ĐIỂM
  // =========================================================

  const handleScoreChange = (
    criterionId,
    value,
    max
  ) => {
    // Cho phép xóa ô điểm trong lúc nhập
    if (value === "") {
      setScores((current) => {
        const next = { ...current }

        delete next[criterionId]

        return next
      })

      setSaved(false)

      return
    }

    const numericValue = Number(value)

    // Không xử lý giá trị không hợp lệ
    if (Number.isNaN(numericValue)) {
      return
    }

    // Không cho điểm âm
    // Không cho vượt quá điểm tối đa
    const validScore = Math.min(
      Math.max(numericValue, 0),
      max
    )

    setScores((current) => ({
      ...current,
      [criterionId]: validScore,
    }))

    setSaved(false)
  }

  // =========================================================
  // NHẬN XÉT
  // =========================================================

  const handleFeedbackChange = (
    questionId,
    value
  ) => {
    setFeedback((current) => ({
      ...current,
      [questionId]: value,
    }))

    setSaved(false)
  }

  // =========================================================
  // LƯU KẾT QUẢ
  // =========================================================

  const handleSave = () => {
    if (!allGraded) {
      alert(
        `Vui lòng chấm đủ ${totalCriteria} tiêu chí trước khi lưu kết quả.`
      )

      return
    }

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
              Chấm bài kiểm tra đầu vào
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
            THÔNG TIN HỌC SINH
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
                  Nộp lúc {student.submittedAt}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <div className="rounded-2xl bg-[#fffaf0] px-5 py-3 text-center">

                <p className="text-xs text-gray-500">
                  Thời gian làm
                </p>

                <p className="mt-1 font-bold text-[#7f1d2d]">
                  {student.duration}
                </p>

              </div>

              <div className="rounded-2xl bg-[#f8f5ef] px-5 py-3 text-center">

                <p className="text-xs text-gray-500">
                  Điểm hiện tại
                </p>

                <p className="mt-1 text-xl font-bold text-[#7f1d2d]">
                  {totalScore.toFixed(2)}
                  <span className="text-sm font-medium text-gray-400">
                    {" "}
                    / {maxScore.toFixed(2)}
                  </span>
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            BODY
        =================================================== */}

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="h-fit rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#eadfd5] lg:sticky lg:top-28">

            <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-400">
              Danh sách câu hỏi
            </p>

            <div className="space-y-1">

              {questions.map((question) => {

                const questionScore =
                  getQuestionScore(question)

                const isActive =
                  activeQuestion === question.id

                const isCompleted =
                  isQuestionGraded(question)

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() =>
                      setActiveQuestion(question.id)
                    }
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-[#8f1d2c] text-white"
                        : "text-gray-700 hover:bg-[#faf8f3]"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-[#f6eee6] text-[#7f1d2d]"
                        }`}
                      >
                        {question.id.replace(
                          "C",
                          ""
                        )}
                      </span>

                      <span className="text-sm font-medium">
                        {question.id}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <span
                        className={`text-xs font-semibold ${
                          isActive
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {questionScore.toFixed(2)}
                      </span>

                      <span
                        className={`text-xs ${
                          isCompleted
                            ? isActive
                              ? "text-white"
                              : "text-green-600"
                            : isActive
                              ? "text-white/60"
                              : "text-gray-400"
                        }`}
                      >
                        {isCompleted
                          ? "✓"
                          : "○"}
                      </span>

                    </div>

                  </button>
                )
              })}

            </div>

          </aside>

          {/* =================================================
              KHU VỰC CHẤM
          ================================================= */}

          <section className="space-y-6">

            {questions
              .filter(
                (question) =>
                  question.id === activeQuestion
              )
              .map((question) => {

                const questionScore =
                  getQuestionScore(question)

                const questionGraded =
                  isQuestionGraded(question)

                return (
                  <div
                    key={question.id}
                    className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]"
                  >

                    {/* =========================================
                        HEADER CÂU
                    ========================================= */}

                    <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-5 md:px-8">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <span className="rounded-lg bg-[#8f1d2c] px-3 py-1.5 text-sm font-bold text-white">
                            {question.id}
                          </span>

                          {questionGraded ? (
                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              Đã chấm
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                              Chưa chấm
                            </span>
                          )}

                        </div>

                        <div className="text-right">

                          <p className="text-xs text-gray-400">
                            Điểm câu
                          </p>

                          <p className="text-xl font-bold text-[#7f1d2d]">
                            {questionScore.toFixed(2)}

                            <span className="text-sm font-medium text-gray-400">
                              {" "}
                              /{" "}
                              {question.maxScore.toFixed(
                                2
                              )}
                            </span>
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* =========================================
                        CÂU TRẢ LỜI
                    ========================================= */}

                    <div className="px-6 py-6 md:px-8">

                      <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                        Câu trả lời của HỌC SINH
                      </h3>

                      <div className="rounded-2xl border border-gray-200 bg-[#fffdf9] px-5 py-4">

                        <p className="whitespace-pre-line text-[16px] leading-8 text-gray-800">
                          {question.answer}
                        </p>

                      </div>

                    </div>

                    {/* =========================================
                        RUBRIC
                    ========================================= */}

                    <div className="border-t border-[#eadfd5] px-6 py-6 md:px-8">

                      <div className="mb-5">

                        <h3 className="text-lg font-bold text-gray-800">
                          Tiêu chí chấm
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Giáo viên nhập điểm dựa trên
                          rubric. Điểm có thể linh hoạt
                          trong khoảng từ 0 đến điểm tối đa
                          của từng tiêu chí.
                        </p>

                      </div>

                      <div className="space-y-3">

                        {question.rubric.map(
                          (criterion) => {

                            const hasScore =
                              scores[
                                criterion.id
                              ] !== undefined &&
                              scores[
                                criterion.id
                              ] !== null &&
                              scores[
                                criterion.id
                              ] !== ""

                            const currentScore =
                              hasScore
                                ? scores[
                                    criterion.id
                                  ]
                                : ""

                            return (
                              <div
                                key={criterion.id}
                                className="rounded-2xl border border-gray-200 bg-[#fffdf9] p-4"
                              >

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                  <div className="flex-1">

                                    <div className="mb-1 flex items-start gap-2">

                                      <span className="mt-0.5 text-xs font-bold text-[#8f1d2c]">
                                        {
                                          criterion.id
                                        }
                                      </span>

                                      <span className="text-sm font-medium leading-6 text-gray-800">
                                        {
                                          criterion.description
                                        }
                                      </span>

                                    </div>

                                    <p className="text-xs text-gray-400">
                                      Tối đa{" "}
                                      {criterion.score.toFixed(
                                        2
                                      )}{" "}
                                      điểm
                                    </p>

                                  </div>

                                  <div className="flex shrink-0 items-center gap-2">

                                    <input
                                      type="number"
                                      min="0"
                                      max={
                                        criterion.score
                                      }
                                      step="any"
                                      value={
                                        currentScore
                                      }
                                      placeholder="0"
                                      onChange={(
                                        event
                                      ) =>
                                        handleScoreChange(
                                          criterion.id,
                                          event.target
                                            .value,
                                          criterion.score
                                        )
                                      }
                                      className={`w-24 rounded-xl border bg-white px-3 py-2 text-center text-sm font-semibold outline-none transition ${
                                        hasScore
                                          ? "border-green-300 text-gray-800 focus:border-[#8f1d2c]"
                                          : "border-gray-200 text-gray-800 focus:border-[#8f1d2c]"
                                      }`}
                                    />

                                    <span className="text-sm text-gray-400">
                                      /{" "}
                                      {criterion.score.toFixed(
                                        2
                                      )}
                                    </span>

                                  </div>

                                </div>

                              </div>
                            )
                          }
                        )}

                      </div>

                    </div>

                    {/* =========================================
                        NHẬN XÉT
                    ========================================= */}

                    <div className="border-t border-[#eadfd5] px-6 py-6 md:px-8">

                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Nhận xét cho HỌC SINH
                      </label>

                      <textarea
                        value={
                          feedback[
                            question.id
                          ] || ""
                        }
                        onChange={(event) =>
                          handleFeedbackChange(
                            question.id,
                            event.target.value
                          )
                        }
                        rows={4}
                        placeholder="Nhập nhận xét cho câu trả lời..."
                        className="w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-3 text-[15px] leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                      />

                    </div>

                  </div>
                )
              })}

          </section>

          {/* =================================================
              TỔNG KẾT
          ================================================= */}

          <aside className="h-fit space-y-4 lg:sticky lg:top-28">

            {/* ===============================================
                TỔNG ĐIỂM
            =============================================== */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">

              <p className="text-sm font-semibold text-gray-500">
                Tổng điểm
              </p>

              <div className="mt-3 flex items-end gap-2">

                <span className="text-4xl font-bold text-[#7f1d2d]">
                  {totalScore.toFixed(2)}
                </span>

                <span className="pb-1 text-gray-400">
                  / {maxScore.toFixed(2)}
                </span>

              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">

                <div
                  className="h-full rounded-full bg-[#8f1d2c] transition-all"
                  style={{
                    width: `${Math.min(
                      (totalScore / maxScore) *
                        100,
                      100
                    )}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Đã chấm {gradedCriteria}/
                {totalCriteria} tiêu chí
              </p>

            </div>

            {/* ===============================================
                TRẠNG THÁI
            =============================================== */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">

              <h3 className="font-bold text-gray-800">
                Trạng thái chấm
              </h3>

              <div className="mt-4">

                {allGraded ? (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

                    <p className="font-semibold text-green-700">
                      Đã chấm đủ
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-600">
                      Tất cả tiêu chí đã được nhập
                      điểm. Có thể lưu kết quả.
                    </p>

                  </div>
                ) : (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

                    <p className="font-semibold text-amber-700">
                      Chưa hoàn tất
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-600">
                      Còn{" "}
                      {totalCriteria -
                        gradedCriteria}{" "}
                      tiêu chí chưa được chấm.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* ===============================================
                TIẾN ĐỘ
            =============================================== */}

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">

              <h3 className="font-bold text-gray-800">
                Tiến độ chấm
              </h3>

              <div className="mt-4 space-y-3">

                {questions.map((question) => {

                  const complete =
                    isQuestionGraded(
                      question
                    )

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() =>
                        setActiveQuestion(
                          question.id
                        )
                      }
                      className="flex w-full items-center justify-between text-sm"
                    >

                      <span className="text-gray-600">
                        {question.id}
                      </span>

                      <span
                        className={
                          complete
                            ? "font-semibold text-green-600"
                            : "text-gray-400"
                        }
                      >
                        {complete
                          ? "Đã chấm"
                          : "Chưa chấm"}
                      </span>

                    </button>
                  )
                })}

              </div>

            </div>

            {/* ===============================================
                LƯU
            =============================================== */}

            <button
              type="button"
              onClick={handleSave}
              className={`w-full rounded-2xl px-5 py-3.5 font-semibold shadow-sm transition ${
                allGraded
                  ? "bg-[#8f1d2c] text-white hover:bg-[#741624]"
                  : "cursor-pointer bg-[#f1e6df] text-[#8f1d2c] hover:bg-[#eadbd2]"
              }`}
            >
              {allGraded
                ? "Lưu kết quả chấm"
                : "Chấm đủ để lưu"}
            </button>

            {saved && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                Đã lưu kết quả chấm.
              </div>
            )}

          </aside>

        </div>

      </main>

    </div>
  )
}

export default Grading
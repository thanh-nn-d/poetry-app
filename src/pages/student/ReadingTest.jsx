import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  loadInitialAssessment,
  saveLearningRecord,
} from "./supportLevel"

// =========================================================
// DỮ LIỆU CÂU HỎI
// =========================================================

const questions = [
  // =========================================================
  // TRƯỚC KHI ĐỌC
  // =========================================================
  {
    id: "C1",
    section: "Trước khi đọc",
    maxScore: 0.25,
    parts: [
      {
        text: "Theo em, đêm mưa thường gợi lên cho con người những cảm xúc gì?",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 4,
  },

  {
    id: "C2",
    section: "Trước khi đọc",
    maxScore: 0.5,
    parts: [
      {
        text: "Văn bản mà em sắp đọc có nhan đề là ",
      },
      {
        text: "Buồn mưa đêm",
        quoted: true,
      },
      {
        text: ". Dựa vào nhan đề và kinh nghiệm đọc, hãy đưa ra dự đoán về chủ đề của văn bản. Vì sao em đưa những dự đoán như thế?",
      },
    ],
    placeholder: "Nhập dự đoán và lí giải của em...",
    rows: 5,
  },

  // =========================================================
  // TRONG QUÁ TRÌNH ĐỌC
  // =========================================================
  {
    id: "C3",
    section: "Trong quá trình đọc",
    category: "SUY LUẬN",
    maxScore: 0.5,
    parts: [
      {
        text: "Theo em, ",
      },
      {
        text: "“trời nằng nặng”",
        quoted: true,
      },
      {
        text: " có nghĩa là gì? Vì sao nhân vật trữ tình lại cảm nhận ",
      },
      {
        text: "“trời nặng nặng”",
        quoted: true,
      },
      {
        text: "?",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 5,
  },

  {
    id: "C4",
    section: "Trong quá trình đọc",
    category: "TƯỞNG TƯỢNG",
    maxScore: 0.5,
    parts: [
      {
        text: "Em hình dung tư thế và trạng thái của nhân vật trữ tình qua hai câu thơ:",
      },
    ],
    quote: `“Tương tư hướng lạc, phương mờ...
Trở nghiêng gối mộng, hững hờ nằm nghe.”`,
    afterQuote: "như thế nào?",
    placeholder: "Nhập câu trả lời của em...",
    rows: 6,
  },

  // =========================================================
  // SAU KHI ĐỌC
  // =========================================================
  {
    id: "C5",
    section: "Sau khi đọc",
    maxScore: 0.5,
    parts: [
      {
        text: "a) Xác định những từ ngữ, hình ảnh được sử dụng để khắc họa không gian đêm mưa.",
      },
      {
        text: "\nb) Những từ ngữ, hình ảnh đó gợi lên bầu không khí như thế nào? Từ đó hãy giải thích ý nghĩa của nhan đề ",
      },
      {
        text: "“Buồn mưa đêm”",
        quoted: true,
      },
      {
        text: " của văn bản.",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },

  {
    id: "C6",
    section: "Sau khi đọc",
    maxScore: 0.75,
    parts: [
      {
        text: "Em hãy xác định 01 biện pháp tu từ được sử dụng trong văn bản và phân tích tác dụng của biện pháp tu từ đó trong việc thể hiện tâm trạng của chủ thể trữ tình.",
      },
    ],
    promptQuote: `“Rơi rơi... dìu dịu rơi rơi...”`,
    promptQuoteLabel: "Gợi ý từ văn bản:",
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },

  {
    id: "C7",
    section: "Sau khi đọc",
    maxScore: 0.75,
    parts: [
      {
        text: "Những hình ảnh như ",
      },
      {
        text: "“chân xa vắng”",
        quoted: true,
      },
      {
        text: ", ",
      },
      {
        text: "“dặm mòn lẻ loi”",
        quoted: true,
      },
      {
        text: ", ",
      },
      {
        text: "“gối mộng”",
        quoted: true,
      },
      {
        text: ", ",
      },
      {
        text: "“lòng rộng không che”",
        quoted: true,
      },
      {
        text: " tượng trưng cho điều gì? Vì sao?",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },

  {
    id: "C8",
    section: "Sau khi đọc",
    maxScore: 0.75,
    parts: [
      {
        text: "Em cảm nhận như thế nào về sự kết hợp giữa các giác quan và tác dụng nghệ thuật của sự kết hợp ấy trong câu thơ ",
      },
      {
        text: "“Nghe trời nằng nặng, nghe ta buồn buồn.”",
        quoted: true,
      },
      {
        text: " ",
      },
      {
        text: "“Nghe đi rời rạc trong hồn”",
        quoted: true,
      },
      {
        text: "?",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },

  {
    id: "C9",
    section: "Sau khi đọc",
    maxScore: 1.25,
    parts: [
      {
        text: "a) Em hãy phân tích tâm trạng, cảm xúc của chủ thể trữ tình qua các từ ngữ biểu hiện trong bài thơ. Từ đó, nhận xét về tâm trạng của chủ thể trữ tình trong đêm mưa.",
      },
      {
        text: "\nb) Từ tâm trạng của chủ thể trữ tình trong bài thơ, em hãy rút ra một suy ngẫm về con người khi đối diện với nỗi buồn và sự cô đơn. Hãy lí giải vì sao em có suy ngẫm đó.",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 9,
  },

  {
    id: "C10",
    section: "Sau khi đọc",
    maxScore: 1.5,
    parts: [
      {
        text: "a) Em hãy xác định cách ngắt nhịp trong văn bản. Cách ngắt nhịp ấy phối hợp với những từ láy như ",
      },
      {
        text: "“rơi rơi”",
        quoted: true,
      },
      {
        text: ", ",
      },
      {
        text: "“buồn buồn”",
        quoted: true,
      },
      {
        text: ", ",
      },
      {
        text: "“dìu dịu”",
        quoted: true,
      },
      {
        text: ", ",
      },
      {
        text: "“hiu hắt”",
        quoted: true,
      },
      {
        text: " đã tạo nên nhạc điệu như thế nào và giúp em hình dung như thế nào về mạch cảm xúc của văn bản?",
      },
      {
        text: "\nb) Nhận xét nhạc điệu của bài thơ ",
      },
      {
        text: "Buồn mưa đêm",
        quoted: true,
      },
      {
        text: ".",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 9,
  },

  {
    id: "C11",
    section: "Sau khi đọc",
    maxScore: 1.0,
    parts: [
      {
        text: "Em hãy nhận xét về cách triển khai mạch cảm xúc trong bài thơ. Cách sắp xếp ấy góp phần thể hiện tâm trạng của chủ thể trữ tình như thế nào?",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },

  {
    id: "C12",
    section: "Sau khi đọc",
    maxScore: 0.75,
    parts: [
      {
        text: "Văn bản ",
      },
      {
        text: "Buồn mưa đêm",
        quoted: true,
      },
      {
        text: " đem đến cho em thông điệp gì? Dựa vào đâu mà em có thể rút ra thông điệp ấy?",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },

  {
    id: "C13",
    section: "Sau khi đọc",
    maxScore: 1.0,
    parts: [
      {
        text: "Từ trạng thái buông lỏng, phó mặc của chủ thể trữ tình qua câu thơ ",
      },
      {
        text: "“Trở nghiêng gối mộng, hững hờ nằm nghe”",
        quoted: true,
      },
      {
        text: " em có suy nghĩ gì về quan điểm: ",
      },
      {
        text: "“Đôi khi, chìm đắm vào cõi mộng mị và sự tĩnh lặng là cách để con người xoa dịu những tổn thương của thực tại”",
        quoted: true,
      },
      {
        text: "? Vì sao?\n(Trả lời trong khoảng 50 - 80 chữ).",
      },
    ],
    placeholder: "Nhập câu trả lời của em...",
    rows: 7,
  },
]

// =========================================================
// RENDER NỘI DUNG CÂU HỎI
// =========================================================

function QuestionText({ parts }) {
  return (
    <p className="whitespace-pre-line text-[17px] leading-8 text-gray-800 md:text-[18px]">
      {parts.map((part, index) => {
        if (part.quoted) {
          return (
            <strong
              key={index}
              className="font-bold italic text-gray-900"
            >
              {part.text}
            </strong>
          )
        }

        return <span key={index}>{part.text}</span>
      })}
    </p>
  )
}

// =========================================================
// CARD CÂU HỎI
// =========================================================

function QuestionCard({ question, answer, onChange }) {
  return (
    <div className="px-6 py-8 md:px-8">
      <div className="mb-6 flex items-start gap-4">
        {/* SỐ CÂU */}
        <span className="mt-0.5 shrink-0 rounded-lg bg-[#8f1d2c] px-3 py-1.5 text-sm font-bold text-white">
          {question.id}
        </span>

        {/* NỘI DUNG CÂU HỎI */}
        <div className="min-w-0 flex-1">
          <QuestionText parts={question.parts} />

          {/* TRÍCH DẪN RIÊNG */}
          {question.quote && (
            <div
              className="my-5 border-l-4 border-[#8f1d2c]/30 bg-[#fffaf0] px-5 py-4 text-[17px] italic leading-8 text-gray-800 md:text-[18px]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
              }}
            >
              {question.quote.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          )}

          {/* PHẦN SAU TRÍCH DẪN */}
          {question.afterQuote && (
            <div className="mt-2">
              <p className="text-[17px] leading-8 text-gray-800 md:text-[18px]">
                {question.afterQuote}
              </p>
            </div>
          )}

          {/* TRÍCH DẪN GỢI Ý */}
          {question.promptQuote && (
            <div className="mt-5">
              {question.promptQuoteLabel && (
                <p className="mb-2 text-sm font-semibold text-gray-500">
                  {question.promptQuoteLabel}
                </p>
              )}

              <div
                className="border-l-4 border-[#8f1d2c]/30 bg-[#fffaf0] px-5 py-3 text-[17px] italic leading-8 text-gray-800 md:text-[18px]"
                style={{
                  fontFamily:
                    '"Times New Roman", Times, serif',
                }}
              >
                {question.promptQuote}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ô TRẢ LỜI */}
      <textarea
        value={answer}
        onChange={(event) =>
          onChange(question.id, event.target.value)
        }
        placeholder={question.placeholder}
        rows={question.rows}
        className="w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-5 py-4 text-[16px] leading-7 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
      />
    </div>
  )
}

// =========================================================
// MAIN
// =========================================================

function ReadingTest() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const totalQuestions = questions.length

  const answeredQuestions = questions.filter(
    (question) =>
      answers[question.id] &&
      answers[question.id].trim().length > 0
  ).length

  const handleChange = (questionId, value) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }))
  }

  const handleSubmit = () => {
    if (answeredQuestions !== totalQuestions) return

    const initialAssessment = loadInitialAssessment()

    const readingResult = {
      testId: "initial-reading-test",
      textId: "buon-mua-dem",
      answers,
      answeredQuestions,
      totalQuestions,
      maxScore: questions.reduce(
        (sum, question) => sum + question.maxScore,
        0
      ),
      score: null,
      scoreStatus: "waiting_for_teacher_grading",
      initialAssessmentId:
        initialAssessment?.completedAt || null,
      completedAt: new Date().toISOString(),
    }

    localStorage.setItem(
      "poetry_reading_test_result",
      JSON.stringify(readingResult)
    )

    saveLearningRecord({
      type: "initial-reading-test",
      textId: "buon-mua-dem",
      score: null,
      status: "waiting_for_teacher_grading",
    })

    setSubmitted(true)
  }

  const beforeReadingQuestions = questions.filter(
    (question) => question.section === "Trước khi đọc"
  )

  const duringReadingQuestions = questions.filter(
    (question) => question.section === "Trong quá trình đọc"
  )

  const afterReadingQuestions = questions.filter(
    (question) => question.section === "Sau khi đọc"
  )

  return (
    <div className="min-h-screen bg-[#faf8f3]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-lg font-bold text-[#7f1d2d]">
              Luyện tập đọc hiểu thơ
            </h1>

            <p className="text-sm text-gray-500">
              Bài kiểm tra năng lực đầu vào
            </p>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-xs text-gray-400">
                Tiến độ trả lời
              </p>

              <p className="text-sm font-semibold text-gray-700">
                {answeredQuestions}/{totalQuestions} câu
              </p>
            </div>

            <div className="rounded-full bg-[#f8e9c8] px-4 py-2 text-sm font-bold text-[#7f1d2d]">
              45 phút
            </div>

          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* =====================================================
            TIÊU ĐỀ BÀI KIỂM TRA
        ===================================================== */}

        <section className="mb-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#eadfd5]">

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-3">

                <span className="rounded-lg bg-[#8f1d2c] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Bước 2 / 2
                </span>

                <span className="rounded-lg bg-[#f8e9c8] px-3 py-1 text-xs font-semibold text-[#7f1d2d]">
                  DEMO
                </span>

              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                ĐỀ KIỂM TRA NĂNG LỰC ĐẦU VÀO CỦA HỌC SINH
              </h2>

              <p className="mt-2 text-gray-500">
                TRƯỚC KHI THAM GIA THỰC NGHIỆM
              </p>

            </div>

            <div className="shrink-0 rounded-2xl bg-[#fffaf0] px-6 py-4 text-center">

              <p className="text-xs font-medium text-gray-500">
                Thời gian làm bài
              </p>

              <p className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                45 phút
              </p>

            </div>

          </div>
        </section>

        {/* =====================================================
            TRƯỚC KHI ĐỌC
        ===================================================== */}

        <section className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">

          <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-5 md:px-8">

            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              Phần 1
            </p>

            <h3 className="mt-1 text-xl font-bold text-[#7f1d2d]">
              TRƯỚC KHI ĐỌC
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Trả lời từ câu 1 đến câu 2 trước khi đọc văn bản.
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {beforeReadingQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                answer={answers[question.id] || ""}
                onChange={handleChange}
              />
            ))}

          </div>

        </section>

        {/* =====================================================
            ĐỌC VĂN BẢN
        ===================================================== */}

        <section className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">

          {/* TIÊU ĐỀ VĂN BẢN */}

          <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-6 text-center md:px-8">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a16207]">
              ĐỌC VĂN BẢN
            </p>

            <h3 className="mt-3 text-3xl font-bold text-[#7f1d2d]">
              BUỒN MƯA ĐÊM
            </h3>

            <p
              className="mt-1 text-base italic text-gray-600"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
              }}
            >
              - Huy Cận -
            </p>

          </div>

          {/* NỘI DUNG */}

          <div className="px-6 py-10 md:px-12">

            <div className="mx-auto max-w-4xl">

              {/* =================================================
                  BÀI THƠ
              ================================================= */}

              <div
                className="text-[24px] italic leading-[1.65] text-gray-900"
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                }}
              >

                {/* KHỔ 1 */}

                <div className="mb-9">

                  <p>
                    Đêm mưa làm nhớ không gian,
                  </p>

                  <p>
                    Lòng run thêm lạnh nỗi hàn bao la...
                  </p>

                </div>

                {/* KHỔ 2 */}

                <div className="mb-9">

                  <p>
                    Tai nương nước giọt mái nhà
                  </p>

                  <p>
                    Nghe{" "}
                    <strong className="font-bold">
                      trời nằng nặng
                    </strong>
                    , nghe ta buồn buồn.
                  </p>

                  <p>
                    Nghe đi rời rạc trong hồn
                  </p>

                  <p>
                    Những chân xa vắng dặm mòn lẻ loi...
                  </p>

                </div>

                {/* KHỔ 3 */}

                <div className="mb-9">

                  <p>
                    Rơi rơi... dìu dịu rơi rơi...
                  </p>

                  <p>
                    Trăm muôn giọt nhẹ nối lời vu vơ...
                  </p>

                </div>

                {/* KHỔ 4 */}

                <div>

                  <p>
                    <strong className="font-bold">
                      Tương tư hướng lạc, phương mờ...
                    </strong>
                  </p>

                  <p>
                    <strong className="font-bold">
                      Trở nghiêng gối mộng, hững hờ nằm nghe.
                    </strong>
                  </p>

                  <p>
                    Gió về, lòng rộng không che,
                  </p>

                  <p>
                    Hơi may hiu hắt bốn bề tâm tư…
                  </p>

                </div>

              </div>

              {/* =================================================
                  NGUỒN
              ================================================= */}

              <div
                className="mt-4 text-right text-[17px] leading-7 text-gray-800"
                style={{
                  fontFamily: '"Times New Roman", Times, serif',
                }}
              >

                (Huy Cận - trích{" "}
                <span className="italic">
                  Thơ Mới 1932 - 1945
                </span>
                , Nguyễn Cừ - Nguyễn Anh Vũ, NXB Văn học,
                <br />
                năm 2006, tr.89)

              </div>

              {/* =================================================
                  THÔNG TIN TÁC GIẢ
              ================================================= */}

              <div className="mt-6 border border-gray-400 bg-[#fffdf9] px-6 py-5">

                <p
                  className="text-[16px] leading-8 text-gray-800 md:text-[17px]"
                  style={{
                    fontFamily:
                      '"Times New Roman", Times, serif',
                  }}
                >

                  <strong>
                    Huy Cận
                  </strong>{" "}
                  tên thật là{" "}
                  <strong>
                    Cù Huy Cận
                  </strong>{" "}
                  <strong>
                    (1919 - 2005)
                  </strong>
                  . Ông là một trong những gương mặt tiêu biểu
                  của{" "}
                  <strong>
                    phong trào Thơ mới
                  </strong>
                  , nổi bật với phong cách thơ buồn ảo não,
                  triết lý, cô đơn, giàu cảm xúc. Văn bản{" "}
                  <strong>
                    <em>Buồn đêm mưa</em>
                  </strong>{" "}
                  được in trong tập{" "}
                  <strong>
                    <em>Lửa thiêng</em>
                  </strong>{" "}
                  (xuất bản 1940).

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            TRONG QUÁ TRÌNH ĐỌC
        ===================================================== */}

        <section className="mb-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">

          <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-5 md:px-8">

            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              Đọc và suy ngẫm
            </p>

            <h3 className="mt-1 text-xl font-bold text-[#7f1d2d]">
              TRONG QUÁ TRÌNH ĐỌC
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Trả lời các câu hỏi dựa trên những chi tiết được
              đánh dấu trong văn bản.
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {duringReadingQuestions.map((question) => (
              <div key={question.id}>

                {/* NHÃN NĂNG LỰC */}

                <div className="px-6 pt-7 md:px-8">

                  <span className="inline-flex rounded-full bg-[#e7eef7] px-4 py-1.5 text-sm font-bold text-[#526b87]">
                    {question.category}
                  </span>

                </div>

                <QuestionCard
                  question={question}
                  answer={answers[question.id] || ""}
                  onChange={handleChange}
                />

              </div>
            ))}

          </div>

        </section>

        {/* =====================================================
            SAU KHI ĐỌC
        ===================================================== */}

        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">

          <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-5 md:px-8">

            <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
              Phần 3
            </p>

            <h3 className="mt-1 text-xl font-bold text-[#7f1d2d]">
              SAU KHI ĐỌC
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Em hãy đọc và trả lời các câu hỏi dưới đây.
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {afterReadingQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                answer={answers[question.id] || ""}
                onChange={handleChange}
              />
            ))}

          </div>

        </section>

        {/* =====================================================
            NỘP BÀI
        ===================================================== */}

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#eadfd5]">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="font-semibold text-gray-800">
                Hoàn thành bài kiểm tra
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Đã trả lời {answeredQuestions}/{totalQuestions} câu.
              </p>

            </div>

            <button
              type="button"
              disabled={answeredQuestions !== totalQuestions}
              onClick={handleSubmit}
              className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
                answeredQuestions === totalQuestions
                  ? "bg-[#8f1d2c] hover:bg-[#741624]"
                  : "cursor-not-allowed bg-gray-300"
              }`}
            >
              Nộp bài
            </button>

          </div>

          {/* THÔNG BÁO DEMO */}

          {submitted && (
            <div className="mt-5 rounded-2xl border border-[#d8c6a3] bg-[#fffaf0] px-5 py-4">

              <p className="font-semibold text-[#7f1d2d]">
                Đã ghi nhận bài làm.
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Bài làm đã được lưu. Điểm đọc hiểu sẽ được bổ sung
                sau khi giáo viên chấm bài theo rubric.
              </p>

              <button
                type="button"
                onClick={() => navigate("/student/texts")}
                className="mt-4 rounded-xl bg-[#8f1d2c] px-6 py-3 font-semibold text-white transition hover:bg-[#741624]"
              >
                Tiếp tục luyện tập
              </button>

            </div>
          )}

        </div>

      </main>
    </div>
  )
}

export default ReadingTest 
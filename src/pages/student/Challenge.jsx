import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  saveChallengeResult,
} from "./supportLevel"

const poem = {
  title: "Thu",
  author: "Chế Lan Viên",
  source:
    "Hoài Thanh & Hoài Chân (2009), Thi nhân Việt Nam, NXB Văn học, tr. 224–225.",
}

const poemStanzas = [
  [
    "Chao ôi! Thu đã tới rồi sao?",
    "Thu trước vừa qua mới độ nào!",
    "Mới độ nào đây, hoa rạn vỡ",
    "Nắng hồng choàng ấp dãy bàng cao",
  ],
  [
    "Cũng mới độ nào trong gió lộng",
    "Nến lau bừng sáng núi lau xanh",
    "Bướm vàng nhè nhẹ bay ngang bóng",
    "Những khóm tre cao rủ trước thành",
  ],
  [
    "Thu đến đây! Chừ, mới nói răng?",
    "Chừ đây, buồn giận biết sao ngăn?",
    "Tìm cho những cánh hoa đang rụng",
    "Tôi kiếm trong hoa chút sắc tàn!",
  ],
  [
    "Tìm cho những nét thơ xanh cũ",
    "Trong những tờ thơ lá võ vàng",
    "Ai nỡ tìm môi người quả phụ",
    "Sắc màu hầu nhạt cả tình xuân",
  ],
  [
    "Trời ơi! Chán nản đương vây phủ",
    "Ý tưởng hồn tôi giữa cõi Tang!",
  ],
]

const questions = [
  {
    id: "C1",
    title:
      "Theo em, mùa thu thường gợi lên cho con người những cảm xúc gì?",
    points: 0.5,
    phase: "Trước khi đọc",
  },

  {
    id: "C2",
    title:
      "Dựa vào nhan đề Thu, em hãy dự đoán nội dung chính của văn bản. Vì sao em dự đoán như vậy?",
    points: 0.5,
    phase: "Trước khi đọc",
  },

  {
    id: "C3",
    title:
      "Xác định những từ ngữ, hình ảnh được sử dụng để khắc họa mùa thu trong văn bản.",
    points: 0.5,
    phase: "Sau khi đọc",
  },

  {
    id: "C4",
    title:
      "Những từ ngữ, hình ảnh đó gợi cho em cảm nhận gì về bức tranh thiên nhiên này?",
    points: 0.5,
    phase: "Sau khi đọc",
  },

  {
    id: "C5a",
    title:
      "Xác định 01 biện pháp tu từ và phân tích tác dụng đối với cảm thức về thời gian.",
    points: 0.5,
    phase: "Sau khi đọc",
    group: "C5",
    sub: "a",
  },

  {
    id: "C5b",
    title:
      "Ý nghĩa tượng trưng của “hoa rạn vỡ”, “nét thơ xanh cũ”, “lá võ vàng”, “người quả phụ” và mối liên hệ.",
    points: 0.75,
    phase: "Sau khi đọc",
    group: "C5",
    sub: "b",
  },

  {
    id: "C6",
    title:
      "Tương quan giác quan trong “Nắng hồng choàng ấp dãy bàng cao” và tác dụng.",
    points: 0.5,
    phase: "Sau khi đọc",
  },

  {
    id: "C7",
    title:
      "Sự vận động cảm xúc qua các khổ thơ; suy ngẫm triết lý về con người và thời gian.",
    points: 1.0,
    phase: "Sau khi đọc",
  },

  {
    id: "C8",
    title:
      "Phân tích cấu tứ của văn bản.",
    points: 0.5,
    phase: "Sau khi đọc",
  },

  {
    id: "C9",
    title:
      "Phân tích tác dụng của cấu tứ đối với việc thể hiện nỗi lòng của chủ thể trữ tình.",
    points: 0.5,
    phase: "Sau khi đọc",
  },

  {
    id: "C10a",
    title:
      "Phân tích nhạc điệu của văn bản: gieo vần, ngắt nhịp, thanh điệu,...",
    points: 0.5,
    phase: "Sau khi đọc",
    group: "C10",
    sub: "a",
  },

  {
    id: "C10b",
    title:
      "Phân tích tác dụng của nhạc điệu đối với cảm xúc và tâm trạng của chủ thể trữ tình.",
    points: 0.75,
    phase: "Sau khi đọc",
    group: "C10",
    sub: "b",
  },

  {
    id: "C11",
    title:
      "Nêu thông điệp của văn bản và phân tích tác động của thông điệp đó đến suy nghĩ, cảm nhận của em về thời gian và cuộc sống.",
    points: 1.0,
    phase: "Sau khi đọc",
  },

  {
    id: "C12",
    title:
      "Từ hình ảnh mùa thu và sự vận động của cảm xúc trong bài thơ, em hãy trình bày suy nghĩ về sự trôi chảy của thời gian và những giá trị đẹp đẽ của đời sống.",
    points: 1.0,
    phase: "Sau khi đọc",
  },

  {
    id: "C13",
    title:
      "Từ nỗ lực “tìm”, “kiếm” trong “những nét thơ xanh cũ / Trong những tờ thơ lá võ vàng”, em hãy trình bày suy nghĩ về quan điểm: “Sứ mệnh của nghệ thuật là lưu giữ những mảnh vỡ của cái đẹp đang tàn phai”. Vì sao?",
    points: 1.0,
    phase: "Sau khi đọc",
    minWords: 50,
    maxWords: 80,
  },
]

const TOTAL_SCORE = 10

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(
    secs,
  ).padStart(2, "0")}`
}

export default function Challenge() {
  const navigate = useNavigate()

  const supportLevel = getSupportLevel()
  const supportInfo = getLevelInfo(supportLevel)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showHelp, setShowHelp] = useState(false)
  const [helpCount, setHelpCount] = useState(0)
  const [startedAt] = useState(() => Date.now())
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers[currentQuestion.id] || ""

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - startedAt) / 1000),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [startedAt])

  const answeredCount = useMemo(() => {
    return questions.filter(
      (question) =>
        (answers[question.id] || "").trim().length > 0,
    ).length
  }, [answers])

  const progress =
    ((currentIndex + 1) / questions.length) * 100

  const wordCount = currentQuestion.minWords
    ? countWords(currentAnswer)
    : 0

  function handleAnswerChange(event) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: event.target.value,
    }))
  }

  function handleHelp() {
    setShowHelp((prev) => !prev)
    setHelpCount((prev) => prev + 1)
  }

  function goPrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setShowHelp(false)
    }
  }

  function goNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowHelp(false)
    }
  }

  function handleFinish() {
    const unanswered = questions.filter(
      (question) =>
        !(answers[question.id] || "").trim(),
    )

    if (unanswered.length > 0) {
      const firstUnanswered = questions.findIndex(
        (question) =>
          question.id === unanswered[0].id,
      )

      setCurrentIndex(firstUnanswered)
      setShowHelp(false)

      window.alert(
        `Em chưa hoàn thành ${unanswered.length} câu. Hãy hoàn thành tất cả câu hỏi trước khi nộp bài.`,
      )

      return
    }

    const finalWordCount = countWords(answers.C13 || "")

    if (
      finalWordCount < 50 ||
      finalWordCount > 80
    ) {
      setCurrentIndex(
        questions.findIndex(
          (question) => question.id === "C13",
        ),
      )

      setShowHelp(false)

      window.alert(
        `Câu 13 yêu cầu từ 50–80 từ. Hiện tại em có ${finalWordCount} từ.`,
      )

      return
    }

    const result = {
      type: "output_test",
      title: poem.title,
      author: poem.author,
      answers,
      totalQuestions: questions.length,
      answeredQuestions: answeredCount,
      totalScore: TOTAL_SCORE,
      supportLevel,
      supportLevelName: supportInfo.shortName,
      elapsedSeconds,
      helpCount,
      completedAt: new Date().toISOString(),
      status: "pending_manual_grading",
    }

    saveChallengeResult(result)

    localStorage.setItem(
      "poetry_challenge_result",
      JSON.stringify(result),
    )

    localStorage.setItem(
      "poetry_output_test_result",
      JSON.stringify(result),
    )

    navigate("/student/challenge-result")
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-800">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a16207]">
              BÀI KIỂM TRA NĂNG LỰC ĐẦU RA
            </p>

            <h1 className="mt-1 text-xl font-bold text-[#7f1d2d]">
              Thu — Chế Lan Viên
            </h1>
          </div>

          <div className="flex items-center gap-2">

            <span className="hidden rounded-xl bg-[#fff8ee] px-3 py-2 text-sm font-semibold text-[#8f1d2c] sm:inline-flex">
              {supportInfo.label}
            </span>

            <span className="rounded-xl border border-[#eadfd5] bg-white px-3 py-2 text-sm font-bold text-gray-600">
              {formatTime(elapsedSeconds)}
            </span>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6">

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)]">

          {/* =================================================
              LEFT — ĐỀ / BÀI THƠ
          ================================================== */}
          <section className="min-h-0 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5] lg:sticky lg:top-[88px] lg:h-[calc(100vh-108px)]">

            <div className="h-full overflow-y-auto">

              {/* TITLE */}
              <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-6 md:px-8">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a16207]">
                  VĂN BẢN ĐỌC HIỂU
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#7f1d2d]">
                  THU
                </h2>

                <p
                  className="mt-1 text-base italic text-gray-600"
                  style={{
                    fontFamily:
                      '"Times New Roman", Times, serif',
                  }}
                >
                  — Chế Lan Viên —
                </p>

              </div>

              {/* POEM */}
              <article className="px-6 py-8 md:px-10">

                <div
                  className="text-xl italic leading-[1.9] text-gray-900 md:text-[22px]"
                  style={{
                    fontFamily:
                      '"Times New Roman", Times, serif',
                  }}
                >

                  {poemStanzas.map(
                    (stanza, stanzaIndex) => (
                      <div
                        key={stanzaIndex}
                        className={
                          stanzaIndex <
                          poemStanzas.length - 1
                            ? "mb-8"
                            : ""
                        }
                      >
                        {stanza.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    ),
                  )}

                </div>

                {/* SOURCE */}
                <div
                  className="mt-8 border-t border-[#eadfd5] pt-5 text-sm leading-7 text-gray-500"
                  style={{
                    fontFamily:
                      '"Times New Roman", Times, serif',
                  }}
                >
                  <p>
                    <strong>Nguồn:</strong> {poem.source}
                  </p>

                  <p className="mt-2">
                    “Thu” còn được gọi là “Thu – bài thứ nhất”,
                    in trong <i>Điêu tàn</i> (1937).
                  </p>
                </div>

              </article>

            </div>
          </section>

          {/* =================================================
              RIGHT — CÂU HỎI
          ================================================== */}
          <section className="min-h-0 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5] lg:h-[calc(100vh-108px)]">

            <div className="flex h-full flex-col">

              {/* QUESTION HEADER */}
              <div className="shrink-0 border-b border-[#eadfd5] bg-white px-5 py-5 md:px-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                      BÀI KIỂM TRA 45 PHÚT
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-500">
                      Đã trả lời {answeredCount}/
                      {questions.length} câu
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Tổng điểm
                    </p>

                    <p className="text-lg font-black text-[#7f1d2d]">
                      10,0
                    </p>
                  </div>

                </div>

                {/* PROGRESS */}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#8f1d2c] transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>
                    Câu {currentIndex + 1}/
                    {questions.length}
                  </span>

                  <span>
                    {Math.round(progress)}%
                  </span>
                </div>

              </div>

              {/* QUESTION BODY */}
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-6">

                {/* QUESTION */}
                <div className="rounded-2xl bg-[#fff8ee] p-5 ring-1 ring-[#eadfd5]">

                  <div className="flex flex-wrap items-center gap-2">

                    <span className="rounded-lg bg-[#8f1d2c] px-3 py-1.5 text-sm font-bold text-white">
                      {currentQuestion.id}
                    </span>

                    <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-500 ring-1 ring-gray-200">
                      {currentQuestion.phase}
                    </span>

                    <span className="rounded-lg bg-[#f6eee6] px-3 py-1.5 text-xs font-bold text-[#7f1d2d]">
                      {currentQuestion.points} điểm
                    </span>

                  </div>

                  <h2 className="mt-4 text-lg font-bold leading-7 text-gray-900">
                    {currentQuestion.title}
                  </h2>

                </div>

                {/* HELP */}
                <div className="mt-4">

                  <button
                    type="button"
                    onClick={handleHelp}
                    className="flex w-full items-center justify-between rounded-2xl border border-[#eadfd5] bg-[#fffdf9] px-4 py-3 text-left text-sm font-semibold text-[#7f1d2d] hover:bg-[#fff8ee]"
                  >
                    <span>
                      💡 Yêu cầu hỗ trợ
                    </span>

                    <span className="text-xs text-gray-500">
                      {showHelp
                        ? "Ẩn gợi ý"
                        : "Xem gợi ý"}
                    </span>
                  </button>

                  {showHelp && (
                    <div className="mt-2 rounded-2xl bg-[#fff8ee] p-4 text-sm leading-6 text-gray-600 ring-1 ring-[#eadfd5]">

                      <p className="font-bold text-[#7f1d2d]">
                        Gợi ý:
                      </p>

                      <p className="mt-1">
                        Đọc kỹ câu hỏi, tìm từ khóa quan trọng
                        trong bài thơ và sử dụng dẫn chứng phù hợp.
                        Với câu hỏi phân tích, hãy trình bày theo
                        hướng: dẫn chứng → phân tích → nhận xét.
                      </p>

                      <p className="mt-2 text-xs font-semibold text-[#a16207]">
                        Mức hỗ trợ hiện tại:{" "}
                        {supportInfo.shortName}
                      </p>

                    </div>
                  )}

                </div>

                {/* ANSWER */}
                <div className="mt-5">

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-sm font-bold text-gray-800">
                      Câu trả lời của em
                    </label>

                    {currentQuestion.minWords && (
                      <span
                        className={`text-xs font-bold ${
                          wordCount >= 50 &&
                          wordCount <= 80
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {wordCount}/80 từ
                      </span>
                    )}

                  </div>

                  <textarea
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                    placeholder="Nhập câu trả lời của em..."
                    className="min-h-[320px] w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-4 text-[15px] leading-7 outline-none transition placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                  />

                  {currentQuestion.minWords && (
                    <p className="mt-2 text-xs text-gray-500">
                      Câu 13 yêu cầu bài viết từ{" "}
                      <strong>50–80 từ</strong>.
                    </p>
                  )}

                </div>

              </div>

              {/* NAVIGATION */}
              <div className="shrink-0 border-t border-[#eadfd5] bg-white px-5 py-4 md:px-6">

                <div className="flex items-center justify-between gap-3">

                  <button
                    type="button"
                    onClick={goPrevious}
                    disabled={currentIndex === 0}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Câu trước
                  </button>

                  {currentIndex <
                  questions.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="rounded-xl bg-[#8f1d2c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#741624]"
                    >
                      Câu tiếp theo →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="rounded-xl bg-[#8f1d2c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#741624]"
                    >
                      Nộp bài
                    </button>
                  )}

                </div>

                <p className="mt-3 text-center text-[11px] text-gray-400">
                  Bài làm sẽ được giáo viên chấm thủ công.
                </p>

              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
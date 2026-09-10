import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevelInfo, getSupportLevel, saveChallengeResult } from "./supportLevel"

const questions = [
  {
    label: "Câu 1",
    text: "Theo em, mùa thu thường gợi lên cho con người những cảm xúc gì?",
  },
  {
    label: "Câu 2",
    text: "Dựa vào nhan đề *Thu*, em hãy dự đoán nội dung chính của văn bản. Vì sao em dự đoán như vậy?",
  },
  {
    label: "Câu 3",
    text: "Em hãy đọc văn bản và xác định những từ ngữ, hình ảnh được sử dụng để khắc họa mùa thu.",
  },
  {
    label: "Câu 4",
    text: "Những từ ngữ, hình ảnh đó gợi cho em cảm nhận gì về bức tranh thiên nhiên mùa thu?",
  },
  {
    label: "Câu 5",
    text: "Em hãy xác định 01 biện pháp tu từ được sử dụng và phân tích tác dụng của biện pháp tu từ đó trong việc thể hiện cảm thức về thời gian của nhân vật trữ tình.",
  },
  {
    label: "Câu 6",
    text: "Em hãy xác định ý nghĩa tượng trưng của các hình ảnh *“hoa rạn vỡ”*, *“nét thơ xanh cũ”*, *“lá võ vàng”*, *“người quả phụ”* và cho biết mối liên hệ giữa những hình ảnh này.",
  },
  {
    label: "Câu 7",
    text: "Em hãy chỉ ra sự tương quan giác quan được sử dụng trong câu thơ *“Nắng hồng choàng ấp dãy bàng cao”* và phân tích tác dụng của nó đối với việc khắc họa cảnh sắc thiên nhiên mùa thu.",
  },
  {
    label: "Câu 8",
    text: "Dựa vào những chi tiết, từ ngữ biểu hiện tâm trạng, cảm xúc của chủ thể trữ tình, em có nhận xét như thế nào về sự vận động cảm xúc qua các khổ thơ? Qua mạch cảm xúc ấy, nhà thơ muốn gửi gắm suy ngẫm triết lý gì về con người và thời gian?",
  },
  {
    label: "Câu 9",
    text: "Em hãy cho biết cấu tứ của văn bản được tổ chức như thế nào?",
    extra: "Theo em, cách cấu tứ này có tác dụng gì trong việc thể hiện nỗi lòng của chủ thể trữ tình trong văn bản?",
  },
  {
    label: "Câu 10",
    text: "Nhận xét nhạc điệu của văn bản (gieo vần, ngắt nhịp,...). Nhạc điệu đó góp phần thể hiện cảm xúc và tâm trạng của chủ thể trữ tình như thế nào?",
  },
  {
    label: "Câu 11",
    text: "Sau khi đọc văn bản, em rút ra thông điệp gì? Thông điệp đó có tác động như thế nào đến suy nghĩ và cảm nhận của em về thời gian và cuộc sống?",
  },
  {
    label: "Câu 12",
    text: "Từ nỗ lực *“tìm”*, *“kiếm”* của nhân vật trữ tình trong *“những nét thơ xanh cũ / Trong những tờ thơ lá võ vàng”*, em có suy nghĩ gì về quan điểm: *“Sứ mệnh của nghệ thuật là lưu giữ những mảnh vỡ của cái đẹp đang tàn phai”*? Vì sao?",
  },
]

export default function Challenge() {
  const navigate = useNavigate()
  const level = getSupportLevel()
  const info = getLevelInfo(level)
  const startedAt = useRef(Date.now())
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(""))
  const [helpCount, setHelpCount] = useState(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const update = (value) => {
    setAnswers((items) =>
      items.map((item, index) => (index === current ? value : item)),
    )
  }

  const next = () => {
    if (!answers[current].trim()) {
      alert("Hãy hoàn thành câu trả lời trước khi tiếp tục.")
      return
    }

    if (current < questions.length - 1) {
      setCurrent((value) => value + 1)
      return
    }

    const elapsedSeconds = Math.max(
      0,
      Math.round((Date.now() - startedAt.current) / 1000),
    )

    saveChallengeResult({
      level,
      answers,
      helpCount,
      elapsedSeconds,
      submittedAt: new Date().toISOString(),
      status: "pending-research-confirmation",
    })

    navigate("/student/challenge-result")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      <header className="border-b border-[#eadfd5] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
            THỬ THÁCH CHUYỂN MỨC HỖ TRỢ
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#7f1d2d]">
            Bài thử thách
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {info.label} · bài kiểm tra chuyển mức · Câu {current + 1}/{questions.length}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <section className="mb-6 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#eadfd5]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#a16207]">
                ĐỀ KIỂM TRA NĂNG LỰC ĐẦU RA
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                THU
              </h2>
              <p className="mt-1 text-sm italic text-gray-500">
                Chế Lan Viên
              </p>
            </div>
            <span className="rounded-full bg-[#fff7e6] px-3 py-1 text-xs font-semibold text-[#a16207]">
              12 câu
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-[#d8c7b8] bg-[#fffdf9] p-6 text-center">
            <p className="text-sm font-semibold text-[#7f1d2d]">
              Nội dung bài thơ đang được cập nhật
            </p>
            <p className="mt-2 text-sm text-gray-500">
              [Team sẽ bổ sung nguyên văn bài thơ tại đây]
            </p>
          </div>
        </section>

        <div className="mb-6 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-[#8f1d2c] transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#eadfd5]">
          <p className="text-sm font-semibold text-[#a16207]">
            {questions[current].label}
          </p>

          <h2 className="mt-3 text-xl font-bold leading-8 text-gray-800">
            {questions[current].text}
          </h2>

          {questions[current].extra && (
            <p className="mt-4 text-base leading-7 text-gray-700">
              {questions[current].extra}
            </p>
          )}

          <textarea
            value={answers[current]}
            onChange={(event) => update(event.target.value)}
            rows={9}
            className="mt-6 w-full rounded-2xl border border-[#eadfd5] bg-[#fffdf9] p-4 outline-none focus:border-[#8f1d2c]"
            placeholder="Nhập câu trả lời của em..."
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fffaf2] p-4 ring-1 ring-[#eadfd5]">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Cần hỗ trợ?
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Số lần yêu cầu: {helpCount}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setHelpCount((value) => value + 1)}
              className="rounded-xl border border-[#d8c7b8] px-4 py-2 text-sm font-semibold text-[#7f1d2d] hover:bg-white"
            >
              Yêu cầu hỗ trợ
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-xs text-gray-400">
              Hệ thống ghi nhận thời gian và số lần yêu cầu hỗ trợ.
            </span>

            <button
              type="button"
              onClick={next}
              className="rounded-2xl bg-[#8f1d2c] px-7 py-3 font-semibold text-white hover:bg-[#741624]"
            >
              {current === questions.length - 1
                ? "Nộp bài"
                : "Câu tiếp theo"}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

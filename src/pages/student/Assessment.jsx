import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  saveInitialAssessment,
  calculateInitialAssessment,
} from "./supportLevel"

const sections = [
  {
    id: "TC1",
    title: "Tải nội tại",
    description: "Khó khăn trong việc xử lí nội dung và kiến thức của văn bản.",
    scale: [
      "Rất thấp",
      "Thấp",
      "Bình thường",
      "Cao",
      "Rất cao",
    ],
    questions: [
      {
        id: "NT1",
        text: "Khó khăn trong việc huy động kiến thức nền liên quan đến nội dung của văn bản.",
      },
      {
        id: "NT2",
        text: "Khó khăn khi chưa được gợi ý hay hướng dẫn trước, không có đủ kiến thức nền để tự đặt ra hướng tiếp cận bài thơ.",
      },
      {
        id: "NT3",
        text: "Khó khăn trong huy động kĩ năng, kinh nghiệm đọc để liên hệ, so sánh bài thơ các VB khác.",
      },
    ],
  },

  {
    id: "TC2",
    title: "Tải nội tại",
    description: "Khó khăn khi xử lí các tầng nghĩa và đặc điểm của bài thơ.",
    scale: [
      "Rất thấp",
      "Thấp",
      "Bình thường",
      "Cao",
      "Rất cao",
    ],
    questions: [
      {
        id: "NT4",
        text: "Khó khăn khi xử lí đồng thời nhiều tầng nghĩa (tả thực – biểu trưng – triết lí).",
      },
      {
        id: "NT5",
        text: "Khó khăn khi chuyển nghĩa từ nghĩa tả thực sang nghĩa biểu trưng.",
      },
      {
        id: "NT6",
        text: "Khó khăn khi phải xử lí các hình tượng đòi hỏi phải tổng hợp nhiều giác quan (thị giác, thính giác, xúc giác…).",
      },
      {
        id: "NT7",
        text: "Khó khăn khi xác định mối quan hệ giữa nhịp điệu, âm hưởng và hệ thống hình tượng.",
      },
      {
        id: "NT8",
        text: "Khó khăn khi xác định cảm xúc chủ đạo của bài thơ.",
      },
    ],
  },

  {
    id: "TC3",
    title: "Tải ngoại lai",
    description: "Những khó khăn xuất phát từ cách trình bày và tổ chức hoạt động học tập.",
    scale: [
      "Rất thấp",
      "Thấp",
      "Bình thường",
      "Cao",
      "Rất cao",
    ],
    questions: [
      {
        id: "NL1",
        text: "Khó khăn do GV trình bày đồng thời nhiều kênh thông tin (lời nói, bảng chiếu, phiếu học tập,…).",
      },
      {
        id: "NL2",
        text: "Khó khăn do GV trình bày nội dung dàn trải, không làm rõ trọng tâm.",
      },
      {
        id: "NL3",
        text: "Khó khăn do nội dung trình chiếu phân tán ở nhiều vị trí trên trang.",
      },
      {
        id: "NL4",
        text: "Khó khăn do GV viết bảng mà không kết hợp lời giảng.",
      },
      {
        id: "NL5",
        text: "Khó khăn do GV chuyển đổi hình thức hoạt động liên tục trong thời gian ngắn.",
      },
      {
        id: "NL6",
        text: "Khó khăn do GV sử dụng nhiều hiệu ứng, màu sắc, hình ảnh minh họa trong bài giảng.",
      },
      {
        id: "NL7",
        text: "Khó khăn do GV yêu cầu theo dõi và ghi chú nhiều thông tin cùng lúc.",
      },
      {
        id: "NL8",
        text: "Khó khăn do GV cung cấp nhiều chi tiết bên ngoài khi phân tích hình ảnh.",
      },
      {
        id: "NL9",
        text: "Khó khăn do GV giữ nguyên câu hỏi SGK mà không có hỗ trợ.",
      },
      {
        id: "NL10",
        text: "Khó khăn do GV khái quát ngay mà không hình thành kiến thức nền trước.",
      },
    ],
  },

  {
    id: "TC4",
    title: "Tải ngoại lai",
    description: "Ảnh hưởng từ môi trường và điều kiện học tập.",
    scale: [
      "Rất thấp",
      "Thấp",
      "Bình thường",
      "Cao",
      "Rất cao",
    ],
    questions: [
      {
        id: "NL11",
        text: "Khó khăn do ảnh hưởng của tiếng ồn.",
      },
      {
        id: "NL12",
        text: "Khó khăn do điều kiện ánh sáng không phù hợp.",
      },
      {
        id: "NL13",
        text: "Khó khăn do bố trí chỗ ngồi và không gian học tập.",
      },
      {
        id: "NL14",
        text: "Khó khăn do cơ sở vật chất và thiết bị lớp học.",
      },
    ],
  },

  {
    id: "TC5",
    title: "Tải ngoại lai",
    description: "Ảnh hưởng từ trạng thái cá nhân trong quá trình học.",
    scale: [
      "Rất thấp",
      "Thấp",
      "Bình thường",
      "Cao",
      "Rất cao",
    ],
    questions: [
      {
        id: "NL15",
        text: "Ảnh hưởng của tâm trạng, cảm xúc hiện tại đến quá trình học.",
      },
      {
        id: "NL16",
        text: "Ảnh hưởng của tình trạng sức khỏe cơ thể đến quá trình học.",
      },
    ],
  },

  {
    id: "TC6",
    title: "Tải liên quan",
    description: "Mức độ hứng thú khi tham gia và khám phá hoạt động đọc hiểu.",
    scale: [
      "Hoàn toàn không đúng",
      "Không đúng",
      "Phân vân",
      "Đúng",
      "Hoàn toàn đúng",
    ],
    questions: [
      {
        id: "LQ1",
        text: "Hứng thú khi tham gia hoạt động đọc hiểu thơ có YTTT.",
      },
      {
        id: "LQ2",
        text: "Hứng thú khi tự khám phá ý nghĩa hình ảnh/biểu tượng.",
      },
      {
        id: "LQ3",
        text: "Tò mò về nội dung, ý nghĩa bài thơ khi tiếp cận ban đầu.",
      },
    ],
  },

  {
    id: "TC7",
    title: "Tải liên quan",
    description: "Mức độ chủ động trong quá trình đọc và kiến tạo ý nghĩa.",
    scale: [
      "Không bao giờ",
      "Hiếm khi",
      "Bình thường",
      "Thường xuyên",
      "Rất thường xuyên",
    ],
    questions: [
      {
        id: "LQ4",
        text: "Chủ động hình dung bối cảnh, không gian, hình ảnh trong quá trình đọc.",
      },
      {
        id: "LQ5",
        text: "Chủ động suy luận từ ngữ/hình ảnh lạ hoá để làm rõ nghĩa tượng trưng.",
      },
      {
        id: "LQ6",
        text: "Chủ động liên hệ kiến thức nền để làm rõ ý nghĩa văn bản.",
      },
      {
        id: "LQ7",
        text: "Chủ động sử dụng sơ đồ/từ khóa để tổ chức mối quan hệ giữa các biểu tượng.",
      },
      {
        id: "LQ8",
        text: "Chủ động so sánh và điều chỉnh cách hiểu trong quá trình đọc.",
      },
      {
        id: "LQ9",
        text: "Chủ động đánh giá nội dung và ý nghĩa hình tượng sau khi đọc hiểu.",
      },
      {
        id: "LQ10",
        text: "Chủ động vận dụng kĩ năng đọc sang văn bản/trải nghiệm khác.",
      },
      {
        id: "LQ11",
        text: "Chủ động đặt câu hỏi để làm rõ nội dung chưa hiểu.",
      },
    ],
  },
]

function Assessment() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState({})

  const totalQuestions = sections.reduce(
    (total, section) => total + section.questions.length,
    0
  )

  const answeredQuestions = Object.keys(answers).length

  const handleAnswer = (questionId, value) => {
    setAnswers((current) => ({
      ...current,
      [questionId]: value,
    }))
  }

  const handleContinue = () => {
    if (answeredQuestions !== totalQuestions) return

    const result = calculateInitialAssessment(
      sections,
      answers
    )

    saveInitialAssessment(result)

    navigate("/student/assessment/reading")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-[#7f1d2d]">
              Luyện tập đọc hiểu thơ
            </h1>

            <p className="text-sm text-gray-500">
              Đánh giá ban đầu
            </p>
          </div>

          <div className="text-right">
            <span className="rounded-full bg-[#f8e9c8] px-4 py-2 text-sm font-semibold text-[#7f1d2d]">
              {answeredQuestions}/{totalQuestions}
            </span>

            <p className="mt-2 text-xs text-gray-500">
              Đã trả lời
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Tiêu đề */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#a16207]">
            Bước 1 / 2
          </p>

          <h2 className="text-3xl font-bold text-gray-800">
            Đánh giá tải nhận thức
          </h2>

          <p className="mt-3 max-w-3xl text-gray-600">
            Hãy đọc từng nhận định và chọn mức độ phù hợp nhất với
            trải nghiệm của bạn.
          </p>
        </div>

        {/* Các tiêu chí */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <section
              key={section.id}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]"
            >
              {/* Section header */}
              <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-6 md:px-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-[#8f1d2c] px-3 py-1 text-sm font-bold text-white">
                        {section.id}
                      </span>

                      <h3 className="text-xl font-bold text-[#7f1d2d]">
                        {section.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>

                  <span className="text-sm text-gray-400">
                    Tiêu chí {sectionIndex + 1}/7
                  </span>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-100">
                {section.questions.map((question) => (
                  <div
                    key={question.id}
                    className="px-6 py-7 md:px-8"
                  >
                    <div className="mb-5">
                      <span className="mr-3 font-bold text-[#a16207]">
                        {question.id}
                      </span>

                      <span className="text-base leading-7 text-gray-800">
                        {question.text}
                      </span>
                    </div>

                    {/* Answer options */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                      {section.scale.map((label, index) => {
                        const value = index + 1
                        const checked =
                          answers[question.id] === value

                        return (
                          <label
                            key={label}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={value}
                              checked={checked}
                              onChange={() =>
                                handleAnswer(
                                  question.id,
                                  value
                                )
                              }
                              className="sr-only"
                            />

                            <div
                              className={`min-h-[78px] rounded-xl border px-3 py-3 text-center transition ${
                                checked
                                  ? "border-[#8f1d2c] bg-[#8f1d2c] text-white shadow-sm"
                                  : "border-gray-200 bg-white text-gray-700 hover:border-[#b97878] hover:bg-[#fffaf7]"
                              }`}
                            >
                              <div className="text-lg font-bold">
                                {value}
                              </div>

                              <div className="mt-1 text-sm leading-5">
                                {label}
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-end gap-3">
          <p className="text-sm text-gray-500">
            Đã trả lời {answeredQuestions}/{totalQuestions} câu
          </p>

          <button
            type="button"
            disabled={answeredQuestions !== totalQuestions}
            onClick={handleContinue}
            className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
              answeredQuestions === totalQuestions
                ? "bg-[#8f1d2c] hover:bg-[#741624]"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Tiếp tục
          </button>
        </div>
      </main>
    </div>
  )
}

export default Assessment
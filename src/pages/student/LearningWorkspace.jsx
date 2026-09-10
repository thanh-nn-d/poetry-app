import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getLevelInfo,
  getSupportLevel,
  markTextCompleted,
} from "./supportLevel"

const poem = {
  id: "nguyet-cam",
  title: "Nguyệt Cầm",
  author: "Xuân Diệu",
  source:
    "In trong Gửi hương cho gió, NXB Hội Nhà văn, Hội Nghiên cứu – Giảng dạy văn học, Thành phố Hồ Chí Minh, 1992, tr. 77",
}

const poemStanzas = [
  [
    "Trăng nhập vào đây cung nguyệt lạnh,",
    "Trăng thương, trăng nhớ, hỡi trăng ngàn.",
    "Đàn buồn, đàn lặng, ôi đàn chậm!",
    "Mỗi giọt rơi tàn như lệ ngân.",
  ],
  [
    "Mây vắng, trời trong, đêm thủy tinh;",
    "Linh lung bóng sáng bỗng rung mình",
    "Vì nghe nương tử trong câu hát",
    "Đã chết đêm rằm theo nước xanh.",
  ],
  [
    "Thu lạnh càng thêm nguyệt tỏ ngời,",
    "Đàn ghê như nước, lạnh, trời ơi...",
    "Long lanh tiếng sỏi vang vang hận.",
    "Trăng nhớ Tầm Dương, nhạc nhớ người.",
  ],
  [
    "Bốn bề ánh nhạc: biển pha lê",
    "Chiếc đảo hồn tôi rợn bốn bề.",
    "Sương bạc làm thinh, khuya nín thở",
    "Nghe sầu âm nhạc đến sao Khuê.",
  ],
]

const activities = [
  {
    id: 1,
    title:
      "Tìm hiểu đặc sắc từ ngữ, hình ảnh qua sự tương giao cảm giác",
    shortTitle: "Tương giao cảm giác",
  },
  {
    id: 2,
    title: "Tìm hiểu yếu tố tượng trưng",
    shortTitle: "Yếu tố tượng trưng",
  },
  {
    id: 3,
    title: "Tìm hiểu nhạc điệu",
    shortTitle: "Nhạc điệu",
  },
  {
    id: 4,
    title:
      "Tìm hiểu tình cảm, cảm xúc của chủ thể trữ tình",
    shortTitle: "Cảm xúc",
  },
  {
    id: 5,
    title: "Tìm hiểu về cấu tứ",
    shortTitle: "Cấu tứ",
  },
]

const sensoryTargets = [
  "… giọt rơi tàn như lệ ngân",
  "… bóng sáng bỗng rung mình",
  "Long lanh tiếng sỏi…",
  "… ánh nhạc: biển pha lê …",
]

const highlightedLines = [
  "Trăng nhập vào đây cung nguyệt lạnh",
  "Trăng thương / trăng nhớ / hỡi trăng ngàn",
  "Đàn buồn / đàn lặng / ôi đàn chậm!",
  "Mỗi giọt rơi tàn / như lệ ngân",
  "Long lanh tiếng sỏi…",
  "… ánh nhạc: biển pha lê …",
]

const activityPrompts = {
  1: {
    1: [
      "Đọc lại văn bản và tìm những từ ngữ, hình ảnh gợi ánh sáng, màu sắc, đường nét mà em có thể cảm nhận bằng mắt; đồng thời tìm những từ ngữ, hình ảnh gợi âm thanh, tiếng đàn, nhạc điệu mà em có thể cảm nhận bằng tai.",
      "Từ những trường hợp đã xác định, phân tích sự kết hợp giữa thị giác và thính giác. Em có thể bắt đầu từ bốn hình ảnh: “giọt rơi tàn như lệ ngân”, “bóng sáng bỗng rung mình”, “Long lanh tiếng sỏi…”, “… ánh nhạc: biển pha lê …”.",
      "Sự hòa quyện giữa ánh sáng và âm thanh làm cho thế giới trong bài thơ trở nên như thế nào? Từ đó, em cảm nhận gì về thế giới nghệ thuật và tâm trạng của chủ thể trữ tình?",
      "Từ mối quan hệ giữa “Nguyệt” và “Cầm”, hãy giải thích ý nghĩa nhan đề Nguyệt Cầm.",
    ],
    2: [
      "Xác định những hình ảnh trong đó cảm giác về ánh sáng/trăng và âm thanh/âm nhạc được kết hợp với nhau. Ghi lại hình ảnh và khổ thơ tương ứng.",
      "Với các hình ảnh đã xác định, phân tích hình ảnh gợi ánh sáng/trăng và hình ảnh gợi âm nhạc/đàn.",
      "Nhận xét hiệu quả biểu đạt của thủ pháp tương giao giác quan đối với thế giới nghệ thuật và cảm xúc trong bài thơ.",
      "Từ những khám phá về ánh sáng/trăng và âm nhạc/âm thanh, hãy lí giải ý nghĩa nhan đề Nguyệt Cầm.",
    ],
    3: [
      "Xác định những từ ngữ, hình ảnh được diễn tả bằng sự kết hợp hoặc chuyển đổi giữa các giác quan và cho biết chúng xuất hiện ở khổ thơ nào.",
      "Phân tích sự tương giao giác quan trong các trường hợp tiêu biểu; làm rõ sự kết hợp giữa các cảm giác qua từ ngữ, hình ảnh của câu thơ.",
      "Phân tích ý nghĩa và tác dụng nghệ thuật của sự kết hợp giữa các cảm giác trong bài thơ.",
      "Sau khi đọc và phân tích bài thơ, hãy cho biết ý nghĩa nhan đề Nguyệt Cầm và lí giải bằng những phát hiện từ văn bản.",
    ],
  },

  2: {
    1: [
      "Đọc lại bài thơ và tìm những từ ngữ, hình ảnh được sử dụng nổi bật hoặc có cách diễn đạt đặc biệt, ngoài ý nghĩa trực tiếp còn có thể gợi ra những liên tưởng hoặc ý nghĩa khác.",
      "Dựa vào chú thích và những từ ngữ, hình ảnh xung quanh để xác định liên tưởng và lí giải ý nghĩa tượng trưng của hình ảnh trong Nguyệt Cầm.",
      "Từ những hình ảnh đã phân tích, khái quát những ý nghĩa tượng trưng nổi bật và mối liên hệ của chúng trong việc thể hiện thế giới nghệ thuật, cảm xúc, tâm trạng hoặc suy ngẫm của chủ thể trữ tình.",
    ],
    2: [
      "Xác định các hình ảnh được đặt trong mối quan hệ đặc biệt với những từ ngữ hoặc hình ảnh khác trong bài thơ.",
      "Với hình ảnh người phụ nữ ở khổ 2, bến Tầm Dương ở khổ 3 và sao Khuê ở khổ 4, hãy làm rõ nghĩa thực, liên tưởng được gợi ra và ý nghĩa tượng trưng.",
      "Các hình ảnh tượng trưng có mối quan hệ như thế nào? Sự kết hợp của chúng góp phần thể hiện cảm xúc, tâm trạng hoặc tư tưởng gì của chủ thể trữ tình?",
    ],
    3: [
      "Xác định những hình ảnh có khả năng gợi mở lớp nghĩa liên tưởng bên cạnh ý nghĩa trực tiếp và ghi lại vị trí của chúng.",
      "Phân tích lớp nghĩa tượng trưng bằng cách làm rõ mối quan hệ giữa ý nghĩa trực tiếp, liên tưởng và ý nghĩa của hình ảnh trong chỉnh thể bài thơ.",
      "Từ những hình ảnh đã phân tích, khái quát ý nghĩa của hệ thống hình ảnh tượng trưng trong Nguyệt Cầm.",
    ],
  },

  3: {
    1: [
      "Theo dõi hướng dẫn để xác định cách ngắt nhịp và phối hợp thanh điệu trong bài thơ.",
      "Xác định cách ngắt nhịp, phối hợp thanh điệu ở các câu thơ; sau đó khái quát đặc điểm chung.",
      "Từ nhịp, thanh điệu và liên tưởng đến tiếng đàn, hãy khái quát vai trò của nhạc điệu trong việc tạo âm hưởng và thể hiện cảm xúc của Nguyệt Cầm.",
    ],
    2: [
      "Đọc lại bài thơ và xác định cách ngắt nhịp, sự phối hợp thanh điệu trong các câu thơ; từ đó khái quát chung.",
      "Cách ngắt nhịp và phối hợp thanh điệu giúp em hình dung như thế nào về tiếng đàn nguyệt trong đêm lạnh?",
      "Từ nhịp, thanh điệu và liên tưởng về tiếng đàn nguyệt, hãy khái quát vai trò của nhạc điệu trong việc tạo âm hưởng và thể hiện cảm xúc.",
    ],
    3: [
      "Tự xác định cách ngắt nhịp và sự phối hợp thanh điệu trong bài thơ; từ đó khái quát đặc điểm chung.",
      "Từ những đặc điểm về nhịp và thanh điệu, trình bày những liên tưởng của em về tiếng đàn nguyệt trong đêm lạnh.",
      "Khái quát vai trò của nhạc điệu trong Nguyệt Cầm đối với âm hưởng, không gian nghệ thuật và cảm xúc của bài thơ.",
    ],
  },

  4: {
    1: [
      "Xác định chủ thể trữ tình của bài thơ. Cho biết các cảm giác “lạnh”, “rung mình”, “ghê như nước”, “rợn” là cảm giác của ai và được gợi ra từ đâu.",
      "Theo dõi sự vận động của cảm xúc qua khổ 1, khổ 2 và 3, khổ 4. Ghi lại chi tiết thể hiện cảm xúc và cảm xúc tương ứng.",
      "Từ những cảm xúc và sự vận động của chúng, khái quát tình cảm, thái độ chủ đạo của chủ thể trữ tình.",
    ],
    2: [
      "Xác định chủ thể trữ tình, đối tượng hướng tới và hoàn cảnh làm nảy sinh cảm xúc.",
      "Theo dõi diễn biến của mạch thơ để xác định sự thay đổi trong cảm xúc của chủ thể trữ tình khi cảm nhận tiếng đàn.",
      "Khái quát tình cảm, cảm xúc chủ đạo của chủ thể trữ tình và nhận xét cách bài thơ thể hiện cảm xúc ấy.",
    ],
    3: [
      "Tự xác định cảm xúc được thể hiện trong từng khổ thơ và chỉ ra những từ ngữ, hình ảnh làm căn cứ.",
      "Phân tích sự vận động của cảm xúc từ đầu đến cuối bài thơ.",
      "Viết một đoạn ngắn trình bày cảm nhận của em về cảm xúc chủ đạo của chủ thể trữ tình trong Nguyệt Cầm.",
    ],
  },

  5: {
    1: [
      "Xác định tứ thơ và những hình ảnh chính được tổ chức xoay quanh trăng, đàn, âm nhạc và không gian đêm lạnh.",
      "Theo dõi sự vận động của hình ảnh và cảm xúc từ khổ đầu đến khổ cuối; ghi lại sự thay đổi nổi bật.",
      "Từ cách tổ chức hình ảnh và mạch cảm xúc, khái quát cấu tứ của bài thơ.",
    ],
    2: [
      "Xác định ý tưởng hoặc hình ảnh trung tâm chi phối việc tổ chức bài thơ.",
      "Theo dõi sự vận động của mạch cảm xúc và mối quan hệ giữa trăng, đàn, âm nhạc, không gian.",
      "Từ đó, trình bày cách cấu tứ góp phần thể hiện chủ đề và tư tưởng của bài thơ.",
    ],
    3: [
      "Phân tích cách bài thơ tổ chức toàn bộ hệ thống hình ảnh, âm thanh, ánh sáng và không gian từ đầu đến cuối.",
      "Giải thích vì sao tiếng đàn lại được hòa quyện với trăng, nước, ánh sáng, sương và không gian nghệ thuật trong bài thơ.",
      "Khái quát cấu tứ, chủ đề và tư tưởng của Nguyệt Cầm; làm rõ sự thống nhất giữa cấu tứ và cảm xúc của chủ thể trữ tình.",
    ],
  },
}

const supportHints = {
  1: [
    "Đọc từng câu thơ chậm và gạch chân từ ngữ quan trọng.",
    "Có thể bắt đầu từ những hình ảnh đã được hệ thống gợi ý.",
    "Trả lời từng bước, không cần viết hoàn chỉnh ngay từ đầu.",
  ],
  2: [
    "Xác định chi tiết nổi bật trước, sau đó mới phân tích mối quan hệ giữa chúng.",
    "Có thể quay lại văn bản để kiểm tra từ ngữ làm căn cứ.",
    "Tập trung vào mối quan hệ giữa hình ảnh và cảm xúc.",
  ],
  3: [
    "Tự lựa chọn chi tiết làm căn cứ cho lập luận.",
    "Có thể tổ chức câu trả lời theo cấu trúc: phát hiện → phân tích → nhận xét.",
    "Ưu tiên giải thích bằng dẫn chứng trực tiếp từ văn bản.",
  ],
}

export default function LearningWorkspace() {
  const navigate = useNavigate()

  const supportLevel = getSupportLevel()
  const supportInfo = getLevelInfo(supportLevel)

  const [activeActivity, setActiveActivity] = useState(1)
  const [completedActivities, setCompletedActivities] = useState([])
  const [answers, setAnswers] = useState({})
  const [selectedTargets, setSelectedTargets] = useState([])
  const [note, setNote] = useState("")
  const [showNoteBox, setShowNoteBox] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      "nguyetCamLearningAnswers",
      JSON.stringify(answers),
    )
  }, [answers])

  const currentActivity =
    activities.find((item) => item.id === activeActivity) ||
    activities[0]

  const progress = useMemo(
    () =>
      Math.round(
        (completedActivities.length / activities.length) * 100,
      ),
    [completedActivities.length],
  )

  const updateAnswer = (activityId, stepIndex, value) => {
    setAnswers((current) => ({
      ...current,
      [`${activityId}-${supportLevel}-${stepIndex}`]: value,
    }))
  }

  const getAnswer = (activityId, stepIndex) =>
    answers[`${activityId}-${supportLevel}-${stepIndex}`] || ""

  const toggleTarget = (target) => {
    setSelectedTargets((current) =>
      current.includes(target)
        ? current.filter((item) => item !== target)
        : [...current, target],
    )
  }

  const handleCompleteActivity = () => {
    if (activeActivity === 1 && selectedTargets.length === 0) {
      alert(
        "Hãy chọn ít nhất một hình ảnh/từ ngữ để bắt đầu phân tích.",
      )
      return
    }

    const prompts =
      activityPrompts[activeActivity]?.[supportLevel] || []

    const hasAnswer = prompts.some((_, index) =>
      getAnswer(activeActivity, index).trim(),
    )

    if (!hasAnswer) {
      alert(
        "Hãy hoàn thành ít nhất một phần trả lời trước khi tiếp tục.",
      )
      return
    }

    setCompletedActivities((current) =>
      current.includes(activeActivity)
        ? current
        : [...current, activeActivity],
    )

    if (activeActivity < activities.length) {
      setActiveActivity(activeActivity + 1)
      setSelectedTargets([])

      setTimeout(() => {
        document
          .getElementById(`activity-${activeActivity + 1}`)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
      }, 100)
    }
  }

  const handleActivityChange = (activityId) => {
    if (
      activityId > 1 &&
      !completedActivities.includes(activityId - 1)
    ) {
      return
    }

    setActiveActivity(activityId)
    setSelectedTargets([])

    setTimeout(() => {
      document
        .getElementById(`activity-${activityId}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
    }, 100)
  }

  const handleFinish = () => {
    markTextCompleted(
      poem.id,
      Math.max(
        0,
        Math.round(
          (Date.now() -
            Number(
              localStorage.getItem("learningStartedAt") ||
                Date.now(),
            )) /
            1000,
        ),
      ),
    )

    localStorage.setItem(
      "nguyetCamLearningSummary",
      JSON.stringify({
        textId: poem.id,
        title: poem.title,
        supportLevel,
        completedActivities,
        answers,
        selectedTargets,
        note,
        completedAt: new Date().toISOString(),
      }),
    )

    navigate("/student/summary")
  }

  const prompts =
    activityPrompts[activeActivity]?.[supportLevel] || []

  const hints = supportHints[supportLevel] || supportHints[1]

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-gray-800">
      <header className="sticky top-0 z-30 border-b border-[#eadfd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a16207]">
              LUYỆN TẬP ĐỌC HIỂU THƠ
            </p>
            <h1 className="mt-1 text-xl font-bold text-[#7f1d2d]">
              Nguyệt Cầm
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-xl bg-[#fff8ee] px-3 py-2 text-sm font-semibold text-[#8f1d2c] sm:inline-flex">
              {supportInfo.label} · {supportInfo.shortName}
            </span>

            <button
              type="button"
              onClick={() => navigate("/student/texts")}
              className="rounded-xl border border-[#eadfd5] bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-[#fff8ee]"
            >
              Văn bản
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                MỨC HỖ TRỢ HIỆN TẠI
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-800">
                {supportInfo.label} — {supportInfo.shortName}
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500">
                {supportInfo.description}
              </p>
            </div>

            <div className="min-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Tiến độ luyện tập</span>
                <span>{progress}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#8f1d2c] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_390px]">
          <aside className="h-fit rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#eadfd5] lg:sticky lg:top-28">
            <p className="px-2 text-xs font-bold uppercase tracking-wide text-[#a16207]">
              Hoạt động
            </p>

            <div className="mt-3 space-y-2">
              {activities.map((activity) => {
                const isActive =
                  activity.id === activeActivity

                const isCompleted =
                  completedActivities.includes(activity.id)

                const isLocked =
                  activity.id > 1 &&
                  !completedActivities.includes(
                    activity.id - 1,
                  )

                return (
                  <button
                    key={activity.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() =>
                      handleActivityChange(activity.id)
                    }
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-[#8f1d2c] text-white"
                        : isLocked
                          ? "cursor-not-allowed bg-gray-50 text-gray-300"
                          : "bg-white text-gray-700 hover:bg-[#fff8ee]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-white/15 text-white"
                          : isCompleted
                            ? "bg-[#f6eee6] text-[#8f1d2c]"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted ? "✓" : activity.id}
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {activity.shortTitle}
                      </p>

                      <p
                        className={`mt-0.5 text-xs ${
                          isActive
                            ? "text-white/70"
                            : "text-gray-400"
                        }`}
                      >
                        Hoạt động {activity.id}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          <section className="rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">
            <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-6 text-center md:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a16207]">
                ĐỌC VĂN BẢN
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#7f1d2d]">
                NGUYỆT CẦM
              </h2>

              <p
                className="mt-1 text-base italic text-gray-600"
                style={{
                  fontFamily:
                    '"Times New Roman", Times, serif',
                }}
              >
                - Xuân Diệu -
              </p>
            </div>

            <div className="px-6 py-8 md:px-10">
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

                <div className="mt-8 border-t border-[#eadfd5] pt-5 text-right text-[15px] leading-7 not-italic text-gray-600">
                  {poem.source}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Những câu thơ / hình ảnh được sử dụng trong nhiệm vụ
                </p>

                <div className="mt-3 space-y-2">
                  {highlightedLines.map((line) => (
                    <p
                      key={line}
                      className="rounded-xl bg-[#fffdf9] px-4 py-2 text-base italic leading-7 text-gray-800 ring-1 ring-[#eadfd5]"
                      style={{
                        fontFamily:
                          '"Times New Roman", Times, serif',
                      }}
                    >
                      “{line}”
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-[#eadfd5] pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-gray-500">
                    Em có thể ghi chú trong quá trình đọc.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setShowNoteBox((current) => !current)
                    }
                    className="rounded-lg bg-[#f6eee6] px-3 py-1.5 text-xs font-semibold text-[#7f1d2d]"
                  >
                    {showNoteBox
                      ? "Ẩn ghi chú"
                      : "Ghi chú"}
                  </button>
                </div>

                {showNoteBox && (
                  <textarea
                    value={note}
                    onChange={(event) =>
                      setNote(event.target.value)
                    }
                    rows={4}
                    placeholder="Ghi lại điều em chú ý trong văn bản..."
                    className="mt-3 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#8f1d2c]"
                  />
                )}
              </div>
            </div>
          </section>

          <aside className="h-fit space-y-4 lg:sticky lg:top-28">
            <div
              id={`activity-${currentActivity.id}`}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-lg bg-[#8f1d2c] px-2.5 py-1 text-xs font-bold text-white">
                  Hoạt động {currentActivity.id}
                </span>

                <span className="text-xs font-medium text-gray-400">
                  {completedActivities.includes(
                    currentActivity.id,
                  )
                    ? "Đã hoàn thành"
                    : "Đang thực hiện"}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-bold leading-7 text-gray-800">
                {currentActivity.title}
              </h2>

              <div className="mt-4 rounded-2xl bg-[#fff8ee] p-4 ring-1 ring-[#eadfd5]">
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  {supportInfo.label} ·{" "}
                  {supportInfo.shortName}
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {supportInfo.description}
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                Nhiệm vụ
              </p>

              {activeActivity === 1 && (
                <>
                  <p className="mt-3 text-sm font-semibold leading-6 text-gray-800">
                    Chọn những hình ảnh trong bài thơ mà em muốn phân tích.
                  </p>

                  <div className="mt-3 space-y-2">
                    {sensoryTargets.map((target) => (
                      <button
                        key={target}
                        type="button"
                        onClick={() =>
                          toggleTarget(target)
                        }
                        className={`w-full rounded-xl border px-3 py-2 text-left text-sm italic transition ${
                          selectedTargets.includes(
                            target,
                          )
                            ? "border-[#8f1d2c] bg-[#f6eee6] text-[#7f1d2d]"
                            : "border-gray-200 bg-white text-gray-600 hover:border-[#d8b6a4]"
                        }`}
                      >
                        <span className="mr-2">
                          {selectedTargets.includes(
                            target,
                          )
                            ? "✓"
                            : "○"}
                        </span>
                        “{target}”
                      </button>
                    ))}
                  </div>

                  {selectedTargets.length > 0 && (
                    <div className="mt-4 rounded-2xl bg-[#fffaf2] p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                        Hình ảnh đã chọn
                      </p>

                      <ul className="mt-2 space-y-1 text-xs leading-5 text-gray-600">
                        {selectedTargets.map(
                          (target) => (
                            <li key={target}>
                              • {target}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}

              <div className="mt-5 space-y-5">
                {prompts.map((prompt, index) => (
                  <div
                    key={`${activeActivity}-${supportLevel}-${index}`}
                  >
                    <p className="text-sm font-bold leading-6 text-gray-800">
                      Bước {index + 1}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {prompt}
                    </p>

                    <textarea
                      value={getAnswer(
                        activeActivity,
                        index,
                      )}
                      onChange={(event) =>
                        updateAnswer(
                          activeActivity,
                          index,
                          event.target.value,
                        )
                      }
                      rows={5}
                      placeholder="Viết câu trả lời của em..."
                      className="mt-2 w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-[#fff8ee] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[#a16207]">
                  Gợi ý hỗ trợ
                </p>

                <ul className="mt-2 space-y-2 text-xs leading-5 text-gray-600">
                  {hints.map((hint) => (
                    <li key={hint}>• {hint}</li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={handleCompleteActivity}
                className="mt-5 w-full rounded-2xl bg-[#8f1d2c] px-5 py-3 font-semibold text-white transition hover:bg-[#741624]"
              >
                {activeActivity === activities.length
                  ? "Hoàn thành luyện tập"
                  : "Hoàn thành hoạt động"}
              </button>
            </div>
          </aside>
        </div>

        {completedActivities.length === activities.length && (
          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-bold text-gray-800">
                  Em đã hoàn thành 5 hoạt động
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Hãy chuyển sang bước tiếp theo để xem kết quả luyện tập.
                </p>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="rounded-2xl bg-[#8f1d2c] px-7 py-3.5 font-semibold text-white transition hover:bg-[#741624]"
              >
                Xem kết quả
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLevelInfo, getSupportLevel, saveLearningProgress, markTextCompleted } from "./supportLevel"

// =========================================================
// DỮ LIỆU VĂN BẢN
// =========================================================

const poem = {
  title: "Buồn mưa đêm",
  author: "Huy Cận",
}

// =========================================================
// 5 HOẠT ĐỘNG
// =========================================================

const activities = [
  {
    id: 1,
    title: "Tìm hiểu đặc sắc từ ngữ, hình ảnh qua sự tương giao cảm giác",
    shortTitle: "Tìm hiểu đặc sắc từ ngữ, hình ảnh qua sự tương giao cảm giác",
    description:
      "Phân tích từ ngữ, hình ảnh qua đặc điểm cảm giác/giác quan và giá trị biểu đạt.",
  },
  {
    id: 2,
    title: "Tìm hiểu yếu tố tượng trưng",
    shortTitle: "Tượng trưng",
    description:
      "Khám phá ý nghĩa trực tiếp, liên tưởng và ý nghĩa tượng trưng của hình ảnh, từ ngữ.",
  },
  {
    id: 3,
    title: "Tìm hiểu nhạc điệu",
    shortTitle: "Tìm hiểu nhạc điệu",
    description:
      "Nhận diện và phân tích nhịp, vần, âm thanh và sự lặp lại trong bài thơ.",
  },
  {
    id: 4,
    title: "Tìm hiểu tình cảm, cảm xúc của chủ thể trữ tình",
    shortTitle: "Cảm xúc",
    description:
      "Xác định chủ thể trữ tình, bằng chứng cảm xúc và sự vận động của cảm xúc.",
  },
  {
    id: 5,
    title: "Tìm hiểu cấu tứ",
    shortTitle: "Tìm hiểu cấu tứ",
    description:
      "Tổng hợp dòng chảy cảm xúc, sự phát triển của hình ảnh và cấu trúc tổ chức bài thơ.",
  },
]

const module1Targets = [
  {
    id: "troi-nang-nang",
    label: "trời nằng nặng",
    senses: ["thính giác", "xúc giác"],
  },
  {
    id: "buon-buon",
    label: "nghe ta buồn buồn",
    senses: ["thính giác", "cảm xúc"],
  },
  {
    id: "hoi-may-hiu-hat",
    label: "Hơi may hiu hắt",
    senses: ["xúc giác"],
  },
  {
    id: "giot-nhe",
    label: "giọt nhẹ",
    senses: ["thính giác", "xúc giác"],
  },
  {
    id: "loi-vu-vo",
    label: "nối lời vu vơ",
    senses: ["thính giác", "cảm xúc"],
  },
]

// =========================================================
// COMPONENT
// =========================================================

function LearningWorkspace() {
  const navigate = useNavigate()
  const supportLevel = getSupportLevel()
  const supportInfo = getLevelInfo(supportLevel)

  const [activeActivity, setActiveActivity] = useState(1)

  const [completedActivities, setCompletedActivities] =
    useState(() => {
      try {
        const saved = JSON.parse(localStorage.getItem("currentTextActivities") || "[]")
        return Array.isArray(saved) ? saved : []
      } catch {
        return []
      }
    })

  const [answer, setAnswer] = useState("")

  const [note, setNote] = useState("")

  const [showNoteBox, setShowNoteBox] = useState(false)

  // =========================================================
  // HOẠT ĐỘNG 1 - TƯƠNG GIAO CẢM GIÁC
  // =========================================================

  const [selectedTarget, setSelectedTarget] = useState(null)
  const [selectedSenses, setSelectedSenses] = useState([])
  const [analysisReason, setAnalysisReason] = useState("")
  const [expressionEffect, setExpressionEffect] = useState("")
  const [savedAnalyses, setSavedAnalyses] = useState([])

  const senseOptions = [
    "thị giác",
    "thính giác",
    "khứu giác",
    "xúc giác",
    "vị giác",
  ]

  // =========================================================
  // HOẠT ĐỘNG HIỆN TẠI
  // =========================================================

  const currentActivity = activities.find(
    (activity) =>
      activity.id === activeActivity
  )

  // =========================================================
  // TIẾN ĐỘ
  // =========================================================

  const progress =
    (completedActivities.length /
      activities.length) *
    100

  // Lưu tiến độ các thao tác của văn bản hiện tại.
  // Dữ liệu này dùng lại cho trang tổng kết và hồ sơ học tập.
  const saveCurrentProgress = (nextCompletedActivities) => {
    localStorage.setItem(
      "currentTextActivities",
      JSON.stringify(nextCompletedActivities)
    )

    saveLearningProgress({
      currentTextId: (() => {
        try {
          return JSON.parse(localStorage.getItem("currentText") || "null")?.id || null
        } catch {
          return null
        }
      })(),
      currentActivities: nextCompletedActivities,
    })
  }

  // =========================================================
  // THAO TÁC PHÂN TÍCH HOẠT ĐỘNG 1
  // =========================================================

  const handleSelectTarget = (target) => {
    setSelectedTarget(target)

    const existing = savedAnalyses.find(
      (item) => item.targetId === target.id
    )

    if (existing) {
      setSelectedSenses(existing.senses)
      setAnalysisReason(existing.reason)
      setExpressionEffect(existing.effect)
    } else {
      setSelectedSenses([])
      setAnalysisReason("")
      setExpressionEffect("")
    }
  }

  const handleToggleSense = (sense) => {
    setSelectedSenses((current) =>
      current.includes(sense)
        ? current.filter((item) => item !== sense)
        : [...current, sense]
    )
  }

  const handleSaveAnalysis = () => {
    if (!selectedTarget) {
      alert("Hãy chọn một từ ngữ hoặc hình ảnh trong bài thơ.")
      return
    }

    if (selectedSenses.length === 0) {
      alert("Hãy chọn ít nhất một giác quan mà em nhận diện được.")
      return
    }

    if (!analysisReason.trim()) {
      alert("Hãy ghi căn cứ cho lựa chọn của em.")
      return
    }

    if (!expressionEffect.trim()) {
      alert("Hãy nêu cảm nhận về hiệu quả biểu đạt.")
      return
    }

    setSavedAnalyses((current) => {
      const next = current.filter(
        (item) => item.targetId !== selectedTarget.id
      )

      return [
        ...next,
        {
          targetId: selectedTarget.id,
          targetLabel: selectedTarget.label,
          senses: selectedSenses,
          reason: analysisReason.trim(),
          effect: expressionEffect.trim(),
        },
      ]
    })

    alert("Đã lưu phân tích của em.")
  }

  // =========================================================
  // HOÀN THÀNH HOẠT ĐỘNG
  // =========================================================

  const handleCompleteActivity = () => {
    if (activeActivity === 1) {
      if (savedAnalyses.length === 0) {
        alert("Hãy hoàn thành ít nhất một phân tích trước khi tiếp tục.")
        return
      }
    } else if (!answer.trim()) {
      alert("Hãy hoàn thành câu trả lời trước khi tiếp tục.")
      return
    }

    const nextCompleted = completedActivities.includes(activeActivity)
      ? completedActivities
      : [...completedActivities, activeActivity]

    setCompletedActivities(nextCompleted)
    saveCurrentProgress(nextCompleted)
    setAnswer("")

    if (activeActivity < activities.length) {
      setActiveActivity(activeActivity + 1)
      setSelectedTarget(null)
      setSelectedSenses([])
      setAnalysisReason("")
      setExpressionEffect("")
      window.setTimeout(() => {
        document.getElementById(`activity-${activeActivity + 1}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }
  }

  // =========================================================
  // CHUYỂN HOẠT ĐỘNG
  // =========================================================

  const handleActivityChange = (activityId) => {
    if (activityId > 1) {
      const previousCompleted =
        completedActivities.includes(
          activityId - 1
        )

      if (!previousCompleted) {
        return
      }
    }

    setActiveActivity(activityId)
    setAnswer("")

    if (activityId !== 1) {
      setSelectedTarget(null)
      setSelectedSenses([])
      setAnalysisReason("")
      setExpressionEffect("")
    }

    setTimeout(() => {
      document
        .getElementById(
          `activity-${activityId}`
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
    }, 100)
  }

  // =========================================================
  // HOÀN THÀNH TOÀN BỘ
  // =========================================================

  const handleFinish = () => {
    const currentText = (() => {
      try {
        return JSON.parse(localStorage.getItem("currentText") || "null")
      } catch {
        return null
      }
    })()

    if (!currentText?.id) {
      alert("Không xác định được văn bản hiện tại.")
      return
    }

    const startedAt = Number(localStorage.getItem("learningStartedAt") || Date.now())
    const elapsedSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000))

    saveCurrentProgress(completedActivities)
    markTextCompleted(currentText.id, elapsedSeconds)
    navigate("/student/summary")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#eadfd5] bg-white/95 backdrop-blur">

        <div className="mx-auto max-w-7xl px-6 py-4">

          <div className="flex items-center justify-between gap-6">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                Không gian học tập
              </p>

              <h1 className="mt-1 text-xl font-bold text-[#7f1d2d]">
                {poem.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {poem.author}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#ead7c8] bg-[#fffaf3] px-3 py-1.5 text-xs font-semibold text-[#7f1d2d]">
                <span>Mức hỗ trợ {supportLevel}</span>
                <span className="font-normal text-gray-500">· {supportInfo.shortName}</span>
              </div>

            </div>

            {/* TIẾN ĐỘ */}

            <div className="hidden min-w-[220px] sm:block">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs font-medium text-gray-500">
                  Tiến độ luyện tập
                </span>

                <span className="text-xs font-bold text-[#7f1d2d]">
                  {completedActivities.length}/
                  {activities.length}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                <div
                  className="h-full rounded-full bg-[#8f1d2c] transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-6">

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_300px]">

          {/* =================================================
              LEFT - 5 HOẠT ĐỘNG
          ================================================= */}

          <aside className="h-fit rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#eadfd5] lg:sticky lg:top-28">

            <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-400">
              Hoạt động
            </p>

            <div className="space-y-2">

              {activities.map((activity) => {

                const isActive =
                  activeActivity === activity.id

                const isCompleted =
                  completedActivities.includes(
                    activity.id
                  )

                const isLocked =
                  activity.id > 1 &&
                  !completedActivities.includes(
                    activity.id - 1
                  )

                return (
                  <button
                    key={activity.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() =>
                      handleActivityChange(
                        activity.id
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                      isActive
                        ? "bg-[#8f1d2c] text-white"
                        : isLocked
                          ? "cursor-not-allowed opacity-40"
                          : "text-gray-700 hover:bg-[#faf8f3]"
                    }`}
                  >

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        isActive
                          ? "bg-white/15 text-white"
                          : isCompleted
                            ? "bg-green-50 text-green-600"
                            : "bg-[#f6eee6] text-[#7f1d2d]"
                      }`}
                    >
                      {isCompleted
                        ? "✓"
                        : activity.id}
                    </span>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold">
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

          {/* =================================================
              CENTER - VĂN BẢN
          ================================================= */}

          <section className="rounded-3xl bg-white shadow-sm ring-1 ring-[#eadfd5]">

            {/* =================================================
                TIÊU ĐỀ VĂN BẢN
            ================================================= */}

            <div className="border-b border-[#eadfd5] bg-[#fffdf9] px-6 py-6 text-center md:px-8">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a16207]">
                ĐỌC VĂN BẢN
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#7f1d2d]">
                BUỒN MƯA ĐÊM
              </h2>

              <p
                className="mt-1 text-base italic text-gray-600"
                style={{
                  fontFamily:
                    '"Times New Roman", Times, serif',
                }}
              >
                - Huy Cận -
              </p>

            </div>

            {/* =================================================
                NỘI DUNG VĂN BẢN
            ================================================= */}

            <div className="px-6 py-10 md:px-12">

              <div className="mx-auto max-w-4xl">

                {/* =================================================
                    BÀI THƠ
                ================================================= */}

                <div
                  className="text-[24px] italic leading-[1.65] text-gray-900"
                  style={{
                    fontFamily:
                      '"Times New Roman", Times, serif',
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
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectTarget(
                            module1Targets.find(
                              (item) => item.id === "troi-nang-nang"
                            )
                          )
                        }
                        className={`rounded px-1 transition ${
                          selectedTarget?.id === "troi-nang-nang"
                            ? "bg-[#f4dfb2] text-[#7f1d2d]"
                            : "font-bold hover:bg-[#fff0d2]"
                        }`}
                      >
                        trời nằng nặng
                      </button>
                      , nghe{" "}
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectTarget(
                            module1Targets.find(
                              (item) => item.id === "buon-buon"
                            )
                          )
                        }
                        className={`rounded px-1 transition ${
                          selectedTarget?.id === "buon-buon"
                            ? "bg-[#f4dfb2] text-[#7f1d2d]"
                            : "hover:bg-[#fff0d2]"
                        }`}
                      >
                        ta buồn buồn
                      </button>
                      .
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
                      Trăm muôn{" "}
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectTarget(
                            module1Targets.find(
                              (item) => item.id === "giot-nhe"
                            )
                          )
                        }
                        className={`rounded px-1 transition ${
                          selectedTarget?.id === "giot-nhe"
                            ? "bg-[#f4dfb2] text-[#7f1d2d]"
                            : "hover:bg-[#fff0d2]"
                        }`}
                      >
                        giọt nhẹ
                      </button>
                      {" "}nối{" "}
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectTarget(
                            module1Targets.find(
                              (item) => item.id === "loi-vu-vo"
                            )
                          )
                        }
                        className={`rounded px-1 transition ${
                          selectedTarget?.id === "loi-vu-vo"
                            ? "bg-[#f4dfb2] text-[#7f1d2d]"
                            : "hover:bg-[#fff0d2]"
                        }`}
                      >
                        lời vu vơ
                      </button>
                      ...
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
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectTarget(
                            module1Targets.find(
                              (item) => item.id === "hoi-may-hiu-hat"
                            )
                          )
                        }
                        className={`rounded px-1 transition ${
                          selectedTarget?.id === "hoi-may-hiu-hat"
                            ? "bg-[#f4dfb2] text-[#7f1d2d]"
                            : "hover:bg-[#fff0d2]"
                        }`}
                      >
                        Hơi may hiu hắt
                      </button>
                      {" "}bốn bề tâm tư…
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                CÔNG CỤ
            ================================================= */}

            <div className="border-t border-[#eadfd5] bg-[#fffdf9] px-6 py-4 md:px-10">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <p className="text-xs text-gray-500">
                  Em có thể ghi chú trong quá trình đọc.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowNoteBox(
                      !showNoteBox
                    )
                  }
                  className="rounded-lg bg-[#f6eee6] px-3 py-1.5 text-xs font-semibold text-[#7f1d2d] transition hover:bg-[#f0e3da]"
                >
                  {showNoteBox
                    ? "Ẩn ghi chú"
                    : "Ghi chú"}
                </button>

              </div>

            </div>

            {/* =================================================
                GHI CHÚ
            ================================================= */}

            {showNoteBox && (
              <div className="border-t border-[#eadfd5] bg-[#fffdf9] px-6 py-5 md:px-10">

                <label className="text-sm font-bold text-gray-700">
                  Ghi chú của em
                </label>

                <textarea
                  value={note}
                  onChange={(event) =>
                    setNote(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Ghi lại điều em chú ý trong văn bản..."
                  className="mt-3 w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                />

              </div>
            )}

          </section>

          {/* =================================================
              RIGHT - NHIỆM VỤ
          ================================================= */}

          <aside className="h-fit space-y-4 lg:sticky lg:top-28">

            {/* =================================================
                HOẠT ĐỘNG HIỆN TẠI
            ================================================= */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">

              <div className="flex items-center justify-between">

                <span className="rounded-lg bg-[#8f1d2c] px-2.5 py-1 text-xs font-bold text-white">
                  Hoạt động {currentActivity.id}
                </span>

                <span className="text-xs font-medium text-gray-400">
                  {completedActivities.includes(
                    currentActivity.id
                  )
                    ? "Đã hoàn thành"
                    : "Đang thực hiện"}
                </span>

              </div>

              <h2 className="mt-4 text-lg font-bold text-gray-800">
                {currentActivity.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {currentActivity.description}
              </p>

            </div>

            {/* =================================================
                NHIỆM VỤ / ANALYSIS CARD
            ================================================= */}

            {activeActivity === 1 ? (
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">

                <div className="flex items-center justify-between gap-3">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                      Analysis Card
                    </p>

                    <h3 className="mt-2 font-bold leading-6 text-gray-800">
                      Phân tích tương giao cảm giác
                    </h3>
                  </div>

                  <span className="rounded-lg bg-[#f6eee6] px-2.5 py-1 text-xs font-semibold text-[#7f1d2d]">
                    {savedAnalyses.length} đã lưu
                  </span>

                </div>

                {!selectedTarget ? (
                  <div className="mt-5 rounded-2xl bg-[#fff8ee] p-4 ring-1 ring-[#eadfd5]">

                    <p className="text-sm font-semibold leading-6 text-gray-800">
                      Hãy chọn một từ ngữ hoặc hình ảnh trong bài thơ để bắt đầu phân tích.
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Em có thể chọn các chi tiết gợi cảm giác mà em muốn tiếp tục tìm hiểu.
                    </p>

                  </div>
                ) : (
                  <>
                    <div className="mt-5 rounded-2xl bg-[#fff8ee] p-4 ring-1 ring-[#eadfd5]">

                      <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                        Chi tiết đang phân tích
                      </p>

                      <p
                        className="mt-2 text-lg font-bold italic text-[#7f1d2d]"
                        style={{
                          fontFamily:
                            '"Times New Roman", Times, serif',
                        }}
                      >
                        “{selectedTarget.label}”
                      </p>

                    </div>

                    <div className="mt-5">

                      <p className="text-sm font-bold text-gray-800">
                        1. Em nhận diện những giác quan nào?
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Chọn các giác quan mà em cho rằng có liên quan đến cách diễn đạt này.
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">

                        {senseOptions.map((sense) => {
                          const selected =
                            selectedSenses.includes(sense)

                          return (
                            <button
                              key={sense}
                              type="button"
                              onClick={() =>
                                handleToggleSense(sense)
                              }
                              className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                                selected
                                  ? "border-[#8f1d2c] bg-[#f6eee6] text-[#7f1d2d]"
                                  : "border-gray-200 bg-white text-gray-600 hover:border-[#d8b6a4]"
                              }`}
                            >
                              <span className="mr-1.5">
                                {selected ? "✓" : "○"}
                              </span>
                              {sense}
                            </button>
                          )
                        })}

                      </div>

                    </div>

                    <div className="mt-5">

                      <p className="text-sm font-bold text-gray-800">
                        2. Căn cứ của em
                      </p>

                      <textarea
                        value={analysisReason}
                        onChange={(event) =>
                          setAnalysisReason(
                            event.target.value
                          )
                        }
                        rows={4}
                        placeholder="Em dựa vào từ ngữ, hình ảnh hoặc dấu hiệu nào trong đoạn thơ?"
                        className="mt-2 w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                      />

                    </div>

                    <div className="mt-5">

                      <p className="text-sm font-bold text-gray-800">
                        3. Hiệu quả biểu đạt
                      </p>

                      <textarea
                        value={expressionEffect}
                        onChange={(event) =>
                          setExpressionEffect(
                            event.target.value
                          )
                        }
                        rows={4}
                        placeholder="Theo em, cách diễn đạt này góp phần thể hiện hình tượng, cảm xúc hoặc ý nghĩa gì?"
                        className="mt-2 w-full resize-y rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-3 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/10"
                      />

                    </div>

                    <button
                      type="button"
                      onClick={handleSaveAnalysis}
                      className="mt-5 w-full rounded-2xl bg-[#8f1d2c] px-5 py-3 font-semibold text-white transition hover:bg-[#741624]"
                    >
                      Lưu phân tích
                    </button>

                  </>
                )}

                <div className="mt-5 border-t border-[#eadfd5] pt-4">

                  <p className="text-xs leading-5 text-gray-500">
                    Hệ thống không đưa đáp án trực tiếp. Em hãy dựa vào bằng chứng trong văn bản để tự giải thích.
                  </p>

                </div>

              </div>
            ) : (
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">

                <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                  Nhiệm vụ
                </p>

                <h3 className="mt-3 font-semibold leading-6 text-gray-800">
                  Nội dung chi tiết của hoạt động này sẽ được triển khai ở bước tiếp theo.
                </h3>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  [CẦN XÁC NHẬN VỚI NHÓM NGHIÊN CỨU]
                </p>

              </div>
            )}

            <button
              type="button"
              onClick={handleCompleteActivity}
              disabled={completedActivities.includes(currentActivity.id)}
              className={`w-full rounded-2xl px-5 py-3 font-semibold transition ${
                completedActivities.includes(currentActivity.id)
                  ? "cursor-default bg-green-50 text-green-700"
                  : "bg-[#8f1d2c] text-white hover:bg-[#741624]"
              }`}
            >
              {completedActivities.includes(currentActivity.id)
                ? "Đã hoàn thành hoạt động"
                : activeActivity === 1
                  ? "Hoàn thành hoạt động 1"
                  : `Hoàn thành hoạt động ${activeActivity}`}
            </button>

            {/* =================================================
                MỨC HỖ TRỢ
            ================================================= */}

            <div className="rounded-3xl bg-[#fff8ee] p-5 ring-1 ring-[#eadfd5]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                    Mức hỗ trợ
                  </p>

                  <p className="mt-1 font-bold text-[#7f1d2d]">
                    {supportInfo.label}
                  </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4dfb2] text-sm font-bold text-[#7f1d2d]">
                  2
                </div>

              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Em có thể sử dụng các gợi ý được cung cấp
                trong quá trình thực hiện nhiệm vụ.
              </p>

            </div>

          </aside>

        </div>

        {/* =====================================================
            HOÀN THÀNH
        ===================================================== */}

        {completedActivities.length ===
          activities.length && (
          <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eadfd5]">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="font-bold text-gray-800">
                  Em đã hoàn thành 5 hoạt động
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Hãy chuyển sang bước tiếp theo để
                  xem kết quả luyện tập.
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

export default LearningWorkspace
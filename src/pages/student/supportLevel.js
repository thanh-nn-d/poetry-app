// src/pages/student/supportLevel.js

export const SUPPORT_LEVELS = {
    1: {
      level: 1,
      label: "Mức 1",
      shortName: "Hỗ trợ cao",
      description:
        "Hệ thống cung cấp nhiều câu hỏi dẫn dắt, gợi ý và hướng dẫn từng bước.",
    },
    2: {
      level: 2,
      label: "Mức 2",
      shortName: "Hỗ trợ vừa",
      description:
        "Hệ thống giảm số lượng câu hỏi dẫn dắt và chỉ cung cấp gợi ý khi học sinh cần.",
    },
    3: {
      level: 3,
      label: "Mức 3",
      shortName: "Hỗ trợ thấp",
      description:
        "Học sinh chủ động thực hiện nhiệm vụ; hệ thống chủ yếu phản hồi sau khi hoàn thành.",
    },
  }
  
  const KEYS = {
    level: "supportLevel",
    assessment: "poetry_initial_assessment",
    records: "learningRecords",
    progress: "poetry_learning_progress",
    currentText: "currentText",
    challenge: "challengeResult",
  }
  
  export function getLevelInfo(level = getSupportLevel()) {
    return SUPPORT_LEVELS[level] || SUPPORT_LEVELS[1]
  }
  
  export function getSupportLevel() {
    const value = Number(localStorage.getItem(KEYS.level))
    return [1, 2, 3].includes(value) ? value : 1
  }
  
  export function setSupportLevel(level) {
    const value = Number(level)
    const normalized = [1, 2, 3].includes(value) ? value : 1
  
    localStorage.setItem(KEYS.level, String(normalized))
    return normalized
  }
  
  /**
   * Chính thức khi có dữ liệu chuẩn hóa:
   * E = (Zp - Zr) / 2
   *
   * E >= 0.5  -> Mức 3
   * -0.5 < E < 0.5 -> Mức 2
   * E <= -0.5 -> Mức 1
   */
  export function calculateSupportLevel(E) {
    if (typeof E !== "number" || Number.isNaN(E)) {
      return 1
    }
  
    if (E >= 0.5) return 3
    if (E > -0.5 && E < 0.5) return 2
    return 1
  }
  
  /**
   * Tính 7 tiêu chí từ 35 câu trả lời.
   * TC6 và TC7 được đảo chiều: 6 - điểm gốc.
   */
  export function calculateInitialAssessment(sections, answers) {
    const criteria = sections.map((section) => {
      const values = section.questions.map(
        (question) => Number(answers[question.id])
      )
  
      const rawMean =
        values.reduce((sum, value) => sum + value, 0) /
        values.length
  
      const isReverse =
        section.id === "TC6" ||
        section.id === "TC7"
  
      const score = isReverse
        ? 6 - rawMean
        : rawMean
  
      return {
        id: section.id,
        title: section.title,
        rawMean: Number(rawMean.toFixed(2)),
        score: Number(score.toFixed(2)),
        reversed: isReverse,
      }
    })
  
    const totalCognitiveLoad =
      criteria.reduce(
        (sum, criterion) => sum + criterion.score,
        0
      ) / criteria.length
  
    /*
     * Khi chưa có mẫu tham chiếu đủ để chuẩn hóa Zp/Zr,
     * tạm dùng điểm tải nhận thức tổng hợp để xác định
     * mức hỗ trợ ban đầu.
     *
     * 1.00–2.33 -> tải thấp -> Mức 3
     * 2.34–3.66 -> tải trung bình -> Mức 2
     * 3.67–5.00 -> tải cao -> Mức 1
     */
    let provisionalSupportLevel = 1
  
    if (totalCognitiveLoad <= 2.33) {
      provisionalSupportLevel = 3
    } else if (totalCognitiveLoad <= 3.66) {
      provisionalSupportLevel = 2
    }
  
    setSupportLevel(provisionalSupportLevel)
  
    return {
      answers,
      criteria,
      totalCognitiveLoad: Number(
        totalCognitiveLoad.toFixed(2)
      ),
      provisionalSupportLevel,
      normalizationStatus: "not_available",
      E: null,
      completedAt: new Date().toISOString(),
    }
  }
  
  export function promoteSupportLevel() {
    return setSupportLevel(
      Math.min(3, getSupportLevel() + 1)
    )
  }
  
  export function getNextSupportLevel(currentLevel, passed) {
    if (!passed) {
      return Number(currentLevel) || 1
    }
  
    return Math.min(
      3,
      (Number(currentLevel) || 1) + 1
    )
  }
  
  export function saveInitialAssessment(data) {
    localStorage.setItem(
      KEYS.assessment,
      JSON.stringify(data)
    )
  
    if (data?.provisionalSupportLevel) {
      setSupportLevel(data.provisionalSupportLevel)
    }
  }
  
  export function loadInitialAssessment() {
    try {
      return JSON.parse(
        localStorage.getItem(KEYS.assessment) || "null"
      )
    } catch {
      return null
    }
  }
  
  export function loadLearningRecords() {
    try {
      const data = JSON.parse(
        localStorage.getItem(KEYS.records) || "[]"
      )
  
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  }
  
  export function saveLearningRecord(record) {
    const records = loadLearningRecords()
  
    const saved = {
      ...record,
      createdAt: new Date().toISOString(),
    }
  
    records.push(saved)
  
    localStorage.setItem(
      KEYS.records,
      JSON.stringify(records)
    )
  
    return saved
  }
  
  export function loadLearningProgress() {
    try {
      return {
        completedTexts: [],
        currentTextId: null,
        totalStudyTime: 0,
        ...(JSON.parse(
          localStorage.getItem(KEYS.progress) || "{}"
        )),
      }
    } catch {
      return {
        completedTexts: [],
        currentTextId: null,
        totalStudyTime: 0,
      }
    }
  }
  
  export function saveLearningProgress(updates) {
    const current = loadLearningProgress()
  
    const next = {
      ...current,
      ...updates,
    }
  
    localStorage.setItem(
      KEYS.progress,
      JSON.stringify(next)
    )
  
    return next
  }
  
  export function markTextCompleted(textId, elapsedSeconds = 0) {
    const progress = loadLearningProgress()
  
    const completedTexts = Array.isArray(
      progress.completedTexts
    )
      ? [...progress.completedTexts]
      : []
  
    if (!completedTexts.includes(textId)) {
      completedTexts.push(textId)
    }
  
    const next = saveLearningProgress({
      completedTexts,
      currentTextId: textId,
      totalStudyTime:
        Number(progress.totalStudyTime || 0) +
        Number(elapsedSeconds || 0),
    })
  
    saveLearningRecord({
      type: "text",
      textId,
      elapsedSeconds: Number(elapsedSeconds || 0),
    })
  
    return next
  }
  
  export function getCompletedTextCount() {
    return loadLearningProgress().completedTexts.length
  }
  
  export function saveChallengeResult(result) {
    sessionStorage.setItem(
      KEYS.challenge,
      JSON.stringify(result)
    )
  
    return result
  }
  
  export function loadChallengeResult() {
    try {
      return JSON.parse(
        sessionStorage.getItem(KEYS.challenge) || "null"
      )
    } catch {
      return null
    }
  }
  
  export function clearChallengeResult() {
    sessionStorage.removeItem(KEYS.challenge)
  }
  
  export function clearAllLearningData() {
    Object.values(KEYS).forEach((key) => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
  }
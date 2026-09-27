// src/pages/student/supportLevel.js

import { getCurrentUser } from "../../auth"

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

/*
 * =====================================================
 * TÀI KHOẢN DEMO
 * =====================================================
 *
 * hocsinh:
 * - Chưa làm bài test
 * - Không có assessment giả
 * - Mặc định Mức 1 – Hỗ trợ cao
 *
 * hocsinh3:
 * - Được dùng để demo tài khoản đã hoàn thành test
 * - Mức 3 – Hỗ trợ thấp
 */

const DEMO_INITIAL_STATES = {
  hocsinh3: {
    level: 3,
    totalCognitiveLoad: 1.8,
  },
}

/*
 * =====================================================
 * XÁC ĐỊNH DỮ LIỆU THEO TÀI KHOẢN
 * =====================================================
 */

function getCurrentUserScope() {
  const user = getCurrentUser()

  return String(
    user?.id ||
      user?.username ||
      "guest"
  )
}

function getScopedKey(key) {
  return `${key}_${getCurrentUserScope()}`
}

/*
 * =====================================================
 * RESET DỮ LIỆU CŨ CỦA ACCOUNT HOCSINH
 * =====================================================
 *
 * Trước đây hocsinh từng được tạo assessment demo.
 * Vì vậy trình duyệt có thể vẫn còn dữ liệu cũ trong
 * localStorage.
 *
 * Hàm này chỉ chạy một lần cho hocsinh để xóa dữ liệu
 * test cũ và đưa tài khoản về trạng thái "chưa test".
 */

function clearLegacyUntestedDemoData() {
  const user = getCurrentUser()

  if (
    !user ||
    user.role !== "student" ||
    user.username?.toLowerCase() !== "hocsinh"
  ) {
    return
  }

  const migrationKey =
    "poetry_demo_hocsinh_reset_v1"

  if (
    localStorage.getItem(migrationKey)
  ) {
    return
  }

  // Xóa assessment cũ
  localStorage.removeItem(
    getScopedKey(KEYS.assessment)
  )

  // Xóa mức hỗ trợ cũ
  localStorage.removeItem(
    getScopedKey(KEYS.level)
  )

  localStorage.setItem(
    migrationKey,
    "true"
  )
}

/*
 * =====================================================
 * DEMO INITIAL ASSESSMENT
 * =====================================================
 */

function getDemoInitialAssessment() {
  const user = getCurrentUser()

  if (
    !user ||
    user.role !== "student"
  ) {
    return null
  }

  const username =
    user.username?.toLowerCase()

  const demo =
    DEMO_INITIAL_STATES[username]

  if (!demo) {
    return null
  }

  return {
    answers: {},

    criteria: [],

    totalCognitiveLoad:
      demo.totalCognitiveLoad,

    provisionalSupportLevel:
      demo.level,

    normalizationStatus:
      "demo",

    E: null,

    completedAt:
      "2026-09-10T00:00:00.000Z",
  }
}

/*
 * =====================================================
 * TẠO ASSESSMENT DEMO
 * =====================================================
 */

function ensureDemoInitialAssessment() {
  const demo =
    getDemoInitialAssessment()

  if (!demo) {
    return null
  }

  const assessmentKey =
    getScopedKey(KEYS.assessment)

  /*
   * Nếu account đã có assessment,
   * không ghi đè dữ liệu hiện tại.
   */
  if (
    localStorage.getItem(
      assessmentKey
    )
  ) {
    return null
  }

  localStorage.setItem(
    assessmentKey,
    JSON.stringify(demo)
  )

  localStorage.setItem(
    getScopedKey(KEYS.level),
    String(
      demo.provisionalSupportLevel
    )
  )

  return demo
}

/*
 * =====================================================
 * THÔNG TIN MỨC HỖ TRỢ
 * =====================================================
 */

export function getLevelInfo(
  level = getSupportLevel()
) {
  return (
    SUPPORT_LEVELS[level] ||
    SUPPORT_LEVELS[1]
  )
}

/*
 * =====================================================
 * MỨC HỖ TRỢ HIỆN TẠI
 * =====================================================
 */

export function getSupportLevel() {
  /*
   * Trước tiên xử lý dữ liệu cũ của hocsinh.
   */
  clearLegacyUntestedDemoData()

  /*
   * Nếu là account demo đã được cấu hình
   * thì tạo assessment demo.
   *
   * Hiện tại chỉ có hocsinh3 nằm trong
   * DEMO_INITIAL_STATES.
   */
  const demo =
    ensureDemoInitialAssessment()

  if (demo) {
    return demo.provisionalSupportLevel
  }

  /*
   * Nếu chưa có assessment:
   * mặc định Mức 1 – Hỗ trợ cao.
   */
  const assessment =
    loadInitialAssessment()

  if (!assessment) {
    return 1
  }

  const value = Number(
    localStorage.getItem(
      getScopedKey(KEYS.level)
    )
  )

  return [1, 2, 3].includes(value)
    ? value
    : 1
}

/*
 * =====================================================
 * SET MỨC HỖ TRỢ
 * =====================================================
 */

export function setSupportLevel(level) {
  const value = Number(level)

  const normalized =
    [1, 2, 3].includes(value)
      ? value
      : 1

  localStorage.setItem(
    getScopedKey(KEYS.level),
    String(normalized)
  )

  return normalized
}

/*
 * =====================================================
 * TÍNH MỨC HỖ TRỢ TỪ E
 * =====================================================
 *
 * Chính thức khi có dữ liệu chuẩn hóa:
 *
 * E = (Zp - Zr) / 2
 *
 * E >= 0.5
 *   -> Mức 3
 *
 * -0.5 < E < 0.5
 *   -> Mức 2
 *
 * E <= -0.5
 *   -> Mức 1
 */

export function calculateSupportLevel(E) {
  if (
    typeof E !== "number" ||
    Number.isNaN(E)
  ) {
    return 1
  }

  if (E >= 0.5) {
    return 3
  }

  if (
    E > -0.5 &&
    E < 0.5
  ) {
    return 2
  }

  return 1
}

/*
 * =====================================================
 * TEST ĐẦU VÀO
 * =====================================================
 *
 * Tính 7 tiêu chí từ 35 câu trả lời.
 *
 * TC6 và TC7 được đảo chiều:
 *
 * điểm đảo chiều = 6 - điểm gốc
 */

export function calculateInitialAssessment(
  sections,
  answers
) {
  const criteria =
    sections.map((section) => {
      const values =
        section.questions.map(
          (question) =>
            Number(
              answers[question.id]
            )
        )

      const rawMean =
        values.reduce(
          (sum, value) =>
            sum + value,
          0
        ) / values.length

      const isReverse =
        section.id === "TC6" ||
        section.id === "TC7"

      const score =
        isReverse
          ? 6 - rawMean
          : rawMean

      return {
        id: section.id,

        title: section.title,

        rawMean: Number(
          rawMean.toFixed(2)
        ),

        score: Number(
          score.toFixed(2)
        ),

        reversed: isReverse,
      }
    })

  const totalCognitiveLoad =
    criteria.reduce(
      (sum, criterion) =>
        sum + criterion.score,
      0
    ) / criteria.length

  /*
   * =================================================
   * TRIỂN KHAI MVP
   * =================================================
   *
   * 1.00–2.33
   * -> tải thấp
   * -> Mức 3
   *
   * 2.34–3.66
   * -> tải trung bình
   * -> Mức 2
   *
   * 3.67–5.00
   * -> tải cao
   * -> Mức 1
   */

  let provisionalSupportLevel = 1

  if (
    totalCognitiveLoad <= 2.33
  ) {
    provisionalSupportLevel = 3
  } else if (
    totalCognitiveLoad <= 3.66
  ) {
    provisionalSupportLevel = 2
  }

  setSupportLevel(
    provisionalSupportLevel
  )

  return {
    answers,

    criteria,

    totalCognitiveLoad:
      Number(
        totalCognitiveLoad.toFixed(2)
      ),

    provisionalSupportLevel,

    normalizationStatus:
      "not_available",

    E: null,

    completedAt:
      new Date().toISOString(),
  }
}

/*
 * =====================================================
 * ĐIỀU CHỈNH MỨC HỖ TRỢ
 * =====================================================
 */

export function promoteSupportLevel() {
  return setSupportLevel(
    Math.min(
      3,
      getSupportLevel() + 1
    )
  )
}

export function getNextSupportLevel(
  currentLevel,
  passed
) {
  if (!passed) {
    return (
      Number(currentLevel) ||
      1
    )
  }

  return Math.min(
    3,
    (
      Number(currentLevel) ||
      1
    ) + 1
  )
}

/*
 * =====================================================
 * LƯU / ĐỌC TEST ĐẦU VÀO
 * =====================================================
 */

export function saveInitialAssessment(
  data
) {
  localStorage.setItem(
    getScopedKey(
      KEYS.assessment
    ),
    JSON.stringify(data)
  )

  if (
    data?.provisionalSupportLevel
  ) {
    setSupportLevel(
      data.provisionalSupportLevel
    )
  }
}

export function loadInitialAssessment() {
  /*
   * Đảm bảo hocsinh được reset khỏi
   * dữ liệu assessment demo cũ.
   */
  clearLegacyUntestedDemoData()

  /*
   * Chỉ tạo assessment tự động cho
   * các account có trong DEMO_INITIAL_STATES.
   *
   * Hiện tại là hocsinh3.
   */
  ensureDemoInitialAssessment()

  try {
    return JSON.parse(
      localStorage.getItem(
        getScopedKey(
          KEYS.assessment
        )
      ) || "null"
    )
  } catch {
    return null
  }
}

/*
 * =====================================================
 * LEARNING RECORDS
 * =====================================================
 */

export function loadLearningRecords() {
  try {
    const data =
      JSON.parse(
        localStorage.getItem(
          getScopedKey(
            KEYS.records
          )
        ) || "[]"
      )

    return Array.isArray(data)
      ? data
      : []
  } catch {
    return []
  }
}

export function saveLearningRecord(
  record
) {
  const records =
    loadLearningRecords()

  const saved = {
    ...record,

    createdAt:
      new Date().toISOString(),
  }

  records.push(saved)

  localStorage.setItem(
    getScopedKey(
      KEYS.records
    ),
    JSON.stringify(records)
  )

  return saved
}

/*
 * =====================================================
 * LEARNING PROGRESS
 * =====================================================
 */

export function loadLearningProgress() {
  try {
    return {
      completedTexts: [],

      currentTextId: null,

      totalStudyTime: 0,

      ...(
        JSON.parse(
          localStorage.getItem(
            getScopedKey(
              KEYS.progress
            )
          ) || "{}"
        )
      ),
    }
  } catch {
    return {
      completedTexts: [],

      currentTextId: null,

      totalStudyTime: 0,
    }
  }
}

export function saveLearningProgress(
  updates
) {
  const current =
    loadLearningProgress()

  const next = {
    ...current,
    ...updates,
  }

  localStorage.setItem(
    getScopedKey(
      KEYS.progress
    ),
    JSON.stringify(next)
  )

  return next
}

export function markTextCompleted(
  textId,
  elapsedSeconds = 0
) {
  const progress =
    loadLearningProgress()

  const completedTexts =
    Array.isArray(
      progress.completedTexts
    )
      ? [
          ...progress.completedTexts,
        ]
      : []

  if (
    !completedTexts.includes(
      textId
    )
  ) {
    completedTexts.push(textId)
  }

  const next =
    saveLearningProgress({
      completedTexts,

      currentTextId: textId,

      totalStudyTime:
        Number(
          progress.totalStudyTime ||
            0
        ) +
        Number(
          elapsedSeconds || 0
        ),
    })

  saveLearningRecord({
    type: "text",

    textId,

    elapsedSeconds:
      Number(
        elapsedSeconds || 0
      ),
  })

  return next
}

export function getCompletedTextCount() {
  return loadLearningProgress()
    .completedTexts.length
}

/*
 * =====================================================
 * CHALLENGE
 * =====================================================
 */

export function saveChallengeResult(
  result
) {
  sessionStorage.setItem(
    getScopedKey(
      KEYS.challenge
    ),
    JSON.stringify(result)
  )

  return result
}

export function loadChallengeResult() {
  try {
    return JSON.parse(
      sessionStorage.getItem(
        getScopedKey(
          KEYS.challenge
        )
      ) || "null"
    )
  } catch {
    return null
  }
}

export function clearChallengeResult() {
  sessionStorage.removeItem(
    getScopedKey(
      KEYS.challenge
    )
  )
}

/*
 * =====================================================
 * XÓA DỮ LIỆU HỌC TẬP
 * =====================================================
 */

export function clearAllLearningData() {
  Object.values(KEYS).forEach(
    (key) => {
      localStorage.removeItem(
        getScopedKey(key)
      )

      sessionStorage.removeItem(
        getScopedKey(key)
      )
    }
  )

  /*
   * Dọn dữ liệu cũ dùng chung từ
   * phiên bản trước.
   */
  Object.values(KEYS).forEach(
    (key) => {
      localStorage.removeItem(key)

      sessionStorage.removeItem(key)
    }
  )
}
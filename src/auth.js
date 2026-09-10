const ACCOUNTS_KEY = "poetry_app_accounts"
const CURRENT_USER_KEY = "poetry_app_current_user"

const DEFAULT_ACCOUNTS = [
  {
    id: "demo-student",
    fullName: "Học sinh mẫu",
    username: "hocsinh",
    password: "123456",
    role: "student",
  },
  {
    id: "demo-teacher",
    fullName: "Giáo viên mẫu",
    username: "giaovien",
    password: "123456",
    role: "teacher",
  },
]

function readAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)

    if (raw) {
      return JSON.parse(raw)
    }
  } catch {
    // Nếu dữ liệu localStorage bị lỗi,
    // hệ thống sẽ sử dụng tài khoản mẫu.
  }

  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(DEFAULT_ACCOUNTS),
  )

  return DEFAULT_ACCOUNTS
}

export function getAccounts() {
  return readAccounts()
}

export function registerAccount({
  fullName,
  username,
  password,
  role,
}) {
  const accounts = readAccounts()
  const normalizedUsername = username.trim().toLowerCase()

  const existed = accounts.some(
    (account) =>
      account.username.toLowerCase() === normalizedUsername,
  )

  if (existed) {
    return {
      success: false,
      message: "Tên đăng nhập đã tồn tại.",
    }
  }

  const account = {
    id: `account-${Date.now()}`,
    fullName: fullName.trim(),
    username: normalizedUsername,
    password,
    role,
  }

  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify([...accounts, account]),
  )

  return {
    success: true,
    account,
  }
}

export function loginAccount(username, password) {
  const accounts = readAccounts()

  const account = accounts.find(
    (item) =>
      item.username.toLowerCase() ===
        username.trim().toLowerCase() &&
      item.password === password,
  )

  if (!account) {
    return {
      success: false,
      message: "Tên đăng nhập hoặc mật khẩu không đúng.",
    }
  }

  const safeAccount = { ...account }

  delete safeAccount.password

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(safeAccount),
  )

  return {
    success: true,
    account: safeAccount,
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)

    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function logoutAccount() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

/*
 * Xác định màn hình đầu tiên sau khi đăng nhập
 */
export function getRolePath(role) {
  if (role === "teacher") {
    return "/teacher"
  }

  if (role === "student") {
    return "/student/home"
  }

  return "/"
}
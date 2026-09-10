import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { loginAccount } from "../../auth"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(location.state?.message || "")

  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname,
      )
    }
  }, [location.state])

  function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (!username.trim() || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu.")
      return
    }

    const result = loginAccount(username, password)

    if (!result.success) {
      setError(result.message)
      return
    }

    if (result.account.role === "student") {
      navigate("/student/home", { replace: true })
      return
    }

    if (result.account.role === "teacher") {
      navigate("/teacher", { replace: true })
      return
    }

    setError("Tài khoản không có quyền truy cập.")
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#8f1d2c] text-3xl font-bold text-white">
            NV
          </div>

          <h1 className="text-2xl font-bold text-[#7f1d2d]">
            Luyện tập đọc hiểu thơ
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Hệ thống hỗ trợ luyện tập đọc hiểu thơ
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Đăng nhập
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                  setError("")
                }}
                autoComplete="username"
                placeholder="Nhập tên đăng nhập"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError("")
                }}
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              />
            </div>
          </div>

          {success && (
            <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-[#8f1d2c] py-3 font-semibold text-white transition hover:bg-[#741624]"
          >
            Đăng nhập
          </button>

          <div className="mt-6 text-center text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#8f1d2c] hover:underline"
            >
              Đăng ký
            </Link>
          </div>

          <div className="mt-5 rounded-xl bg-gray-50 px-4 py-4 text-xs text-gray-500">
            <p className="font-semibold text-gray-700">
              Tài khoản mẫu để BGK dùng thử
            </p>

            <div className="mt-3">
              <p className="font-semibold text-[#7f1d2d]">
                HỌC SINH — Chưa làm test đầu vào
              </p>

              <p className="mt-1">
                Tài khoản:{" "}
                <span className="font-medium">hocsinh</span>
              </p>

              <p>
                Mật khẩu:{" "}
                <span className="font-medium">123456</span>
              </p>

              <p className="mt-1 text-gray-400">
                → Bắt đầu từ Mức 1 – Hỗ trợ cao
              </p>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-3">
              <p className="font-semibold text-[#7f1d2d]">
                HỌC SINH — Đã test đầu vào
              </p>

              <p className="mt-1">
                Tài khoản:{" "}
                <span className="font-medium">hocsinh3</span>
              </p>

              <p>
                Mật khẩu:{" "}
                <span className="font-medium">123456</span>
              </p>

              <p className="mt-1 text-gray-400">
                → Mức 3 – Hỗ trợ thấp
              </p>
            </div>

            <div className="mt-4 border-t border-gray-200 pt-3">
              <p className="font-semibold text-[#7f1d2d]">
                GIÁO VIÊN
              </p>

              <p className="mt-1">
                Tài khoản:{" "}
                <span className="font-medium">giaovien</span>
              </p>

              <p>
                Mật khẩu:{" "}
                <span className="font-medium">123456</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
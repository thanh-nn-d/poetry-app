import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerAccount } from "../../auth"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "student",
  })
  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError("")
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.fullName.trim() || !form.username.trim() || !form.password) {
      setError("Vui lòng điền đầy đủ thông tin.")
      return
    }

    if (form.password.length < 6) {
      setError("Mật khẩu cần có ít nhất 6 ký tự.")
      return
    }

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.")
      return
    }

    const result = registerAccount(form)
    if (!result.success) {
      setError(result.message)
      return
    }

    navigate("/", {
      replace: true,
      state: { message: "Đăng ký thành công. Bạn có thể đăng nhập ngay." },
    })
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#8f1d2c] text-3xl font-bold text-white">
            NV
          </div>
          <h1 className="text-2xl font-bold text-[#7f1d2d]">Luyện tập đọc hiểu thơ</h1>
          <p className="mt-2 text-sm text-gray-500">Tạo tài khoản để bắt đầu luyện tập</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">Đăng ký</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Tên đăng nhập</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                placeholder="Nhập tên đăng nhập"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Mật khẩu</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Ít nhất 6 ký tự"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Nhập lại mật khẩu"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Vai trò</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
              >
                <option value="student">HỌC SINH</option>
                <option value="teacher">GIÁO VIÊN</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-[#8f1d2c] py-3 font-semibold text-white transition hover:bg-[#741624]"
          >
            Tạo tài khoản
          </button>

          <div className="mt-5 text-center text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <Link to="/" className="font-semibold text-[#8f1d2c] hover:underline">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

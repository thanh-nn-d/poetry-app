import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logoutAccount } from "../../auth"
import demoStudents from "../../data/demoStudents"

export default function Feedback() {
  const nav = useNavigate()

  const students = demoStudents

  const [student, setStudent] = useState("")
  const [type, setType] = useState("Gợi ý cải thiện")
  const [text, setText] = useState("")
  const [saved, setSaved] = useState(false)

  const save = () => {
    if (!student || !text.trim()) return

    const old = JSON.parse(
      localStorage.getItem("teacherFeedback") || "[]",
    )

    old.push({
      student,
      type,
      text,
      createdAt: new Date().toISOString(),
    })

    localStorage.setItem(
      "teacherFeedback",
      JSON.stringify(old),
    )

    setSaved(true)
    setText("")
  }

  const handleLogout = () => {
    logoutAccount()
    nav("/", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      {/* Header */}
      <header className="bg-[#7f1d2d] px-8 py-5 text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-yellow-200">
              GIÁO VIÊN
            </p>

            <h1 className="text-2xl font-bold">
              Phản hồi học sinh
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => nav("/teacher")}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Dashboard
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-semibold underline underline-offset-4 hover:text-yellow-100"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-8">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          {/* Ghi chú demo */}
          <div className="mb-6 rounded-xl border border-[#eadfd5] bg-[#fffaf3] px-4 py-4">
            <p className="text-sm font-semibold text-[#7f1d2d]">
              Dữ liệu học sinh mẫu
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-600">
              Danh sách được tạo sẵn để minh họa cách giáo viên
              gửi phản hồi cho từng học sinh.
            </p>
          </div>

          {/* Học sinh */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Học sinh
            </label>

            <select
              value={student}
              onChange={(e) => {
                setStudent(e.target.value)
                setSaved(false)
              }}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#7f1d2d]"
            >
              <option value="">
                Chọn học sinh
              </option>

              {students.map((item) => (
                <option
                  key={item.id}
                  value={item.name}
                >
                  {item.name} — Mức {item.level}
                </option>
              ))}
            </select>
          </div>

          {/* Thông tin học sinh */}
          {student && (
            <StudentSummary
              student={students.find(
                (item) => item.name === student,
              )}
            />
          )}

          {/* Loại phản hồi */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Loại phản hồi
            </label>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value)
                setSaved(false)
              }}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#7f1d2d]"
            >
              <option>
                Gợi ý cải thiện
              </option>

              <option>
                Nhận xét kết quả
              </option>

              <option>
                Động viên
              </option>
            </select>
          </div>

          {/* Nội dung */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Nội dung phản hồi
            </label>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
                setSaved(false)
              }}
              rows="7"
              placeholder="Nhập phản hồi cho học sinh..."
              className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-[#7f1d2d]"
            />
          </div>

          {/* Thông báo */}
          {saved && (
            <p className="mt-5 rounded-xl bg-green-50 p-3 text-green-700">
              Đã lưu phản hồi.
            </p>
          )}

          {/* Lưu */}
          <button
            type="button"
            disabled={!student || !text.trim()}
            onClick={save}
            className="mt-5 rounded-xl bg-[#7f1d2d] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Lưu phản hồi
          </button>
        </div>
      </main>
    </div>
  )
}

function StudentSummary({ student }) {
  if (!student) return null

  return (
    <div className="mt-4 grid gap-3 rounded-xl bg-[#faf8f3] p-4 sm:grid-cols-3">
      <div>
        <p className="text-xs text-gray-500">
          Mức hỗ trợ
        </p>

        <p className="mt-1 font-semibold text-[#7f1d2d]">
          Mức {student.level}
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">
          Tiến độ
        </p>

        <p className="mt-1 font-semibold text-[#7f1d2d]">
          {student.progress}%
        </p>
      </div>

      <div>
        <p className="text-xs text-gray-500">
          Tải nhận thức
        </p>

        <p className="mt-1 font-semibold text-[#7f1d2d]">
          {student.load}
        </p>
      </div>
    </div>
  )
}
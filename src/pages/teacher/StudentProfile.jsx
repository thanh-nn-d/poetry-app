import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logoutAccount } from "../../auth"
import demoStudents from "../../data/demoStudents"

export default function StudentProfile() {
  const nav = useNavigate()
  const [selected, setSelected] = useState(demoStudents[0])

  const students = demoStudents

  const handleLogout = () => {
    logoutAccount()
    nav("/", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Header */}
      <header className="bg-[#7f1d2d] px-8 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-yellow-200">
              GIÁO VIÊN
            </p>

            <h1 className="text-2xl font-bold">
              Hồ sơ học sinh
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
              className="text-sm underline underline-offset-4 hover:text-yellow-100"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-8 lg:grid-cols-[280px_1fr]">
        {/* Danh sách học sinh */}
        <aside className="h-fit rounded-2xl border bg-white p-4">
          <h2 className="mb-1 font-bold text-[#7f1d2d]">
            Danh sách học sinh
          </h2>

          <p className="mb-4 text-xs text-gray-500">
            Chọn học sinh để xem hồ sơ.
          </p>

          {students.map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => setSelected(student)}
              className={`mb-2 w-full rounded-xl p-3 text-left transition ${
                selected?.id === student.id
                  ? "border border-red-200 bg-red-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <b>{student.name}</b>

              <span className="mt-1 block text-xs text-gray-500">
                Mức {student.level} · {student.progress}%
              </span>
            </button>
          ))}
        </aside>

        {/* Nội dung hồ sơ */}
        <section className="space-y-6">
          {selected && (
            <>
              {/* Tổng quan */}
              <div className="rounded-2xl border bg-white p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#a16207]">
                      HỒ SƠ HỌC SINH
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#7f1d2d]">
                      {selected.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {selected.id}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-[#fff3e6] px-3 py-1 text-sm font-semibold text-[#7f1d2d]">
                    Mức {selected.level}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Metric
                    t="Mức hỗ trợ"
                    v={`Mức ${selected.level}`}
                  />

                  <Metric
                    t="Tiến độ"
                    v={`${selected.progress}%`}
                  />

                  <Metric
                    t="Tải nhận thức"
                    v={selected.load}
                  />

                  <Metric
                    t="Văn bản đã học"
                    v={selected.texts}
                  />
                </div>
              </div>

              {/* Theo dõi quá trình */}
              <div className="rounded-2xl border bg-white p-6">
                <h3 className="mb-5 font-bold text-[#7f1d2d]">
                  Theo dõi quá trình
                </h3>

                <div className="space-y-5">
                  <Row
                    t="Tiến độ học tập"
                    v={selected.progress}
                  />

                  <Row
                    t="Tiến độ chuyển mức hỗ trợ"
                    v={
                      selected.level === 3
                        ? 100
                        : selected.level === 2
                          ? 66
                          : 33
                    }
                  />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Info
                    title="Thời gian học"
                    value={selected.studyTime}
                  />

                  <Info
                    title="Đánh giá đầu vào"
                    value={selected.initialAssessment}
                  />
                </div>
              </div>

              {/* Kết quả challenge */}
              <div className="rounded-2xl border bg-white p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-bold text-[#7f1d2d]">
                    Kết quả thử thách chuyển mức
                  </h3>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
                      selected.challenge === "Đã đạt"
                        ? "bg-green-50 text-green-700"
                        : selected.challenge === "Không đạt"
                          ? "bg-red-50 text-red-700"
                          : selected.challenge.includes("Đạt")
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selected.challenge}
                  </span>
                </div>

                <p className="mt-4 leading-6 text-gray-700">
                  {selected.challengeDetail}
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Info
                    title="Kết quả"
                    value={selected.challengeResult}
                  />

                  <Info
                    title="Mức hỗ trợ hiện tại"
                    value={`Mức ${selected.level}`}
                  />
                </div>
              </div>

              {/* Hoạt động gần đây */}
              <div className="rounded-2xl border bg-white p-6">
                <h3 className="mb-5 font-bold text-[#7f1d2d]">
                  Hoạt động học tập gần đây
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b text-sm text-gray-500">
                        <th className="py-3">
                          HOẠT ĐỘNG
                        </th>

                        <th>
                          KẾT QUẢ
                        </th>

                        <th>
                          ĐIỂM / TRẠNG THÁI
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {selected.recentActivities.map(
                        (activity, index) => (
                          <tr
                            key={`${selected.id}-${index}`}
                            className="border-b last:border-0"
                          >
                            <td className="py-4 font-medium">
                              {activity.activity}
                            </td>

                            <td className="text-sm text-gray-600">
                              {activity.result}
                            </td>

                            <td className="text-sm font-semibold text-[#7f1d2d]">
                              {activity.score}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ghi chú */}
              <div className="rounded-2xl border bg-white p-6">
                <h3 className="mb-3 font-bold text-[#7f1d2d]">
                  Ghi chú theo dõi
                </h3>

                <p className="leading-6 text-gray-700">
                  {selected.notes}
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

function Metric({ t, v }) {
  return (
    <div className="rounded-xl bg-[#faf8f3] p-4">
      <p className="text-xs text-gray-500">
        {t}
      </p>

      <p className="mt-1 text-lg font-bold text-[#7f1d2d]">
        {v}
      </p>
    </div>
  )
}

function Info({ title, value }) {
  return (
    <div className="rounded-xl border border-[#eadfd5] bg-[#fffaf3] p-4">
      <p className="text-xs text-gray-500">
        {title}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#7f1d2d]">
        {value}
      </p>
    </div>
  )
}

function Row({ t, v }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{t}</span>

        <b>{v}%</b>
      </div>

      <div className="h-2 rounded-full bg-gray-100">
        <div
          className="h-2 rounded-full bg-[#7f1d2d]"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  )
}
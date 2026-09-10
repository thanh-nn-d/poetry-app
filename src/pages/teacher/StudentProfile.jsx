import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logoutAccount } from "../../auth"

export default function StudentProfile() {
  const nav = useNavigate()
  const [selected, setSelected] = useState(null)

  // Dữ liệu mặc định để trống.
  // Sau này có backend thì thay bằng dữ liệu lấy từ API.
  const students = []

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
          <h2 className="mb-3 font-bold text-[#7f1d2d]">
            Danh sách học sinh
          </h2>

          {students.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#eadfd5] bg-[#fffaf3] p-5 text-center">
              <p className="text-sm font-semibold text-[#7f1d2d]">
                Chưa có học sinh
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Danh sách học sinh sẽ hiển thị tại đây khi có dữ liệu.
              </p>
            </div>
          ) : (
            students.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelected(student)}
                className={`mb-2 w-full rounded-xl p-3 text-left ${
                  selected?.id === student.id
                    ? "border border-red-200 bg-red-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <b>{student.name}</b>

                <span className="block text-xs text-gray-500">
                  Mức {student.level} · {student.progress}%
                </span>
              </button>
            ))
          )}
        </aside>

        {/* Nội dung hồ sơ */}
        <section className="space-y-6">
          {selected ? (
            <>
              {/* Thông tin tổng quan */}
              <div className="rounded-2xl border bg-white p-6">
                <h2 className="text-2xl font-bold text-[#7f1d2d]">
                  {selected.name}
                </h2>

                <p className="text-gray-500">
                  {selected.id}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
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
                <h3 className="mb-4 font-bold text-[#7f1d2d]">
                  Theo dõi quá trình
                </h3>

                <div className="space-y-4">
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
              </div>

              {/* Kết quả thử thách */}
              <div className="rounded-2xl border bg-white p-6">
                <h3 className="mb-4 font-bold text-[#7f1d2d]">
                  Kết quả thử thách
                </h3>

                <p>{selected.challenge}</p>

                <p className="mt-2 text-sm text-gray-500">
                  Chi tiết điểm/chỉ số sẽ được hiển thị sau khi học sinh
                  hoàn thành thử thách.
                </p>
              </div>
            </>
          ) : (
            <div className="flex min-h-[420px] items-center justify-center rounded-2xl border bg-white p-8">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fffaf3] text-2xl">
                  👤
                </div>

                <h2 className="mt-4 text-xl font-bold text-[#7f1d2d]">
                  Chưa chọn học sinh
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Chọn một học sinh từ danh sách để xem hồ sơ và quá trình
                  học tập.
                </p>
              </div>
            </div>
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
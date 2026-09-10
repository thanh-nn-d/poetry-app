import { useNavigate } from "react-router-dom"
import { logoutAccount } from "../../auth"

export default function Dashboard() {
  const navigate = useNavigate()

  // Dữ liệu học sinh mặc định để trống.
  // Sau này có backend thì thay bằng dữ liệu lấy từ API.
  const students = []

  const stats = {
    total: students.length,
    active: 0,
    avg: 0,
  }

  const handleLogout = () => {
    logoutAccount()
    navigate("/", { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-800">
      {/* Header */}
      <header className="bg-[#7f1d2d] px-8 py-5 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="text-xs tracking-widest text-yellow-200">
              GIÁO VIÊN
            </p>

            <h1 className="text-2xl font-bold">
              Dashboard học tập
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/teacher")}
              className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Trang chủ
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

      <main className="mx-auto max-w-6xl space-y-7 p-8">
        {/* Thống kê */}
        <div className="grid gap-5 md:grid-cols-3">
          <Stat
            title="Tổng số học sinh"
            value={stats.total}
          />

          <Stat
            title="Đang học hôm nay"
            value={stats.active}
          />

          <Stat
            title="Tiến độ trung bình"
            value={`${stats.avg}%`}
          />
        </div>

        {/* Danh sách học sinh */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#7f1d2d]">
              Danh sách học sinh
            </h2>

            <button
              type="button"
              onClick={() => navigate("/teacher/students")}
              className="text-sm font-semibold text-[#7f1d2d] hover:underline"
            >
              Xem hồ sơ →
            </button>
          </div>

          {students.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#eadfd5] bg-[#fffaf3] px-6 py-12 text-center">
              <p className="text-base font-semibold text-[#7f1d2d]">
                Chưa có dữ liệu học sinh
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Dữ liệu học sinh sẽ hiển thị tại đây sau khi có hoạt động học
                tập.
              </p>

              <button
                type="button"
                onClick={() => navigate("/teacher/students")}
                className="mt-5 rounded-xl bg-[#7f1d2d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6b1826]"
              >
                Xem danh sách học sinh
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="py-3">HỌC SINH</th>
                    <th>MỨC HỖ TRỢ</th>
                    <th>TIẾN ĐỘ</th>
                    <th>HOẠT ĐỘNG GẦN NHẤT</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b last:border-0"
                    >
                      <td className="py-4 font-semibold">
                        {student.name}

                        <div className="text-xs text-gray-400">
                          {student.id}
                        </div>
                      </td>

                      <td>
                        Mức {student.level}
                      </td>

                      <td>
                        <div className="h-2 w-40 rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-[#7f1d2d]"
                            style={{
                              width: `${student.progress}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs">
                          {student.progress}%
                        </span>
                      </td>

                      <td>
                        {student.last}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Tác vụ */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/teacher/grading")}
            className="rounded-xl bg-[#7f1d2d] px-5 py-3 font-semibold text-white hover:bg-[#6b1826]"
          >
            Chấm bài
          </button>

          <button
            type="button"
            onClick={() => navigate("/teacher/feedback")}
            className="rounded-xl border border-[#7f1d2d] px-5 py-3 font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
          >
            Phản hồi học sinh
          </button>

          <button
            type="button"
            onClick={() => navigate("/teacher/assessment-result")}
            className="rounded-xl border border-[#eadfd5] bg-white px-5 py-3 font-semibold text-[#7f1d2d] hover:bg-[#fffaf3]"
          >
            Kết quả đánh giá
          </button>
        </div>
      </main>
    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-[#7f1d2d]">
        {value}
      </p>
    </div>
  )
}
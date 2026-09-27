import { useNavigate } from "react-router-dom"
import { logoutAccount } from "../../auth"
import demoStudents from "../../data/demoStudents"

export default function Dashboard() {
  const navigate = useNavigate()

  const students = demoStudents

  const stats = {
    total: students.length,

    active: students.filter(
      (student) => student.activeToday,
    ).length,

    avg: Math.round(
      students.reduce(
        (sum, student) => sum + student.progress,
        0,
      ) / students.length,
    ),
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

        {/* Ghi chú demo */}
        <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf3] px-5 py-4">
          <p className="text-sm font-semibold text-[#7f1d2d]">
            Dữ liệu minh họa
          </p>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            Danh sách dưới đây là dữ liệu học sinh mẫu được
            sử dụng để minh họa cơ chế theo dõi và đánh giá
            trong giao diện giáo viên.
          </p>
        </div>

        {/* Danh sách học sinh */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#7f1d2d]">
                Danh sách học sinh
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Theo dõi mức hỗ trợ, tiến độ và hoạt động học tập.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/teacher/students")}
              className="text-sm font-semibold text-[#7f1d2d] hover:underline"
            >
              Xem hồ sơ →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="py-3">
                    HỌC SINH
                  </th>

                  <th>
                    MỨC HỖ TRỢ
                  </th>

                  <th>
                    TIẾN ĐỘ
                  </th>

                  <th>
                    TẢI NHẬN THỨC
                  </th>

                  <th>
                    HOẠT ĐỘNG GẦN NHẤT
                  </th>
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
                      <span className="rounded-full bg-[#fff3e6] px-3 py-1 text-sm font-semibold text-[#7f1d2d]">
                        Mức {student.level}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-32 rounded-full bg-gray-100">
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
                      </div>
                    </td>

                    <td>
                      {student.load}
                    </td>

                    <td className="max-w-xs text-sm text-gray-600">
                      {student.last}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
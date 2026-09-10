function Login() {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo / nhận diện */}
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
  
          {/* Form đăng nhập */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
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
                  placeholder="Nhập mật khẩu"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#8f1d2c] focus:ring-2 focus:ring-[#8f1d2c]/20"
                />
              </div>
  
              <button
                type="button"
                className="w-full rounded-xl bg-[#8f1d2c] py-3 font-semibold text-white transition hover:bg-[#741624]"
              >
                Đăng nhập
              </button>
            </div>
  
            <div className="mt-6 text-center text-sm text-gray-500">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                className="font-semibold text-[#8f1d2c] hover:underline"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Login
import { useLocation, useNavigate } from "react-router-dom"

function BackButton() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathname = location.pathname

  // =====================================================
  // NHỮNG TRANG KHÔNG CẦN NÚT QUAY LẠI
  // =====================================================
  const noBackButtonPaths = [
    "/",
    "/register",
    "/student/home",
    "/teacher",
  ]

  if (noBackButtonPaths.includes(pathname)) {
    return null
  }

  // =====================================================
  // QUAY LẠI TRANG TRƯỚC
  // =====================================================
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="
        fixed
        left-5
        top-5
        z-40
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-[#eadfd5]
        bg-white
        px-4
        py-2.5
        text-sm
        font-semibold
        text-[#7f1d2d]
        shadow-sm
        transition
        hover:bg-[#fff8ee]
        hover:shadow-md
      "
    >
      <span className="text-lg leading-none">←</span>
      <span>Quay lại</span>
    </button>
  )
}

// Cho phép import theo cả 2 cách
export { BackButton }
export default BackButton
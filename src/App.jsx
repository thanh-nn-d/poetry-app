import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import StudentHome from "./pages/student/StudentHome"
import Assessment from "./pages/student/Assessment"
import AssessmentResult from "./pages/student/AssessmentResult"
import ReadingTest from "./pages/student/ReadingTest"
import TextSelection from "./pages/student/TextSelection"
import LearningWorkspace from "./pages/student/LearningWorkspace"
import LearningSummary from "./pages/student/LearningSummary"
import Challenge from "./pages/student/Challenge"
import ChallengeResult from "./pages/student/ChallengeResult"
import LearningProfile from "./pages/student/LearningProfile"

import Grading from "./pages/teacher/Grading"
import TeacherAssessmentResult from "./pages/teacher/AssessmentResult"
import Dashboard from "./pages/teacher/Dashboard"
import StudentProfile from "./pages/teacher/StudentProfile"
import Feedback from "./pages/teacher/Feedback"


// =====================================================
// KIỂM TRA TEST ĐẦU VÀO
// =====================================================

function hasInitialAssessment() {
  return Boolean(
    localStorage.getItem("poetry_initial_assessment")
  )
}


// =====================================================
// GUARD KHU VỰC LUYỆN TẬP
// =====================================================

function PracticeGuard({ children }) {
  const completed = hasInitialAssessment()

  if (!completed) {
    return (
      <Navigate
        to="/student/assessment"
        replace
      />
    )
  }

  return children
}


// =====================================================
// APP
// =====================================================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            STUDENT - TRANG CHỦ
        ================================================= */}

        <Route
          path="/student/home"
          element={<StudentHome />}
        />


        {/* =================================================
            STUDENT - TEST ĐẦU VÀO
            Luôn được phép truy cập
        ================================================= */}

        <Route
          path="/student/assessment"
          element={<Assessment />}
        />

        <Route
          path="/student/assessment/reading"
          element={<ReadingTest />}
        />

        <Route
          path="/student/assessment-result"
          element={<AssessmentResult />}
        />


        {/* =================================================
            STUDENT - LUYỆN TẬP
            Chỉ mở sau khi hoàn thành test đầu vào
        ================================================= */}

        <Route
          path="/student/texts"
          element={
            <PracticeGuard>
              <TextSelection />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/text-selection"
          element={
            <PracticeGuard>
              <TextSelection />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/learning"
          element={
            <PracticeGuard>
              <LearningWorkspace />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/summary"
          element={
            <PracticeGuard>
              <LearningSummary />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/learning-summary"
          element={
            <PracticeGuard>
              <LearningSummary />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/challenge"
          element={
            <PracticeGuard>
              <Challenge />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/challenge-result"
          element={
            <PracticeGuard>
              <ChallengeResult />
            </PracticeGuard>
          }
        />

        <Route
          path="/student/profile"
          element={
            <PracticeGuard>
              <LearningProfile />
            </PracticeGuard>
          }
        />


        {/* =================================================
            TEACHER
        ================================================= */}

        <Route
          path="/teacher"
          element={<Dashboard />}
        />

        <Route
          path="/teacher/students"
          element={<StudentProfile />}
        />

        <Route
          path="/teacher/feedback"
          element={<Feedback />}
        />

        <Route
          path="/teacher/grading"
          element={<Grading />}
        />

        <Route
          path="/teacher/assessment-result"
          element={<TeacherAssessmentResult />}
        />


        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}
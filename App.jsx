import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Assessment from "./pages/student/Assessment"
import ReadingTest from "./pages/student/ReadingTest"
import TextSelection from "./pages/student/TextSelection"
import LearningWorkspace from "./pages/student/LearningWorkspace"
import LearningSummary from "./pages/student/LearningSummary"
import Challenge from "./pages/student/Challenge"
import ChallengeResult from "./pages/student/ChallengeResult"
import LearningProfile from "./pages/student/LearningProfile"
import Grading from "./pages/teacher/Grading"
import AssessmentResult from "./pages/teacher/AssessmentResult"
import Dashboard from "./pages/teacher/Dashboard"
import StudentProfile from "./pages/teacher/StudentProfile"
import Feedback from "./pages/teacher/Feedback"

export default function App(){return <BrowserRouter><Routes>
<Route path="/" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/student/assessment" element={<Assessment/>}/><Route path="/student/assessment/reading" element={<ReadingTest/>}/><Route path="/student/texts" element={<TextSelection/>}/><Route path="/student/text-selection" element={<TextSelection/>}/><Route path="/student/learning" element={<LearningWorkspace/>}/><Route path="/student/summary" element={<LearningSummary/>}/><Route path="/student/learning-summary" element={<LearningSummary/>}/><Route path="/student/challenge" element={<Challenge/>}/><Route path="/student/challenge-result" element={<ChallengeResult/>}/><Route path="/student/profile" element={<LearningProfile/>}/>
<Route path="/teacher" element={<Dashboard/>}/><Route path="/teacher/students" element={<StudentProfile/>}/><Route path="/teacher/feedback" element={<Feedback/>}/><Route path="/teacher/grading" element={<Grading/>}/><Route path="/teacher/assessment-result" element={<AssessmentResult/>}/><Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></BrowserRouter>}

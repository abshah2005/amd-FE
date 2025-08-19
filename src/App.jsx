import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainNav from "./components/MainNav";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUpPage from "./pages/Signup";
import OnboardingScreen from "./pages/Onborading";
import AccountSetup from "./pages/AccountSetup";
import WaitingScreen from "./pages/WaitingScreen";
import SignupFi from "./pages/SignupSuccessful";
import { LinkedInCallback } from "./pages/LinkedInCallback";
import SignInPage from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PasswordResetSuccess from "./pages/ResetSuccess";
import Test from "./pages/Test";
import RichEditor from "./pages/RichEditor";
import { AuthProvider } from "./contextProvider/AuthContextProvider";

import { useAuth } from "./contextProvider/AuthContextProvider";
import QuestionsPage from "./pages/QuestionsPage";
import ProfessionalOnboarding from "./pages/ProfessionalOnboarding";
import AccountSettings from "./pages/AccountSettings";
import DashboardPage from "./pages/DashboardPage";
import AppSkeleton from "./pages/AppSkeleton";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <AppSkeleton />;
  return user ? children : <Navigate to="/signin" replace />;
}

function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <AppSkeleton />;
  return user.role === "asker" || user.role === "Asker" ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
}

function ProtectedLayout() {
  return <Outlet />;
}

function MainLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Test />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        {/* <Route
          element={
            <ProtectedAdminRoute>
              <ProtectedLayout />
            </ProtectedAdminRoute>
          }
        >
        </Route> */}

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/pofon" element={<ProfessionalOnboarding />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/onboard" element={<OnboardingScreen />} />
        <Route path="/setup" element={<AccountSetup />} />
        <Route path="/waiting" element={<WaitingScreen />} />
        <Route path="/signupfi" element={<SignupFi />} />
        <Route path="/editor" element={<RichEditor />} />
        <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
        <Route path="/resetSuccess" element={<PasswordResetSuccess />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

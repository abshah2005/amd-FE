import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MainNav from "./components/MainNav";
import SignUpPage from "./pages/Signup";
import ProfessionalOnboarding from "./pages/ProfessionalOnboarding";
import AccountSettings from "./pages/AccountSettings";
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
import DashboardPage from "./pages/DashboardPage";
import AppSkeleton from "./pages/AppSkeleton";
import QuestionsPage from "./pages/QuestionsPage";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <AppSkeleton />;
  return user ? children : <Navigate to="/signin" replace />;
}

function ProtectedAskerRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <AppSkeleton />;
  if (!user) return <Navigate to="/signin" replace />;
  return user.activeRole === "asker" || user.role === "asker" ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

function ProtectedNonAskerRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <AppSkeleton />;
  if (!user) return <Navigate to="/signin" replace />;
  return user.activeRole !== "asker" && user.role !== "asker" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
}

function LandingRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <AppSkeleton />;
  if (!user) return <Navigate to="/signin" replace />;
  return user.activeRole === "asker" || user.role === "asker" ? (
    <Test />
  ) : (
    <Navigate to="/dashboard" replace />
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
          <Route path="/" element={<LandingRedirect />} />

          <Route
            path="/test"
            element={
              <ProtectedAskerRoute>
                <Test />
              </ProtectedAskerRoute>
            }
          />

          <Route path="/questions" element={<QuestionsPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedNonAskerRoute>
                <DashboardPage />
              </ProtectedNonAskerRoute>
            }
          />

          {/* <Route
            path="/pofon"
            element={
              <ProtectedNonAskerRoute>
                <ProfessionalOnboarding />
              </ProtectedNonAskerRoute>
            }
          /> */}
        </Route>

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

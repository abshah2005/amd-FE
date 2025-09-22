import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
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
import TestPayQuestion from "./pages/TestPayQuestion";
import PublicProfilePage from "./components/PublicProfilePage";
import LinkedInLinking from "./components/LinkedInCallbackPage";
import AdminAnswersPage from "./pages/AdminQuestionsPage";
import PrivacyPage from "./PrivacyPage";
import LandingPage from "./components/LandingPage";
import CookiePage from "./pages/CookiePage";
import TermsPage from "./pages/TermsPage";
import ScrollToTop from "./Navigation/ScrollToTop";
import FooterMain from "./components/FooterMain";
import FooterLoggedIn from "./components/FooterLoggedIn";

function ProtectedRoute({ children, allowPublicTest = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AppSkeleton />;

  if (
    (!user && allowPublicTest && location.pathname === "/") ||
    location.pathname.startsWith("/?")
  ) {
    return children;
  }

  // Otherwise enforce authentication for other routes
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

  // if (!user) return <Test />;
  if (!user) return <LandingPage />;

  return user.activeRole === "asker" || user.role === "asker" ? (
    <Test />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

function MainLayout() {
  const { user } = useAuth();
  return (
    <>
      <MainNav tailwindclass="bg-[#F1F4F9]" />
      <Outlet />
      {/* <FooterLoggedIn /> */}
      <div className="mt-20">{user ? <FooterLoggedIn /> : <FooterMain />}</div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <ProtectedRoute allowPublicTest={true}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/test"
            element={
              <ProtectedAskerRoute>
                <Test />
              </ProtectedAskerRoute>
            }
          />

          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/admin/questions" element={<AdminAnswersPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedNonAskerRoute>
                <DashboardPage />
              </ProtectedNonAskerRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/terms" element={<TermsPage />} />

          <Route path="/" element={<LandingRedirect />} />
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
        <Route path="/stripe" element={<TestPayQuestion />} />
        <Route path="/profile/:name" element={<PublicProfilePage />} />
        <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
        <Route path="/auth/linkedin/link" element={<LinkedInLinking />} />
        <Route path="/resetSuccess" element={<PasswordResetSuccess />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

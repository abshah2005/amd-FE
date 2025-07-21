import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUpPage from './pages/Signup'
import OnboardingScreen from './pages/Onborading'
import AccountSetup from './pages/AccountSetup'
import WaitingScreen from './pages/WaitingScreen'
import SignupFi from './pages/SignupSuccessful'
import {LinkedInCallback} from './pages/LinkedInCallback'
import SignInPage from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import PasswordResetSuccess from './pages/ResetSuccess'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path='/onboard' element={<OnboardingScreen />} />
        <Route path='/setup' element={<AccountSetup />} />
        <Route path="/about" element={<About />} />
        <Route path='/waiting' element={<WaitingScreen />} />
        <Route path='/signupfi' element={<SignupFi />} />
        <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
        <Route path="/resetSuccess" element={<PasswordResetSuccess />}/>
      </Routes>
    </div>
  )
}

export default App

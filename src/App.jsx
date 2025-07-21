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

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route path='/onboard' element={<OnboardingScreen />} />
        <Route path='/setup' element={<AccountSetup />} />
        <Route path="/about" element={<About />} />
        <Route path='/waiting' element={<WaitingScreen />} />
        <Route path='/signupfi' element={<SignupFi />} />
        <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />

      </Routes>
    </div>
  )
}

export default App

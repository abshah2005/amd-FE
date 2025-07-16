import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUpPage from './pages/Signup'
import OnboardingScreen from './pages/Onborading'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/onboard' element={<OnboardingScreen />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App

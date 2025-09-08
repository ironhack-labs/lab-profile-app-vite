import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import SignUpPage from './components/SignUp'
import LogInPage from './components/LogIn'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </>
  )
}

export default App;

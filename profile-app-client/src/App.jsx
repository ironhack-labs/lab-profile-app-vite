import Homepage from './pages/Homepage'
import LoginForm from './pages/LoginForm'
import RegistrationForm from './pages/RegistrationForm'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className={"app"}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </div>
  )
}

export default App

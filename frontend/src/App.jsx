import { Route, Routes } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { LogIn } from "./pages/LogIn"
import { DashBoard } from "./pages/DashBoard"
import { SendMoney } from "./components/SendMoney"

function App() {
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/" />
        <Route element={<LogIn />} path="/login" />
        <Route element={<DashBoard />} path="/dashboard" />
        <Route element={<SendMoney />} path="/sendMoney" />
      </Routes>
    </>
  )
}

export default App

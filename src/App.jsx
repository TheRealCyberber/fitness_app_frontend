import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Dashboard from './components/dashboard/Dashboard'
import WorkoutList from './components/workout/WorkoutList'
import ProgressList from './components/progress/ProgressList'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  
  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }
  
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }
  
  useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
      checkToken()
    }
  }, [])
  
  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/progress" element={<ProgressList />} />
        </Routes>
      </main>
    </>
  )
}

export default App

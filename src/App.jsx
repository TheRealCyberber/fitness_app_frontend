import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import { SignOutUser } from './services/Auth'
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
  const [progress, setProgress] = useState([])
  const [workouts, setWorkouts] = useState([])

  
  const handleLogOut = () => {
    SignOutUser()
    setUser(null)
    setProgress([])
    setWorkouts([])
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
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard user={user} />
          }
        />
        <Route
          path="/workouts"
          element={
            user ? (
              <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
            ) : (
              <SignIn setUser={setUser} />
            )
          }
        />
        <Route
          path="/progress"
          element={
            user ? (
              <ProgressList progress={progress} setProgress={setProgress} />
            ) : (
              <SignIn setUser={setUser} />
            )
          }
        />
        </Routes>
      </main>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
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
        </Routes>
      </main>
    </>
  )
}

export default App

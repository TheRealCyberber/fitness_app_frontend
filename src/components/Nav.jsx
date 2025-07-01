import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Nav = ({ user, handleLogOut }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=26.2&longitude=50.6&daily=temperature_2m_max,temperature_2m_min&timezone=auto'
        )
        const data = await res.json()
        setWeather({
          max: data.daily.temperature_2m_max[0],
          min: data.daily.temperature_2m_min[0],
        })
      } catch (err) {
        console.error('Weather fetch error:', err)
      }
    }

    fetchWeather()
  }, [])

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img
            className="logo"
            src="https://img.icons8.com/ios-filled/100/ffffff/barbell.png"
            alt="logo"
          />
          <span className="app-name">Fitnessly</span>
        </Link>

        {user && <Link to="/dashboard" className="dashboard-link nav-link">Dashboard</Link>}
      </div>

      

      <div className="nav-right">
        {user ? (
          <>
            <span className="welcome-text">Welcome {user.name}!</span>
            <Link onClick={handleLogOut} to="/" className="signout-link">
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="signout-link">Home </Link>
            <Link to="/register" className="signout-link">Register</Link>
            <Link to="/signin" className="signout-link">Sign In</Link>
          </>
        )}
        {weather && (
          <div className="weather">
            🌤️ {weather.max}° / {weather.min}°
          </div>
        )}
      </div>
    </header>
  )
}

export default Nav

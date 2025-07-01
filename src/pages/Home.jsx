import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Home = ({ user }) => {
  let navigate = useNavigate()

  return (
    <div className="welcome-box">
      <h1>Welcome to Fitnessly</h1>
      {!user ? (
        <p>
          <Link to="/signin" className="link">Sign in</Link> or
          <Link to="/register" className="link"> Register</Link> to get started.
        </p>
      ) : (
        <p>Let's crush your fitness goals, {user.name || 'champ'}! 💪</p>
      )}
    </div>
  )
}

export default Home

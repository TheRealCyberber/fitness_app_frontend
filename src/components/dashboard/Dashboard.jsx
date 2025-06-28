import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your fitness tracker!</p>
      <nav>
        <ul>
          <li><Link to="/workouts">My Workouts</Link></li>
          <li><Link to="/progress">My Progress</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Dashboard
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Fitness Tracker</h1>


      <div className="dashboard-buttons">
        <Link to="/workouts" className="dashboard-button">My Workouts</Link>
        <Link to="/progress" className="dashboard-button">My Progress</Link>
      </div>
    </div>

  )
}

export default Dashboard
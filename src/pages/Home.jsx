import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home">
      <img src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?fit=crop&w=1400&q=80"
    alt="Fitness Tracking App"
    style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', marginTop: '20px' }}
  id="welcome" />

      <section className="welcome-signin">
        <button onClick={() => navigate('/signin')}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  )
}

export default Home

import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <nav>
        <h3>Welcome {user.name}!</h3>
        <Link to="/feed">Feed</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <img className="logo" src="/images/logo.png" alt="logo" />
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}

export default Nav

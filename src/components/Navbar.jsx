import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import logo from '../images/logos/logo-no-background.png';

function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = function (){
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img id="logo-image" src={logo} alt="logo" />
        </Link>
        <nav>
          {user &&
            <div className='nav-right-div'>
              <span id="user-mail">{user.email}</span>
              <Link to="/cattle/create">
                <button className="create-button">
                  Add Cattle
                </button>
              </Link>
              <button onClick={handleClick} className='material-symbols-outlined' id='logout-button' >logout</button>
            </div>
          }
          {!user &&
            <div>
              <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/signup">
                <button>Signup</button>
              </Link>
            </div>
          }

        </nav>
      </div>
    </header>
  )
}

export default Navbar;

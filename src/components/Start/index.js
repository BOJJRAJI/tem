import {Link, Redirect} from 'react-router-dom'
import {IoPersonAdd, IoLogInOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import './index.css'

const Start = () => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/home" />
  }
  return (
    <div>
      <nav className="start-nav-header">
        <div className="start-nav-content">
          <div className="start-nav-bar-large-container">
            <Link to="/">
              <img
                className="start-website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="start website logo"
              />
            </Link>
            <ul className="start-nav-menu">
              <li className="start-nav-menu-item">
                <Link to="/account/register" className="start-nav-link">
                  Register
                </Link>
              </li>

              <li className="start-nav-menu-item">
                <Link to="/account/login" className="start-nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="start-nav-menu-mobile">
            <Link to="/">
              <img
                className="start-mobile-website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
              />
            </Link>
            <ul className="start-nav-menu-list-mobile">
              <li className="start-nav-menu-item-mobile">
                <Link to="/account/register" className="start-nav-link">
                  <IoPersonAdd size={20} />
                </Link>
              </li>

              <li className="start-nav-menu-item-mobile">
                <Link to="/account/login" className="start-nav-link">
                  <IoLogInOutline size={20} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="banner-bg-container">
        <div className="banner-section">
          <h1 className="banner-section-heading">
            Welcome to the future of trends with NxtTrends app!
          </h1>
          <p className="banner-text">
            Your journey into style and innovation starts here, where each tap
            unlocks a world of cutting-edge fashion and next-level trends. Get
            ready to redefine your style, one trend at a time. Enjoy the ride!
          </p>
          <div className="banner-buttons-container">
            <button className="banner-register-button" type="button">
              <Link to="/account/register" className="button-link">
                Register
              </Link>
            </button>
            <button className="banner-login-button" type="button">
              <Link to="/account/login" className="login-button-link">
                Login
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Start

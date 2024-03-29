import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {itemsCount: 0}

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://main-backend-1.onrender.com/user/cartitems',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      this.setState({itemsCount: data.length})
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  render() {
    const {itemsCount} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <Link to="/home">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
              />
            </Link>

            <Popup
              modal
              trigger={
                <button type="button" className="nav-mobile-btn">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                    alt="nav logout"
                    className="nav-bar-img"
                  />
                </button>
              }
              className="popup-content"
            >
              {close => (
                <div className="logout-card">
                  <p className="logout-para">
                    Are you sure, you want to logout
                  </p>
                  <div className="close-logout-button-container">
                    <button
                      onClick={() => close()}
                      type="button"
                      className="close-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={this.onClickLogout}
                      className="confirm-button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>

          <div className="nav-bar-large-container">
            <Link to="/home">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
              />
            </Link>

            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>

              <li className="nav-menu-item">
                <Link to="/cart" className="nav-link">
                  Cart{' '}
                  {itemsCount > 0 ? (
                    <span className="cart-count-badge">{itemsCount}</span>
                  ) : null}
                </Link>
              </li>
            </ul>

            <Popup
              modal
              trigger={
                <button type="button" className="logout-desktop-btn">
                  Logout
                </button>
              }
              className="popup-content"
            >
              {close => (
                <div className="logout-card">
                  <p className="logout-para">
                    Are you sure, you want to logout
                  </p>
                  <div className="close-logout-button-container">
                    <button
                      onClick={() => close()}
                      type="button"
                      className="close-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={this.onClickLogout}
                      className="confirm-button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
        <div className="nav-menu-mobile">
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/home" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                  alt="nav home"
                  className="nav-bar-img"
                />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/products" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                  alt="nav products"
                  className="nav-bar-img"
                />
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link to="/cart" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                  alt="nav cart"
                  className="nav-bar-img"
                />{' '}
                {itemsCount > 0 ? (
                  <span className="cart-count-badge">{itemsCount}</span>
                ) : null}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)

import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {message} from 'antd'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/home')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state
    if (email === '' || password === '') {
      this.setState({showSubmitError: true, errorMsg: 'Invalid Credentials'})
    } else {
      const userDetails = {email, password}
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(
        'https://main-backend-1.onrender.com/login',
        requestOptions,
      )
      const data = await response.json()
      if (response.ok === true) {
        const config = {
          className: 'pop-messages',
          content: 'Login Successfully!',
        }
        setTimeout(() => {
          message.success(config)
        }, 1000)
        this.onSubmitSuccess(data.jwtToken)
      } else {
        const config = {
          className: 'pop-messages',
          content: data,
        }
        setTimeout(() => {
          message.error(config)
        }, 1000)
        this.setState({showSubmitError: true, errorMsg: data})
      }
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          autoComplete="off"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeUsername}
          placeholder="Email"
          autoComplete="off"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <button type="button" className="already-account-button">
            <Link
              to="/account/register"
              className="already-account-button-link"
            >
              Don't have account?
            </Link>
          </button>
        </form>
      </div>
    )
  }
}

export default Login

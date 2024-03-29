import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import validator from 'validator'
import {message} from 'antd'

import './index.css'

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errorMsg: '',
  }

  getUsername = e => {
    this.setState({username: e.target.value})
  }

  getEmail = e => {
    this.setState({email: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  submitForm = async e => {
    e.preventDefault()
    const {password, email, username} = this.state
    const isEmailValid = validator.isEmail(email)
    if (username === '' || email === '' || password === '') {
      this.setState({errorMsg: 'Invalid Credentials'})
    } else if (!isEmailValid) {
      this.setState({errorMsg: 'Invalid Email'})
    } else {
      const userDetails = {username, email, password}
      console.log(JSON.stringify(userDetails))
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(
        'https://main-backend-1.onrender.com/register',
        requestOptions,
      )
      if (response.ok === true) {
        const config = {
          className: 'pop-messages',
          content: 'Registered Successfully!',
        }
        setTimeout(() => {
          message.success(config)
        }, 200)
        const {history} = this.props
        history.replace('/account/login')
      } else {
        const data = await response.json()
        const config = {
          className: 'pop-messages',
          content: data,
        }
        setTimeout(() => {
          message.error(config)
        }, 1000)
      }
    }
  }

  render() {
    const {password, email, username, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/home" />
    }
    return (
      <div className="register-form-bg-container">
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
        <form className="register-form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={this.getUsername}
              placeholder="Username"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="password-input-field"
              value={email}
              onChange={this.getEmail}
              placeholder="Email"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={this.getPassword}
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          {errorMsg && <p className="error-message">*{errorMsg}</p>}
          <button type="button" className="already-account-button">
            <Link to="/account/login" className="already-account-button-link">
              Already have account?
            </Link>
          </button>
        </form>
      </div>
    )
  }
}

export default Register

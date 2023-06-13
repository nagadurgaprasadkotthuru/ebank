import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {isShowErrorMsg: false, errorMessage: '', userId: '', pin: ''}

  onChangeUserId = event => this.setState({userId: event.target.value})

  onChangePin = event => this.setState({pin: event.target.value})

  onSubmitSuccess = jwtToken => {
    this.setState({isShowErrorMsg: false, errorMessage: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 3, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMessage =>
    this.setState({isShowErrorMsg: true, errorMessage})

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const requestUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(requestUrl, options)
    const data = await response.json()
    this.setState({userId: '', pin: ''})
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isShowErrorMsg, errorMessage, userId, pin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="form-image-container">
          <div className="image-container">
            <img
              className="login-image"
              alt="website login"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            />
          </div>
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Welcome Back!</h1>
              <label className="label" htmlFor="user-id">
                User ID
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter User ID"
                id="user-id"
                value={userId}
                onChange={this.onChangeUserId}
              />
              <label className="label" htmlFor="user-pin">
                PIN
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter PIN"
                id="user-pin"
                value={pin}
                onChange={this.onChangePin}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {isShowErrorMsg && <p className="error-msg">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage

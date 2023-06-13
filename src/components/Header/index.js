import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="nav-bar">
      <img
        className="website-logo"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
      />
      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)

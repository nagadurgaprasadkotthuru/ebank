import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-container">
      <h1 className="main-heading">Your Flexibility, Our Excellence</h1>
      <img
        className="digital-card"
        alt="digital card"
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
      />
    </div>
  </div>
)

export default Home

import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Image from '../assets/rpg.jpeg'


const Home = () => {
  return (
    <div className="home-container" style={{backgroundImage: `url(${Image})`}}>
      <div className="title-home">Welcome to </div>

      <div className="info-text">
        <p>Get started by creating a new account. It's quick and easy!</p>
        <p>If you already have an account, simply log in to get started.</p>
      </div>

      <div className="button-container">
        <Link to="http://localhost:4000/register" className="button pulse" >Create a new account</Link>
        <span className="login-link">Already have an account? <Link to='http://localhost:4000/login' className='login-home-link'>Login</Link></span>
      </div>
    </div>
  )
}

export default Home

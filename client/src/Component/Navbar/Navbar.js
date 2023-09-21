import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
    const navigate = useNavigate();
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const handleLogout = () => {
        sessionStorage.removeItem('user')
        dispatch({ type: "LOGOUT" })
        navigate('/home')
    }
  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-light">

              <div className="container">

                  <button
                      className="navbar-toggler"
                      type="button"
                      data-mdb-toggle="collapse"
                      data-mdb-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                  >
                      <i className="fas fa-bars"></i>
                  </button>


                  <div className="collapse navbar-collapse" id="navbarSupportedContent">

                      <Link to={'/home'} className="navbar-brand mt-2 mt-lg-0" >
                          <span className='brand-name'>Stay</span>cation
                      </Link>

                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                          <li className="nav-item">
                              <a className="nav-link" href="#">Home</a>
                          </li>
                          <li className="nav-item">

                              <a className="nav-link" href="#">Bookings</a>

                          </li>
                          <li className="nav-item">

                              <a className="nav-link" href="#">About</a>

                          </li>
                          <li className="nav-item">

                              <a className="nav-link" href="#">Contact</a>

                          </li>
                      </ul>
                      {
                          user ?

                              <div className='name-container'>
                                  <div className='name-content'>
                                      <AccountCircleIcon fontSize='large' sx={{ color: 'rgb(102, 178, 255)' }} />
                                      <div className='username'>
                                          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}    
                                      </div>
                                      
                                  </div>
                                  <div className="dropdown">
                                      <a
                                          className="dropdown-toggle d-flex align-items-center"
                                          id="navbarDropdownMenuAvatar"
                                          href='#'
                                          role="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          aria-haspopup="true"
                                      >
                                          {/* <MenuIcon fontSize='small' sx={{ mt: '5px' }} /> */}
                                          <ArrowDropDownIcon fontSize='small' sx={{ mt: '7px' }} />
                                      </a>
                                      <ul
                                          className="dropdown-menu dropdown-menu-end"
                                          aria-labelledby="navbarDropdownMenuAvatar"
                                      >
                                          <li>
                                              <Button className="dropdown-item" startIcon={<LogoutIcon />} onClick={handleLogout}>Logout</Button>
                                          </li>
                                      </ul>
                                  </div>
                              </div>

                              : ""
                      }
                      {!user ?
                          <div className='login-signup'>
                              <button type="button" class="btn btn-outline-dark" onClick={() => navigate('/login')}>Login <ArrowForwardIcon /></button>
                          </div> : ""
                      }


                  </div>

              </div>

          </nav>
    </div>
  )
}

export default Navbar

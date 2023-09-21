import "./login.scss"
import React, { useContext } from 'react'
import {useState} from 'react'
import img1 from '../../images/login-img.jpg'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {user,loading,error,dispatch}=useContext(AuthContext)
    const [errors,setErrors]=useState({})
    const validateEmail = (event) => {
        const mail = event.target.value;
        setEmail(mail);
        if (!/\S+@\S+\.\S+/.test(mail) || mail.trim() === "") {
            setErrors({ ...errors, ["email"]: "Please enter a valid email" });
        } else {
            delete errors.email;
        }
    }

    // Function to validate password input
    const validatePassword = (event) => {
        const pass = event.target.value;
        setPassword(pass);
        if (pass === "") {
            setErrors({ ...errors, ["password"]: "Password is required" });
        } else {
            delete errors.password;
        }
    }
    const loginUser = async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        const credentials = {
            email,
            password,
        }
        if (!errors.email && !errors.password) {
            try {
                const res = await axios.post("/auth/login", credentials)
              if (res.data.isAdmin) {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
                navigate('/')
              } else {
                  dispatch({ type: "LOGIN_FAILED", payload: { message: "You are not Admin" } })
                  setErrors({...errors,["unauthorized"]:"Access Denied"})
              }
            } catch (err) {
                dispatch({ type: "LOGIN_FAILED", payload: err.response?.data })
                setErrors({...errors,["unauthorized"]:"Wrong username or password"})
            }
        } else {
            alert('Please enter details')
        }
    }
  return (
    <div>
          <section className="vh-100" style={{ backgroundColor: 'rgb(102, 178, 255)' }}>
              <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                      <div className="col col-xl-10">
                          <div className="card" style={{ borderRadius: '1rem' }}>
                              <div className="row g-0">
                                
                                  <div className="col-md-6 col-lg-7 d-flex">
                                      <div className="card-body p-4 p-lg-5 text-black">

                                          <form>

                                              <div className="d-flex align-items-center mb-3 pb-1">
                                                  {/* <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i> */}
                                                  <span className="h1 fw-bold mb-0">Sign In</span>
                                              </div>

                                              <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>SignIn in your account</h5>

                                              <div className="form-outline mb-4">
                                                  <label className="form-label" for="email">Email address</label>
                                                  <input type="email" id="form2Example17" className={errors.email !== undefined ? "form-control form-control-lg invalid" : "form-control form-control-lg"} placeholder='your@gmail.com' value={email} onChange={e => {
                                                      validateEmail(e)
                                                      errors.unauthorized=undefined
                                                    }
                                                  } />
                                                  {errors.email && <span className='errorMessage'>{errors.email}</span>}
                                              </div>

                                              <div className="form-outline mb-4">
                                                  <label className="form-label" for="password">Password</label>
                                                  <input type="password" id="form2Example27" className={errors.password !== undefined ? "form-control form-control-lg invalid" : "form-control form-control-lg"} placeholder='password' value={password} onChange={e => {
                                                      validatePassword(e)
                                                      errors.unauthorized=undefined
                                                    }
                                                  } />
                                                  {errors.password && <span className='errorMessage'>{errors.password}</span>}
                                              </div>
                                              {errors.unauthorized && <span className='errorMessage'>{ errors.unauthorized}</span> }
                                              <div className="pt-1 mb-4">
                                                  <button className="btn btn-light btn-lg btn-block login-btn" type="button" onClick={(e)=>loginUser(e)}>LogIn</button>
                                              </div>

                                              {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                                              {/* <a href="#!" className="small text-muted">Terms of use.</a>
                        <a href="#!" className="small text-muted">Privacy policy</a> */}
                                          </form>

                                      </div>
                                  </div>
                                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                                      <img src={img1}
                                          alt="login form" className="img-fluid" style={{ borderRadius: '0 1rem 1rem 0', height: '100%' }} />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </div>
  )
}

export default Login
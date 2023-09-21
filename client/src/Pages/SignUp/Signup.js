import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import img from '../../images/signup-img.jpg'
import './Signup.css';
const Signup = () => {
  const [username, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateName = (e) => {
    const userName = e.target.value;
    setName(userName);
    if (userName.trim() === "") {
      setErrors({...errors,['name']:'Please enter your username'})
    } else {
      delete errors.name;
    }
  }
  const validateEmail = (e) => {
    const mail = e.target.value;
    setEmail(mail)
     if (mail.trim() === "") {
        setErrors({ ...errors, ["email"]: "Please enter your email address" });
      }
     else if (!/\S+@\S+\.\S+/.test(mail)) {
        setErrors({ ...errors, ["email"]: "Please enter a valid email address" });
      }  else {
        delete errors.email;
      }
  }
  const validatePassword = (e) => {
    const pass = e.target.value
    setPassWord(pass)
     if (pass === "") {
      setErrors({
        ...errors,
        ["password"]:
          "Please enter the password ",
      });
    }
    else if (
      pass.length < 7 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,15}/.test(password)
    ) {
      setErrors({
        ...errors,
        ["password"]:
          "Password should contain at least 8 characters, 1 special character, and 1 uppercase letter",
      });
    }
    else {
      delete errors.password;
    }
  }
  const registerUser = async () => {
    console.log('function called')
    const data = {
      username,
      email,
      password,
    }
    if (!errors.name && !errors.email && !errors.password) {
      await axios.post('/auth/register', data)
        .then((res) => {
          alert("User registered successfully")
          navigate('/login')
        }
      ).catch((err) => {
        if (err.request.status == 403) {
          alert('Invalid Username or password','error')
        } else {
          alert('Something went wrong','error')
        }
      }) 
    } else {
      alert('Invalid details entered')
    }
    
  }
  return (
    <div>
      <section className="h-100" style={{ backgroundColor: 'rgb(102, 178, 255)'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: '1rem'}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={img}
                      alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem',height:'100%'}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex signup-col">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          {/* <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i> */}
                          <span className="h1 fw-bold mb-0">Sign Up</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Create a new Account</h5>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="name">UserName</label>
                          <input type="name" id="name" className={errors.name !== undefined ? "form-control form-control-lg invalid" : "form-control form-control-lg" }  placeholder='Firstname Lastname' value={username} onChange={e => validateName(e)} />
                          {errors.name && <span className='errorMessage'>{errors.name}</span>}
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example17">Email address</label>
                          <input type="email" id="form2Example17" className={errors.email !== undefined ? "form-control form-control-lg invalid" : "form-control form-control-lg"} placeholder='xyz@gmail.com' value={email} onChange={e=>validateEmail(e) } />
                          {errors.email && <span className='errorMessage'>{errors.email}</span>}
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example27">Password</label>
                          <input type="password" id="form2Example27" className={errors.password !== undefined ? "form-control form-control-lg invalid" : "form-control form-control-lg"} placeholder='password' value={password} onChange={e=> validatePassword(e) } />
                          {errors.password && <span className='errorMessage'>{errors.password}</span>}
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-light btn-lg btn-block" type="button" onClick={()=>registerUser() }>Register</button>
                        </div>

                        {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <Link 
                          style={{color: '#393f81'}} to={'/login'}>Login here</Link></p>
                        {/* <a href="#!" className="small text-muted">Terms of use.</a>
                        <a href="#!" className="small text-muted">Privacy policy</a> */}
                      </form>

                    </div>
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

export default Signup

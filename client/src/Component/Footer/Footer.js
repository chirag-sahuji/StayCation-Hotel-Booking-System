import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <section>
        
        <footer className="text-center footer">
          
          <div className="container p-4">
            
            <div className="row">
              
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h1><strong><span className='title'>Stay</span>Cation</strong></h1>

                <p>
                  Welcome to StayCation.com !
                  Your comfort and convenience are our top priorities.
                  Explore our range of accommodations and book your dream stay with ease.
                </p>
              </div>
              
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 >Support</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <span className="footer-links">Help & Support</span>
                  </li>
                  <li>
                    <span className="footer-links">Privacy Policy</span>
                  </li>
                  <li>
                    <span className="footer-links">Terms & Conditions</span>
                  </li>
                </ul>
              </div>
              
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="mb-0">Follow Us</h5>

                <ul className="list-unstyled">
                  <li>
                    <span className="footer-links"><LinkedInIcon/> Linkedin</span>
                  </li>
                  <li>
                    <span className="footer-links"><InstagramIcon/> Instagram</span>
                  </li>
                  <li>
                    <span className="footer-links"><TwitterIcon /> Twitter</span>
                  </li>
                  <li>
                    <span className="footer-links"><FacebookIcon/> Facebook</span>
                  </li>
                </ul>
              </div>
              
            </div>
            
          </div>
         

          
          <div className="text-center p-3" >
            © 2023 Copyright:
            <a> StayCation.com</a>
          </div>
          
        </footer>
        
      </section>
    </div>
  )
}

export default Footer

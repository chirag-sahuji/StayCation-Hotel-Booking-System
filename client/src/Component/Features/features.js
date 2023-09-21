import React, { useState } from 'react'
import './features.css'
import img from '../../images/homepage_img1.jpg'; 
import img2 from '../../images/homepage_img2.jpg';
import img3 from '../../images/homepage_img3.jpg';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
const Features = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=New Delhi,Mumbai,Bangalore")

    const navigate = useNavigate()
    
    
    return (
      <div>
          <div className='container'>
              <div className='explore-title'>
                  <h4>Explore Hotels</h4>
                  <span>
                      These popular destinations have a lot to offer
                  </span>
              </div>
                {loading ? ("Loading please wait") : <div className="row row-cols-1 row-cols-md-3 g-4 featured-row">
                    <div className="col">
                        <div class="card" >
                            <img src={img} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">New Delhi</h5>
                                <p class="card-text">{data[0]} properties</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card" >
                            <img src={img2} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Mumbai</h5>
                                <p class="card-text"> {data[1]} properties</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card">
                            <img src={img3} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Bangalore</h5>
                                <p class="card-text">{data[2]} properties</p>
                            </div>
                        </div>
                    </div>
                </div>}  
          </div>     
    </div>
  )
}

export default Features

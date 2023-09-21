import React from 'react'
import './propList.css'
import img1 from '../../images/homepage_img4.jpg'
import img2 from '../../images/homepage_img5.jpg'
import img3 from '../../images/homepage_img6.jpg'
import img4 from '../../images/homepage_img7.jpg'
import img5 from '../../images/homepage_img8.jpg'
import useFetch from '../../hooks/useFetch'
const PropList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType")
    const images = [img1, img2, img3, img4, img5]

  return (
    <div>
        <div className='container'> 
            <h4 className='prop-title'>Browse by property type</h4>      
              <div className="row row-cols-1 row-cols-md-5 g-4 property-row">
              {loading ? ("Loading please wait") :
                  (<>
                      { data && images.map((img, i) => (
                      
                          <div className="col" key={i}>
                              <div class="card">
                                  <img src={img} class="card-img-top" alt="..." />
                                  <div class="card-body">
                                          <h5 class="card-title">{data[i]?.type }</h5>
                                          <p class="card-text">{data[i]?.count} {data[i]?.type }</p>
                                  </div>
                              </div>
                          </div>
       
                  )) 
                      }</>)
                  }
              </div>
        </div>
    </div>
  )
}

export default PropList

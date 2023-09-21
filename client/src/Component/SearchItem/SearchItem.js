import React from 'react'
import './SearchItem.css'
import { Link } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const SearchItem = ({item}) => {
  return (
    <div>
          <div className="searchItem">
              <img
                  src={item.photos[0]}
                  alt=""
                  className="siImg"
              />
              <div className="siDesc">
                  <h1 className="siTitle">{item.name}</h1>
                  <span className="siDistance">{item.distance} from center</span>
                  <span className="siTaxiOp">Free airport taxi</span>
                  {/* <span className="siSubtitle">
                      Studio Apartment with Air conditioning
                  </span> */}
                  <span className="siFeatures">
                      {item.desc.length > 50 ?  item.desc.slice(0,50) : item.desc}
                  </span>
                  <span className="siCancelOp">Free cancellation </span>
                  <span className="siCancelOpSubtitle">
                      You can cancel later, so lock in this great price today!
                  </span>
              </div>
              <div className="siDetails">
                  {item.rating && <div className="siRating">
                      <span>Excellent</span>
                      <button>{ item.rating}</button>
                  </div>}
                  <div className="siDetailTexts">
                      <span className="siPrice"><CurrencyRupeeIcon />{item.cheapestPrice}</span>
                      <span className="siTaxOp">Includes taxes and fees</span>
                      <Link to={`/hotels/${item._id}`}>
                          <button className="siCheckButton">See availability</button>
                      </Link>
                      
                  </div>
              </div>
          </div>
    </div>
  )
}

export default SearchItem

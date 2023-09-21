import React,{useContext, useState} from 'react'
import Footer from '../../Component/Footer/Footer'
import Navbar from '../../Component/Navbar/Navbar'
import './HotelDetail.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Booking from '../../Component/Booking/Booking';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const HotelDetail = () => {
    const navigate=useNavigate()
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal,setOpenModal]=useState(false)
    const { data, loading, error } = useFetch(`/hotels/find/${id}`)
    const { dates,options } = useContext(SearchContext)
    const { user } = useContext(AuthContext)
    
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const date_end = new Date(date1)
        const date_start= new Date(date2)
        const timeDiff = Math.abs(date_start.getTime() - date_end.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    const days = dayDifference(dates[0].endDate, dates[0].startDate);
   
    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };
    const handleClick = () => {
        if (user) {
            setOpenModal(true)
        } else {
            navigate('/login')
        }
    }
  return (
    <div>
          <Navbar />
          {loading ? "Loading" :
              <div className="hotelContainer">
              {open && (
                  <div className="slider">
                      <CancelIcon
                          className="close"
                          onClick={() => setOpen(false)}
                      />
                      <ArrowCircleLeftIcon
                          className="arrow"
                          onClick={() => handleMove("l")}
                      />
                      <div className="sliderWrapper">
                          <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                      </div>
                      <ArrowCircleRightIcon
                          className="arrow"
                          onClick={() => handleMove("r")}
                      />
                  </div>
              )}
              <div className="hotelWrapper">
                  <button className="bookNow">Reserve or Book Now!</button>
                      <h1 className="hotelTitle">{ data.name}</h1>
                  <div className="hotelAddress">
                      {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                          <span><LocationOnIcon />{ data.address}</span>
                  </div>
                  <span className="hotelDistance">
                      Excellent location – {data.distance}m from center
                  </span>
                  <span className="hotelPriceHighlight">
                      Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                  </span>
                  <div className="hotelImages">
                      {data.photos?.map((photo, i) => (
                          <div className="hotelImgWrapper" key={i}>
                              <img
                                  onClick={() => handleOpen(i)}
                                  src={photo}
                                  alt=""
                                  className="hotelImg"
                              />
                          </div>
                      ))}
                  </div>
                  <div className="hotelDetails">
                      <div className="hotelDetailsTexts">
                              <h1 className="hotelTitle">{ data.title}</h1>
                          <p className="hotelDesc">
                              {data.desc}
                          </p>
                      </div>
                      <div className="hotelDetailsPrice">
                              <h1>Perfect for a { days}-night stay!</h1>
                          <span>
                              Located in the real heart of New Delhi, this property has an
                              excellent location score of 9.8!
                          </span>
                          <h2>
                                  <b><CurrencyRupeeIcon />{ days * data.cheapestPrice * options.room }</b> ({days} nights)
                          </h2>
                          <button onClick={handleClick}>Reserve or Book Now!</button>
                      </div>
                  </div>
              </div>
          </div>}
          <Footer />
          {openModal && <Booking setOpen={setOpenModal} hotelId={id} cheapestPrice={data.cheapestPrice} />}
    </div>
  )
}

export default HotelDetail

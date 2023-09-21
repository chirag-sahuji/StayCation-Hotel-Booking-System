import React, { useContext, useState } from 'react'
import './Booking.css'
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
const Booking = ({ setOpen, hotelId, cheapestPrice }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)

    const { dates,options } = useContext(SearchContext)
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    };
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const days=allDates.length-1
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime()))
        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(
            checked ?
                [...selectedRooms, value]
                :
                selectedRooms.filter((item) => item !== value))
        
    }
    const handlePayment = async(amount) => {
        const { data: { order } } = await axios.post('/payment/checkout', {
            amount:amount
        })
        var options = {
            key: "rzp_test_ogVYEPD3pGJPYi", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Persistent corp.",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                Swal.fire('Congratulations', 'Your Room is booked successfully', 'success')
            },
            prefill: {
                name: "Chirag Sahuji",
                email: "chirag_sahuji@persistent.com",
                contact: "7658943241"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }
    const handleClick = async() => {
        try {
            
            if (selectedRooms.length !== 0) {
                handlePayment(amount)
                await Promise.all(
                    selectedRooms.map((roomId) => {
                        const res = axios.put(`/rooms/available/${roomId}`, {
                            dates: allDates,
                        });
                        return res.data;
                    })
                )
                setOpen(false)
                
            } else {
                alert('Please select a room')
            }
        }catch(err){}
    }
    const amount = days * cheapestPrice * options.room
    return (
    <div>
          <div className="reserve">
              <div className="rContainer">
                  <CancelIcon
                      className="rClose"
                      onClick={() => setOpen(false)}
                  />
                  <span>Select your rooms:</span>
                  {data.map((item) => (
                      <div className="rItem" key={item._id}>
                          <div className="rItemInfo">
                              <div className="rTitle">{item.title}</div>
                              <div className="rDesc">{item.desc}</div>
                              <div className="rMax">
                                  Max people: <b>{item.maxPeople}</b>
                              </div>
                              {/* <div className="rPrice">{item.price }</div> */}
                          </div>
                          <div className="rSelectRooms">
                              {item.roomNumber.map((roomNumber) => (
                                  <div className="room">
                                      <label>{roomNumber.number}</label>
                                      <input
                                          type="checkbox"
                                          value={roomNumber._id}
                                          onChange={handleSelect}
                                          disabled={!isAvailable(roomNumber)}
                                      />
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
                    {/* <div>Total : {}</div> */}
                  <button onClick={handleClick} className="rButton">
                      Reserve Now!
                  </button>
              </div>
          </div> 
    </div>
  )
}

export default Booking

import React, { useContext,useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './header.css'
import { Button } from '@mui/material';
import { useNavigate,Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { DateRange } from 'react-date-range';
import {format} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Navbar from '../Navbar/Navbar';
import { SearchContext } from '../../context/SearchContext';
const Header = ({type}) => {
    const navigate = useNavigate();

    const [destination,setDestination]=useState("")
    const [openDate,setOpenDate]=useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key:'selection'
        }
    ])
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adults: 1,
        children: 0,
        room:1
    })
    const handleOption = (name,op) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]  : op==='i' ? options[name]+1: options[name]-1 ,
            } 
        })
    }
    const {dispatch}=useContext(SearchContext)
    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
        navigate('/hotels',{state:{destination,dates,options}})
    }
    
    return (
        <div>
            <Navbar />
            {
                type !== "list" && (
                    <>
                        <header>
                            <div className='image-container'>
                                <div className='row row-header'>
                                    <div>
                                        <h2 className='image-text'>Find your perfect place to stay</h2>
                                    </div>
                                </div>
                                <div className='headerSearch'>
                                    <div className='headerSearchItem'>
                                        <HotelIcon />
                                        <input type='text' className='headerSearchInput' placeholder='Where are you going' onChange={e => setDestination(e.target.value)} />
                                    </div>
                                    <div className='headerSearchItem'>
                                        <CalendarMonthIcon />
                                        {/* <input type='text' className='headerSearchInput' placeholder='Where are you going' /> */}
                                        <span onClick={() => { setOpenDate(!openDate); setOpenOptions(false) }} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                        {openDate && <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDates([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={dates}
                                            className='date'
                                        />}
                                    </div>
                                    <div className='headerSearchItem'>
                                        <PersonIcon />
                                        {/* <input type='text' className='headerSearchInput' placeholder='Where are you going' /> */}
                                        <span onClick={() => { setOpenOptions(!openOptions); setOpenDate(false) }} className='headerSearchText'>{`${options.adults} adult . ${options.children} children . ${options.room} room`}</span>
                                        {openOptions &&
                                            <div className='options'>
                                                <div className='optionItem'>
                                                    <span className='optionText'>Adult</span>
                                                    <div className='optionCounter'>
                                                        <button className='optionCounterButton' disabled={options.adults <= 1} onClick={() => handleOption('adults', 'd')}>-</button>
                                                        <span className='optionCounterNumber'>{options.adults}</span>
                                                        <button className='optionCounterButton' onClick={() => handleOption('adults', 'i')}>+</button>
                                                    </div>
                                                </div>
                                                <div className='optionItem'>
                                                    <span className='optionText'>Children</span>
                                                    <div className='optionCounter'>
                                                        <button className='optionCounterButton' disabled={options.children <= 0} onClick={() => handleOption('children', 'd')}>-</button>
                                                        <span className='optionCounterNumber'>{options.children}</span>
                                                        <button className='optionCounterButton' onClick={() => handleOption('children', 'i')}>+</button>
                                                    </div>
                                                </div>
                                                <div className='optionItem'>
                                                    <span className='optionText'>Room</span>
                                                    <div className='optionCounter'>
                                                        <button className='optionCounterButton' disabled={options.room <= 1} onClick={() => handleOption('room', 'd')}>-</button>
                                                        <span className='optionCounterNumber'>{options.room}</span>
                                                        <button className='optionCounterButton' onClick={() => handleOption('room', 'i')}>+</button>
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                    <div className='headerSearchItem'>
                                        <button className='btn headerBtn' onClick={handleSearch}>
                                            Search
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </header>
                    </>
                )
            }         
        </div>
    )
}

export default Header

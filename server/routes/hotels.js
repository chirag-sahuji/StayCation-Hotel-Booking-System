import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotelS, getHotel, getHotelRooms, getHotelsByCity, updateHotel } from '../controllers/hotel.js';

import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/',verifyAdmin, createHotel);

router.put('/:id',verifyAdmin, updateHotel)

router.get('/find/:id',getHotel)

router.get('/',getAllHotelS)

router.delete('/:id', verifyAdmin, deleteHotel)

router.get('/countByCity', countByCity);
router.get('/countByType',countByType)
router.get('/room/:id', getHotelRooms)
router.get('/getByCity',getHotelsByCity)
export default router
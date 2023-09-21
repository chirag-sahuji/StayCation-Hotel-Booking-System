import express from 'express';
import { createRoom,updateRoom,getRoom,getAllRooms,deleteRoom, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/:hotelid', verifyAdmin, createRoom);

router.put('/:id', verifyAdmin, updateRoom)

router.put('/available/:id', updateRoomAvailability);

router.get('/:id', verifyAdmin, getRoom)

router.get('/', getAllRooms)

router.delete('/:id', deleteRoom)

export default router
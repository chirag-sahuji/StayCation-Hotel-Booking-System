import express from 'express';
import { deleteUser, getAllUserS, getUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
const router = express.Router();



router.put('/:id',verifyUser, updateUser)

router.get('/:id',verifyUser, getUser)

router.get('/',verifyAdmin, getAllUserS)

router.delete('/:id',verifyUser, deleteUser)


export default router
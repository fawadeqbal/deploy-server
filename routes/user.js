import express from 'express';
import { registration,getUser,deleteUser } from '../controller/user.js';

const router = express.Router();

// User Registration Endpoint
router.post('/', registration);
router.get('/', getUser);
router.delete('/:userId', deleteUser);

export default router;

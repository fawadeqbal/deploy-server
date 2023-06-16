import express from 'express';
import { registration } from '../controller/registration.js';

const router = express.Router();

// User Registration Endpoint
router.post('/', registration);

export default registration;

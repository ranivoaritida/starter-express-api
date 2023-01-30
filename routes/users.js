import express from 'express';
import {getUser, signin,signup } from '../controllers/user.js';

const router = express.Router();

//localhost:4000/user

router.get('/',getUser);
router.post('/signin',signin);
router.post('/signup',signup);



export default router;
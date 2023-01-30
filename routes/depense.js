import express from 'express';
import { createDepense, getDepense } from '../controllers/depense.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/depense


router.get('/',auth,getDepense);    //getAllCout
router.post('/',auth,createDepense);

export default router;
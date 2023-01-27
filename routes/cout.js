import express from 'express';
import { getCout,createCout,insertAvance,validationAvance,getCoutById} from '../controllers/cout.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/coutxx


router.get('/',getCout);    //getAllCout
router.get('/:id',getCoutById);
router.post('/',createCout); 
router.patch('/:id',insertAvance); //inserer une avance en donnant id de reparation
router.patch('/:id/validation',validationAvance); // validation d'une avance en donnant id de l'avance en question

export default router;
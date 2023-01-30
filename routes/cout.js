import express from 'express';
import { getCout,createCout,insertAvance,validationAvance,getCoutById,getCoutTotalPaye} from '../controllers/cout.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/coutxx


router.get('/',auth,getCout);    //getAllCout
router.get('/totalPaye',auth,getCoutTotalPaye);
router.get('/:id',auth,getCoutById);
router.post('/',auth,createCout); 
router.patch('/:id/avance',auth,insertAvance); //inserer une avance en donnant id de reparation
router.patch('/:id/validation',auth,validationAvance); // validation d'une avance en donnant id de l'avance en question

export default router;
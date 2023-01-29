import express from 'express';
import { getCoutTotalPayeParJour, getCoutTotalPayeParMois,getReparationMoyenne} from '../controllers/stat.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/coutxx


router.get('/jour',getCoutTotalPayeParJour);
router.get('/mois',getCoutTotalPayeParMois);
router.get('/reparation',getReparationMoyenne);

export default router;
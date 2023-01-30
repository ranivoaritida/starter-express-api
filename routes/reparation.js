import express from 'express';
import { getReparation,createReparation,updateReparation,getReparationById,getReparationAValider,valideBonSortie,getCount} from '../controllers/reparation.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/reparation
router.get('/',auth,getReparation);
router.get('/count',auth,getCount); //nbr total de reparation
router.get('/notValidate',auth,getReparationAValider); // liste des voitures pas encore valide
router.get('/:id',auth,getReparationById);
router.post('/',auth,createReparation);
router.patch('/:id',auth, updateReparation);
router.patch('/:id/valider',auth,valideBonSortie);

export default router;
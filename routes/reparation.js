import express from 'express';
import { getReparation,getReparationValider,createReparation,updateReparation,getReparationById,getReparationAValider,valideBonSortie,getCount} from '../controllers/reparation.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/reparation
router.get('/',auth,getReparation);
router.get('/count',auth,getCount); //nbr total de reparation
router.get('/notValidate',auth,getReparationAValider); // liste des voitures pas encore validees
router.get('/validate',auth,getReparationValider); // liste des voitures validees

router.get('/:id',auth,getReparationById);
router.post('/',auth,createReparation);
router.patch('/:id',auth, updateReparation);
router.patch('/:id/valider',auth,valideBonSortie);

export default router;
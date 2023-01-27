import express from 'express';
import { getReparation,createReparation,updateReparation,getReparationById,getReparationAValider,valideBonSortie,getCount} from '../controllers/reparation.js';
import auth from '../middleware/auth.js';


const router = express.Router();

//localhost:4000/reparation
router.get('/',getReparation);
router.get('/count',getCount); //nbr total de reparation
router.get('/notValidate',getReparationAValider); // liste des voitures pas encore valide
router.get('/:id',getReparationById);
router.post('/',createReparation);
router.patch('/:id', updateReparation);
router.patch('/:id/valider',valideBonSortie);

export default router;
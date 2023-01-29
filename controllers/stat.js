import Cout from "../models/cout.js";
import Reparation from "../models/reparation.js";
import mongoose from "mongoose";

export const getCoutTotalPayeParJour = async (req, res) => {

    try {
        const query = " sum(piece.cout)";
        //{ month : { $month : "dateReception" } ,year: { $year: "$dateReception" }}
        const cout = await Cout.aggregate([{
            $unwind: {
                path: "$avance",
                preserveNullAndEmptyArrays: true
            }
        },{$match: { "avance.validation": true } },
            {
            $group: {
                _id: { day :{ $dayOfYear: "$avance.date" } , month: { $month: "$avance.date"}, year: { $year:"$avance.date"}},
                coutTotalPaye: { $sum :"$avance.montant"} ,
                count:{ $sum: 1 }
            }
            }
        ]);
        res.status(200).json(cout);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCoutTotalPayeParMois = async (req, res) => {

    try {
        const cout = await Cout.aggregate([{
            $unwind: {
                path: "$avance",
                preserveNullAndEmptyArrays: true
            }
        },{$match: { "avance.validation": true } },
            {
            $group: {
                _id: {month: { $month: "$avance.date"}, year: { $year:"$avance.date"}},
                coutTotalPaye: { $sum :"$avance.montant"} ,
                count:{ $sum: 1 }
            }
            }
        ]);
        res.status(200).json(cout);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReparationMoyenne = async (req, res) => {

    try {
        const reparation = await Reparation.aggregate([{
            $unwind: {
                path: "$aFaire",
                preserveNullAndEmptyArrays: true
            }
        },{$match: { "aFaire.dureeExact": { 

                        $exists: true, 
                        $ne: null,
                        $ne:0 }} },

            {
            $group: {
                _id: "",
                nbrTotalHeure: { $sum :"$aFaire.dureeExact"} ,
                nbrVoiture:{ $sum: 1 },
            }
            }
        ]);

        res.status(200).json(reparation[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
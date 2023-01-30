import Cout from "../models/cout.js";
import Depense from "../models/depense.js";
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

 const getChiffreMois = async () => {

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
        return cout;
    } catch (error) {
        console.log(error);
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
                _id: null,
                nbrTotalHeure: { $sum :"$aFaire.dureeExact"} ,
                nbrReparation:{ $sum: 1 },
            }
            },
            { $project: { _id: 0 } }
        ]);

        res.status(200).json(reparation[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBenefice = async (req, res) => {

    try {

        const chiffreDaffaire = await getChiffreMois();
        const depense = await Depense.find();

        console.log(depense[0]);
         console.log(1+depense[0].date.getMonth());
        console.log("mitovy");

        console.log(chiffreDaffaire[0]);
        console.log(chiffreDaffaire[0]._id.month);
        for(var i = 0; i < depense.length; i++){
            for(var a = 0; a < chiffreDaffaire.length; a++){
                
                if((1+depense[i].date.getMonth())==chiffreDaffaire[a]._id.month){
                    console.log("miditra");

                    chiffreDaffaire[a].coutTotalPaye=chiffreDaffaire[a].coutTotalPaye-depense[i].totale;
                    console.log(chiffreDaffaire[a].coutTotalPaye);
                }
            }
        }
        res.status(200).json(chiffreDaffaire);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
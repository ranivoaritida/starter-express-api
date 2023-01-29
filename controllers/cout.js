import Cout from "../models/cout.js";
import Reparation from "../models/reparation.js";
import mongoose from "mongoose";

export const getCout = async (req, res) => {

    try {
        const cout = await Cout.find();

        res.status(200).json(cout);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getCoutById = async (req, res) => {
    const { id } = req.params;
    try {
        const cout = await Cout.findById(id);

        res.status(200).json(cout);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getCoutByAvanceId = async (id) => {

        var query = {"avance._id":id};
        try {
            const cout = await Cout.find(query);

            return cout;
        } catch (error) {
            console.log(error);
        }
}

const coutTotalPiece = async (idReparation) => {
    try {
        const cout = await Cout.aggregate([{
            $unwind: {
                path: "$piece",
                preserveNullAndEmptyArrays: true
            }},
            {$match: { "idReparation": idReparation } },
            {
            $group: {
                _id:null,
                coutTotalPaye: { $sum :"$piece.cout"} ,
                count:{ $sum: 1 }
            }
            }
        ]);
        return cout
    } catch (error) {
        console.log(error);
    }
}



    export const getCoutTotalPaye = async (req, res) => {

    try {
        const query = " sum(piece.cout)";
        //{ month : { $month : "dateReception" } ,year: { $year: "$dateReception" }}
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
                coutTotalPaye: { $sum :"$aFaire.dureeExact"} ,
                count:{ $sum: 1 }
            }
            }
        ]);

        res.status(200).json(reparation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const TotalAvanceValide = async (idReparation) => {
    try {
        const cout = await Cout.aggregate([{
            $unwind: {
                path: "$avance",
                preserveNullAndEmptyArrays: true
            }
        },{$match: { "avance.validation": true ,"idReparation": idReparation } },
            {
            $group: {
                _id: null,
                coutTotalPaye: { $sum :"$avance.montant"} ,
                count:{ $sum: 1 }
            }
            }
        ]);
        return cout
    } catch (error) {
        console.log(error);
    }
}

export const createCout = async (req,res) => {
    const cout = req.body;
    const newPost = new Cout (cout);
    try {

        await newPost.save();

        const newReparation = await Cout.findById(newPost._id);
        
        const totalePiece=  await coutTotalPiece(newReparation.idReparation);
        //console.log(totalePiece[0].coutTotalPaye);
        newReparation.coutTotalPiece=totalePiece[0].coutTotalPaye;
        newReparation.coutTotale=newReparation.coutReparation+totalePiece[0].coutTotalPaye;

        const updatedPost = await Cout.findByIdAndUpdate(newReparation._id, newReparation ,{new : true});

        
        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}



export const insertAvance = async (req,res) => {
    const { id:_id} = req.params;
    const { date,montant } = req.body;
    const data = {
        date:date,
        montant:montant,
        validation:false
    };
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Pas de reparation avec cette id ');
        const reparation = await Cout.findById(_id);
        reparation.avance.push(data);
     
        const updatedAvance = await Cout.findByIdAndUpdate(_id, reparation ,{new : true});

        res.json(updatedAvance);
 }



 export const validationAvance = async (req,res) => {

    const { id:_id} = req.params;
    
    await Cout.updateOne({
                "avance._id" : _id
        },{
            "$set" : {
                "avance.$.validation" : true
            }
        });

        const newReparation = await getCoutByAvanceId(_id); 
        console.log(newReparation);
        
        const totaleAvance=  await TotalAvanceValide(newReparation[0].idReparation);
        console.log(totaleAvance);
        newReparation[0].coutTotalePaye=totaleAvance[0].coutTotalPaye;
        newReparation[0].resteAPayer=newReparation[0].coutTotale-totaleAvance[0].coutTotalPaye;
 
        const cout = await Cout.findByIdAndUpdate(newReparation[0]._id, newReparation[0] ,{new : true});
 
       res.json(cout);
   
 }
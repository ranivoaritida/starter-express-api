import Depense from "../models/depense.js";
import mongoose from "mongoose";

export const getDepense = async (req, res) => {

    try {
        const depense = await Depense.find();

        res.status(200).json(depense);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createDepense = async (req,res) => {
    const depense = req.body;
    const newPost = new Depense (depense);

    try {

        await newPost.save();

        const newDepense = await Depense.findById(newPost._id);
        
        newDepense.totale=newDepense.salaire+newDepense.loyer+newDepense.achatPiece+newDepense.autreDepense;

        const updatedPost = await Depense.findByIdAndUpdate(newDepense._id, newDepense ,{new : true});

        
        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}
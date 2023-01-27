import Voiture from "../models/voiture.js";
import mongoose from "mongoose";

export const getVoiture = async (req, res) => {

    try {
        const voiture = await Voiture.find();

        res.status(200).json(voiture);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getVoitureById = async (req, res) => {
    const { id } = req.params;
    try {
        const voiture = await Voiture.findById(id);

        res.status(200).json(voiture);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createVoiture = async (req,res) => {
    const voiture = req.body;
    const newPost = new Voiture ({...voiture,idProprietaire:req.userId});
    console.log(req.userId);

    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updateVoiture = async (req,res) => {
    const { id:_id} = req.params;
    const voiture = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Pas de voiture avec cette id ');

    const updatedPost = await Voiture.findByIdAndUpdate(_id, voiture ,{new : true});
    res.json(updatedPost);
 }

 export const getCount = async (req, res) => {

    try {
        const cout = await Voiture.count();
        res.status(200).json(cout);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
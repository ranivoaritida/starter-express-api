import Reparation from "../models/reparation.js";
import mongoose from "mongoose";

export const getReparation = async (req, res) => {

    try {
        var query = {"aFaire.description":"reparation des lumieres"};
        const reparation = await Reparation.find();

        res.status(200).json(reparation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReparationAValider = async (req, res) => {
    try {
        var query = { $or: [{ "bonSortie": false},{ "bonSortie": null}]};
        const reparation = await Reparation.find(query);
        res.status(200).json(reparation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getReparationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reparation = await Reparation.findById(id);

        res.status(200).json(reparation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getCount = async (req, res) => {

    try {
        const reparation = await Reparation.count();
        res.status(200).json(reparation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReparation = async (req,res) => {
    const reparation = req.body;
    const newPost = new Reparation (reparation);
    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updateReparation = async (req,res) => {
    const { id:_id} = req.params;
    const reparation = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id ');

    const updatedPost = await Reparation.findByIdAndUpdate(_id, reparation ,{new : true});
    res.json(updatedPost);
 }

 export const valideBonSortie = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with this id');

    const reparation = await Reparation.findById(id);
    if(reparation.bonSortie===true) return res.status(400).send(' Le bon de sortie de la voiture a  déja été validée')
        
    reparation.bonSortie = true ;
    

    const updatePost = await Reparation.findByIdAndUpdate(id,reparation, { new: true});
    
    res.json(updatePost);

 }
import Cout from "../models/cout.js";
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

export const createCout = async (req,res) => {
    const cout = req.body;
    const newPost = new Cout (cout);
    try {
        await newPost.save();
        res.status(201).json(newPost);

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
    console.log(date,montant);
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Pas de reparation avec cette id ');
    const reparation = await Cout.findById(_id);
    reparation.avance.push(data);
    
    const updatedPost = await Cout.findByIdAndUpdate(_id, reparation ,{new : true});
    res.json(updatedPost);
 }
 export const validationAvance = async (req,res) => {

    const { id:_id} = req.params;
    const updatedPost = await Cout.updateOne({
        "avance._id" : _id
 },{
    "$set" : {
        "avance.$.validation" : true
    }
 });
 res.json(updatedPost);
   
 }
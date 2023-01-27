import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async ( req, res) => {

    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "l'email n'existe pas."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message:"Mot de passe incorrect."});

        const token = jwt.sign({ email: existingUser.email, id:existingUser._id }, 'test', { expiresIn: "1h"});
        console.log(token);

        res.status(200).json({ result:existingUser , token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Someting went wrong.'});
    }
}

export const signup = async (req, res) => {
    const { email, password , confirmPassword, nom, prenoms,dateNaissance,adresse,telephone,status } = req.body;
    try {
        const existingUser = await User.findOne({ email});

        if(existingUser) return res.status(400).json({ message: "L'email existe déja."});

        if(password !== confirmPassword) return res.status(400).json({message: " le mot de passe ne correspond pas. "});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email,password:hashedPassword,nom,prenoms,dateNaissance,adresse,telephone,status})

        const token = jwt.sign({ email:result.email, id:result._id, status:result.status}, 'test' , { expiresIn: "1h"});

        res.status(200).json({ result, token });


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.'});

    }
}
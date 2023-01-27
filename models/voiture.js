import mongoose from "mongoose";

const voitureSchema = mongoose.Schema ({
    idProprietaire:String,
    matricule: String,
    dateDepot:Date,
    dateRecuperation:Date,
    description: {
        marque: String,
        couleur: String
    }
});


export default mongoose.model("Voiture", voitureSchema);
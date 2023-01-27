import mongoose from "mongoose";

const coutSchema = mongoose.Schema ({
    idReparation:String,
    dateReception:Date,
    piece: [{
        nom: String,
        cout: Number,
    }],
    coutTotalPiece: Number,
    coutReparation:Number,
    coutTotale:Number,
    avance:[{
        date:Date,
        montant:Number,
        validation:Boolean,
    }],
    coutTotalePaye:Number,
    resteAPayer:Number
});


export default mongoose.model("Cout", coutSchema);
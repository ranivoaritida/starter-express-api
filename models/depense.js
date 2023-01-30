import mongoose from "mongoose";

const depenseSchema = mongoose.Schema ({
    salaire:Number,
    loyer: Number,
    achatPiece:Number,
    autreDepense:Number,
    totale:Number,
    date:Date
});


export default mongoose.model("Depense", depenseSchema);
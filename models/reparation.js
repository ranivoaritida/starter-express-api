import mongoose from "mongoose";

const reparationSchema = mongoose.Schema ({
    idVoiture:String,
    dateReception:Date,
    aFaire: [{
        description: String,
        estimation:Number,
        avancement: String,
        statut:Boolean,
        dateDebut:Date,
        dateFin:Date,
        dureeExact:Number
    }],
    dureeTotal:Number,
    bonSortie: Boolean
});


export default mongoose.model("Reparation", reparationSchema);
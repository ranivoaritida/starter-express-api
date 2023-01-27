import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    nom: { type: String, required:true},
    prenoms: { type: String, required:true},
    dateNaissance: { type: Date, required:true},
    email: { type: String, required:true},
    adresse: { type: String, required:true},
    telephone: { type: String, required:true},
    password: { type: String, required: true },
    id: { type: String},
    status: { type: String, required:true}
})

export default mongoose.model("User", userSchema);

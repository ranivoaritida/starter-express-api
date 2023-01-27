import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import voitureRoutes from './routes/voiture.js';
import userRoutes from './routes/users.js';
import reparationRoutes from './routes/reparation.js';
import coutRoutes from './routes/cout.js';
import statRoutes from './routes/stat.js';
const app = express();


app.use(bodyParser.json({ limit: "30mb" , extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb" , extended: true }));
app.use(cors());

app.use('/voiture', voitureRoutes);
app.use('/user',userRoutes);
app.use('/reparation',reparationRoutes);
app.use('/cout',coutRoutes);
app.use('/stat',statRoutes);

const CONNECTION_URL = 'mongodb+srv://Razady:razady123@cluster0.kd5c2e9.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000; 


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch( (error) => console.log(error.message));
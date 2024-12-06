import express from 'express';
import dotenv from 'dotenv';
//import { connect } from 'mongoose';
import { connnectDB } from './database/db.js';
import cors from 'cors';

dotenv.config();

const app = express();

//using middeleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Server is working");
});


//imporing routes
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';


//using routes
app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);




app.listen(port, () => {
    console.log('Server is running on http://Localhost:' + port);
    connnectDB();
});
    
import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;


//console.log(process.env.MONGO_URI);
app.use(cors({
    origin:"http://localhost:5173", // Allow requests from this origin
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Use the rate limiter middleware

app.use('/api/notes',notesRoutes); 
connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`server is running on port on ${PORT}`);
});
});


// mongodb+srv://santhanaroysten20:V2XfBPfOkWSuvyjo@cluster0.hxutjhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
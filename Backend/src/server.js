import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); // Get the current directory name

//console.log(process.env.MONGO_URI);
if(process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin:"http://localhost:5173", // Allow requests from this origin
}));
}

app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Use the rate limiter middleware

app.use('/api/notes',notesRoutes); 

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"));
});
}// Serve static files from the public directory
connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`server is running on port on ${PORT}`);
});
});


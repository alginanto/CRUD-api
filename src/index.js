import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());    
app.use(express.json());

//routes

//error handling middleware

//server running
app.listen(PORT, () => {
  console.log(`Server is running on  http:localhost:${PORT}`);
});
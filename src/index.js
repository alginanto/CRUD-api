import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandleer.js';
import createUserTable from './data/createUserTable.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api', userRoutes);

// Middleware
app.use(cors());    
app.use(express.json());

//routes
app.use('/api', userRoutes);
//error handling middleware
app.use(errorHandler);

// Create user table if it doesn't exist
createUserTable()
  .then(() => console.log('User table checked/created successfully'))
  .catch((error) => console.error('Error creating user table:', error));
//TESTING DATABASE CONNECTION
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    const currentDatabase = await pool.query('SELECT current_database()');
    console.log('Current Database:', currentDatabase.rows[0].current_database);
    res.status(200).json({
      message: 'Database connection successful, Database name: ' + currentDatabase.rows[0].current_database,
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed', error });
  }
});
//server running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
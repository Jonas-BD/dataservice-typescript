import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { carRoutes } from './routes/carRoutes.js';
import { loginRotes } from './routes/loginRoutes.js';
import { authRoutes } from './routes/authRoutes.js';

// Indlæs miljøvariabler fra .env (uden at vise logs)
dotenv.config({ quiet: true });

// Brug port fra .env eller falde tilbage til 3000
const port = process.env.PORT || 3000;

// Opret express-app
const app = express();

// Gør det muligt at modtage JSON i requests
app.use(express.json());

// Gør det muligt at modtage form-data (fx fra formularer)
app.use(express.urlencoded({ extended: true }));

// Anvend routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', loginRotes)
app.use('/api/', authRoutes)

// 404 route
app.use((req, res) => {
    res.status(404).send('Kunne ikke finde siden du søgte efter')
})

// Start serveren
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
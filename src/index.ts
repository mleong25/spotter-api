// server/index.js
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pino from 'pino';
import pinoLogger from 'express-pino-logger';
import mongoose from 'mongoose';
import 'dotenv/config';

// Constants
const SPOTTER_MONGODB_URI = process.env.SPOTTER_MONGODB_URI || '';
const PORT = process.env.PORT || '5001';

// Configure logging
// LOG_LEVEL can be one of ['info', 'warn', 'error', 'debug', 'trace']
const logger = pinoLogger({
  logger: pino({ level: process.env.LOG_LEVEL || 'info' }),
});

// Check if required env vars are defined
if (!SPOTTER_MONGODB_URI) {
  console.error('missing SPOTTER_MONGODB_URI from env');
  process.exit(1);
}
// Initialize Mongo database
mongoose
  .connect(SPOTTER_MONGODB_URI)
  .then(() => console.log('Successfully connected to database'))
  .catch((error) => {
    console.error('Database connection failed. Exiting now...', error);
    process.exit(1);
  });

// Configure Express server
const app: Application = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger);

// Route to ping server
app.get('/ping', (req, res) => res.send('pong'));

app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
});

// server/index.js
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pino from 'pino';
import pinoLogger from 'express-pino-logger';
import 'dotenv/config';

// Constants
const TRUJO_MONGODB_URI = process.env.TRUJO_MONGODB_URI || '';
const PORT = process.env.PORT || '5001';

// Configure logging
// LOG_LEVEL can be one of ['info', 'warn', 'error', 'debug', 'trace']
const logger = pinoLogger({
  logger: pino({ level: process.env.LOG_LEVEL || 'info' }),
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

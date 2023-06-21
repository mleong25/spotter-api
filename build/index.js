"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.js
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const pino_1 = __importDefault(require("pino"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
require("dotenv/config");
// import { printRoutes } from './utils/routing';
// import routes from './api/routes.config';
// Constants
const TRUJO_MONGODB_URI = process.env.TRUJO_MONGODB_URI || '';
const PORT = process.env.PORT || '5100';
// Configure logging
// LOG_LEVEL can be one of ['info', 'warn', 'error', 'debug', 'trace']
const logger = (0, express_pino_logger_1.default)({
    logger: (0, pino_1.default)({ level: process.env.LOG_LEVEL || 'info' }),
});
// // Check if required env vars are defined
// if (!TRUJO_MONGODB_URI) {
//   console.error('missing TRUJO_MONGODB_URI from env');
//   process.exit(1);
// }
// // Initialize Mongo database
// mongoose
//   .connect(TRUJO_MONGODB_URI)
//   .then(() => console.log('Successfully connected to database'))
//   .catch((error) => {
//     console.error('Database connection failed. Exiting now...', error);
//     process.exit(1);
//   });
// Configure Express server
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(logger);
// Route to ping server
app.get('/ping', (req, res) => res.send('pong'));
// app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`\nServer running on http://localhost:${PORT}`);
    // printRoutes(app);
});
//# sourceMappingURL=index.js.map
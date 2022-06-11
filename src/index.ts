import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 80;

import Logger from './modules/logger';
export const logger = new Logger();

import Database from './modules/database';
export const database = new Database(logger);

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/public/views'));
server.use('/static', express.static('./public/static'));

server.use((req, res, next) => {
    logger.log('express', `${req.method} ${req.url} (${req.ip})`);
    next();
})

server.get('/', (req, res) => {
    res.render('index');
})

server.listen(process.env.PORT || 80, () => {
    logger.log('express', `Server running on port ${PORT}.`);
    database.authenticate();
})


import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';

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

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(session({
    secret: 'vdtMQA3euw9chc8kph',
    resave: false,
    saveUninitialized: false
}));

server.use((req, res, next) => {
    logger.log('express', 'INF', `${req.method} ${req.url} (${req.ip})`);
    next();
})

import { router as authRouter } from './routes/auth';
server.use('/', authRouter);

server.get('/', (req, res) => {
    res.render('index');
})

server.listen(process.env.PORT || 80, () => {
    logger.log('express', 'INF', `Server running on port ${PORT}.`);
    database.authenticate();
})


import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 80;

import Logger from './modules/logger';
export const logger = new Logger();

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/public/views'));
server.use('/static', express.static('./static'));

server.get('/', (req, res) => {
    res.render('index');
})

server.listen(process.env.PORT || 80, () => {
    logger.log('express', `Server running on port ${PORT}.`);
})


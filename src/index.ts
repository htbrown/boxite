import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 80;

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/public/views'));
server.use('/static', express.static('./static'));

server.get('/', (req, res) => {
    res.render('index');
})

server.listen(process.env.PORT || 80, () => {
    console.log(`Server running on port ${PORT}.`);
})


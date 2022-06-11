import Logger from './logger';
import r from 'rethinkdb';

export default class Database {
    private logger: Logger;
    public connection: r.Connection;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    async authenticate() {
        r.connect({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 28015,
            db: process.env.DB_DATABASE || 'boxite'
        }, (err, conn) => {
            if (err) throw new Error(err.message);
            this.connection = conn;
            this.logger.log('rethinkdb', 'Connected to RethinkDB.')
        })
    }
}
import Logger from './logger';
import r from 'rethinkdb';

export default class Database {
    private logger: Logger;
    public static connection: r.Connection;

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
            Database.connection = conn;
            this.logger.log('rethinkdb', 'SUC', 'Connected to RethinkDB.');
        })
    }
}
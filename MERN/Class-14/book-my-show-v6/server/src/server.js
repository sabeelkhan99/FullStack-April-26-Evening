import 'dotenv/config';
import app from './app.js';
import AppDataSource from './data-source.js';
import Logger from './core/Logger.js';

const PORT = 8080;

(async () => {
    try {
        await AppDataSource.connect();
        app.listen(PORT, () => {
            Logger.info(`server started at ${PORT}`)
        });
    }
    catch (err) {
        // gracefull shutdown of database
        await AppDataSource.disconnect();
        Logger.error(err);
    }
})()
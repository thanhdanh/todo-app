import dotenv from 'dotenv';

dotenv.config();

import { initDB } from './database';
import { createServer, initRoutes, startServer } from './server';

// Load all environment variables from file .env

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
    process.exit(1)
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})
createServer()
    .then(initDB)
    .then(initRoutes)
    .then(startServer)
    .catch((err) => {
        console.log(err);
    })

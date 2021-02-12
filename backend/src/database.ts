import Hapi from '@hapi/hapi';
import { Db, MongoClient } from 'mongodb';
import { mongo } from './configs';

// Module augmentation to add shared application state
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33809#issuecomment-472103564
declare module '@hapi/hapi' {
    interface ServerApplicationState {
        db: Db
    }
}

export async function initDB(server: Hapi.Server): Promise<Hapi.Server> {
    const uri = `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}`;
    console.log(uri)
    const client = new MongoClient(uri, {
        poolSize: 20,
        authMechanism: "SCRAM-SHA-256",
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        useUnifiedTopology: true,
        authSource: mongo.dbName
    });

    try {
        await client.connect();
        console.log('Connected to database!!!');

        const database = client.db(mongo.dbName);
        server.app.db = database;
    } catch (err) {
        console.log(err)
        await client.close();
        throw new Error('Have error when connect to database !');
    }

    server.events.on('stop', () => {
        client.close((err) => server.log(['hapi-mongodb', 'error'], err));
    })

    return server;
}
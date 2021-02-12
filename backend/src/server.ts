import Hapi from '@hapi/hapi';
import * as TodoApi from './api/todo';
import { port, isProduction } from './configs';
import LoggingPlugin from './plugins/logging';
import SwaggerPlugin from './plugins/swagger';

export async function createServer(): Promise<Hapi.Server> {
    const server: Hapi.Server = Hapi.server({
        port,
        debug: isProduction ? false : { request: ['error'], log: ['error'] },
    })
    
    await server.register([
        LoggingPlugin,
        SwaggerPlugin,
    ]);
    

    console.log("All plugins registered successfully.");

    await server.initialize();
    return server;
}

export async function initRoutes(server: Hapi.Server): Promise<Hapi.Server> {
    TodoApi.init(server);
    return server;
}

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
}
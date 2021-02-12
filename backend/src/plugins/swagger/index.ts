import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';

import HapiSwagger from 'hapi-swagger';

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: 'API Documentation'
    }
};


const SwaggerPlugin: Hapi.Plugin<any> = {
    name: 'app/doc',
    register: async function (server: Hapi.Server) {
        const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
            { plugin: Inert },
            { plugin: Vision },
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]

        await server.register(plugins);
    }
}

export default SwaggerPlugin;
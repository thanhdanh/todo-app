import Hapi from '@hapi/hapi';
import laabr from 'laabr';

const LoggingPlugin: Hapi.Plugin<null> = {
    name: 'app/logging',
    register: async function (server: Hapi.Server) {
        const options = {
            formats: { onPostStart: ':time :start :level :message' },
            tokens: { start: () => '[start]' },
            indent: 0
        };
        await server.register({
            plugin: laabr,
            options
        });
    }
}

export default LoggingPlugin;

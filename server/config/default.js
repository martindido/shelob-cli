'use strict';

module.exports = {
    environment: 'development',
    server: {
        port: 4040
    },
    cluster: {
        enabled: false
    },
    providers: {
        historic: {
            name: 'sql',
            options: {
                name: 'shelob',
                username: 'root',
                password: '123456789',
                options: {}
            }
        },
        realtime: {
            name: 'udp',
            options: {
                host: '127.0.0.1',
                port: 9003,
            }
        }
    }
};

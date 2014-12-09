'use strict';

module.exports = {
    environment: 'development',
    server: {
        port: 4040
    },
    cluster: {
        enabled: false
    },
    provider: {
        name: 'sql',
        options: {
            name: 'shelob',
            username: 'root',
            //password: '123456789'
        }
    }
};

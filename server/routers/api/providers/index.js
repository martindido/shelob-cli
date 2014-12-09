'use strict';

var config = require('../../../config').get('providers', {});
var providers;

function getProvider(provider) {
    return require('./' + (typeof provider === 'string' ? provider : provider.name));
}

function getProviders() {
    if (providers) {
        return providers;
    }
    providers = {};
    if (config.historic) {
        providers.historic = new (getProvider(config.historic.name))(config.historic.options);
    }
    if (config.realtime) {
        providers.realtime = new (getProvider(config.realtime.name))(config.realtime.options);
    }
    return providers;
}

module.exports = {
    getProvider: getProvider,
    getProviders: getProviders
};

'use strict';

function getProvider(provider) {
    return require('./' + (typeof provider === 'string' ? provider : provider.name));
}

module.exports = {
    getProvider: getProvider
};

'use strict';

var utils = require('../../shared/utils');
var CONFIG = require('./default');

function get(keys, defaultValue) {
    return utils.get(CONFIG, keys, defaultValue);
}

module.exports = {
    get: get,
    world: require('./world.json').features.map(function each(country) {
        return {
            id: country.id.toLowerCase(),
            name: country.properties.name.toLowerCase()
        };
    })
};

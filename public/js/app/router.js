var Router = (function(argument) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            '': 'home',
        },
        home: function() {
            this.app.show(new HomeView());
        }
    });
})();

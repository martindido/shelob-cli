var Router = (function(argument) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            '': 'home',
            'dashboard': 'dashboard'
        },
        home: function() {
            this.app.show(new HomeView());
        },
        dashboard: function() {
            this.app.show(new DashboardView());
        }
    });
})();

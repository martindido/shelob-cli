var HomeView = (function() {
    'use strict';

    return Backbone.View.extend({
        id: 'home',
        tagName: 'section',
        render: function() {
            this.$el.html('<img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1>');
            return this;
        }
    });

})();

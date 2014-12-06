var HomeView = (function() {
    'use strict';

    return Backbone.View.extend({
        id: 'home',
        tagName: 'section',
        render: function() {
            this.$el.html('<a href="#dashboard"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');
            return this;
        }
    });

})();

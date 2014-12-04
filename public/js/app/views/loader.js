var LoaderView = (function() {
    'use strict';

    return Backbone.View.extend({
        el: '#loader',
        show: function(callback) {
            this.$el.fadeIn('slow', callback);
        },
        hide: function(callback) {
            this.$el.delay(750).fadeOut('slow', callback);
        }
    });

})();

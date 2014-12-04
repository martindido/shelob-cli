var App = (function() {
    'use strict';

    return Backbone.View.extend({
        el: 'body',
        initialize: function() {
            this.$content = this.$('#content');
            this.loader = new LoaderView();
            this.router = new Router();
            this.router.app = this;
            Backbone.history.start();
        },
        show: function(view) {
            this.loader.show(function callback() {
                this.$content.html(view.render().$el);
                this.loader.hide();
            }.bind(this));
        }
    });

})();

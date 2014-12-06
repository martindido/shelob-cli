var Metrics = (function() {
    'use strict';

    return Backbone.Collection.extend({
        model: Metric,
        url: '/api/metrics',
        parse: function(metrics) {
            return metrics.reverse();
        },
        initialize: function() {
            socket.on('metrics add', this.addMetrics.bind(this));
        },
        addMetrics: function(metrics) {
            this.add(metrics.map(Metric.prototype.parse));
        }
    });

})();

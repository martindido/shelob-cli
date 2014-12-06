var Metric = (function() {
    'use strict';

    return Backbone.Model.extend({
        parse: function(metric) {
            metric.values = metric.Metrics;
            delete metric.Metrics;
            return metric;
        }
    });

})();

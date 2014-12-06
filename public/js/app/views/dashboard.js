var DashboardView = (function() {
    'use strict';

    return Backbone.View.extend({
        id: 'dashboard',
        tagName: 'section',
        initialize: function() {
            this.$metrics = $('<ul id="metrics"></ul>');
            this.collection = new Metrics();
            this.collection.fetch();
            this.collection.on('add', this.addMetric, this);
        },
        render: function() {
            var $dashboard = $('<a href="#"><img id="logo" src="/img/logo.jpg"><h1 id="title">SHELOB</h1></a>');

            this.$el.html($dashboard).append(this.$metrics);
            return this;
        },
        addMetric: function(metric) {
            var $metrics = this.$metrics;
            var $metric = $('<li class="metric" id="metric-' + metric.get('id') + '">' + metric.get('name') + '</li>');
            var $values = $('<ul class="values"></ul>');

            metric.get('values').forEach(function each(value) {
                $values.append('<li class="value">' + value.createdAt + ': ' + value.value + '</li>');
            });
            $metrics.append($metric).append($values);
        }
    });

})();

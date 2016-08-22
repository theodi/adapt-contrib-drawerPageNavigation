define(function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');

    var DrawerPageNavigationView = Backbone.View.extend({

        className: "drawerPageNavigation",

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            'click .contentObjects-item-container button': 'onContentObjectMenuClicked'
        },

        render: function() {
            var collectionData = this.collection.toJSON();
            var modelData = this.model.toJSON();
            var template = Handlebars.templates["contentObjects"];
            this.$el.html(template({model: modelData, resources: collectionData, _globals: Adapt.course.get('_globals')}));
            _.defer(_.bind(this.postRender, this));
            return this;
        },

        postRender: function() {
            this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
        },

        onContentObjectMenuClicked: function(event) {
            if(event && event.preventDefault) event.preventDefault();
            if(this.model.get('_isLocked')) return;
            Backbone.history.navigate('#/id/' + $(event.currentTarget).data("href"), {trigger: true});
        }
    });

    return DrawerPageNavigationView;
})

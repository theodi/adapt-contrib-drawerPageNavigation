define([
    'backbone',
    'coreJS/adapt',
    './adapt-contrib-drawerPageNavigationView'
], function(Backbone, Adapt, DrawerPageNavigationView) {

    function setupMenu(contentObjectsModel, contentObjectsItems) {

        var contentObjectsCollection = new Backbone.Collection(contentObjectsItems);
        var contentObjectsModel = new Backbone.Model(contentObjectsModel);

        Adapt.on('drawerPageNavigation:showContentObjects', function() {
            Adapt.drawer.triggerCustomView(new DrawerPageNavigationView({
                model: contentObjectsModel,
                collection: contentObjectsCollection
            }).$el);
        });

    }

    Adapt.once('app:dataReady', function() {

        var drawerPageNavigationData = Adapt.course.get('_drawerPageNavigation');
        var contentObjectItems = Adapt.contentObjects.models;

        // do not proceed until resource set on course.json
        if (!contentObjectItems || drawerPageNavigationData._isEnabled === false) return;

        var drawerObject = {
            title: drawerPageNavigationData.title,
            description: drawerPageNavigationData.description,
            className: 'pageNavigation-drawer'
        };
        // Syntax for adding a Drawer item
        // Adapt.drawer.addItem([object], [callbackEvent]);
        Adapt.drawer.addItem(drawerObject, 'drawerPageNavigation:showContentObjects');

        setupMenu(drawerPageNavigationData, contentObjectItems);

    });

});

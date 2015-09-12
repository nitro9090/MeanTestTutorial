var appName = 'theLindarianApp',
        app = angular.module(appName, ['example', 'ui.router']);

angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
});

app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
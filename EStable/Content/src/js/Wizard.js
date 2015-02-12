(function() {
    var wizard = angular.module("wizard", ["ngRoute"]);

    wizard.config(function($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/wizard/email.html",
                controller: "WizardEmailController"
            })
            .otherwise({ redirectTo: "/" });
    });


}());
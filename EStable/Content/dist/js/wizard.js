(function() {
    var wizard = angular.module("wizard", ["ngRoute"]);

    wizard.config(function($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "src/views/email.html",
                controller: "WizardEmailController"
            })
            .otherwise({ redirectTo: "/" });
    });
}());
(function () {
    var BaseController = function ($scope) {

        var stable = {
            stableName: ""
        };

        var user = {
            email : "fake@me.com"
        };

        $scope.stableName = stable;
        $scope.user = user;
        $scope.title = "eStable Creation";
    };

    var wizard = angular.module("wizard");
    wizard.controller("BaseController", ["$scope", BaseController]);
}());

(function () {
    var WizardEmailController = function($scope) {

        $scope.emailLabel = 'Email: ';
        $scope.submitEmail = function(email) {
            console.log(email);
        };
    };
    
    var wizard = angular.module("wizard");
    wizard.controller("WizardEmailController", ["$scope", WizardEmailController]);
}());
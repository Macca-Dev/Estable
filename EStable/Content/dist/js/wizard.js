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
(function() {

    var wizardApi = function($http) {

        var postEmail = function (email) {
            return $http.post("http://establewizardapi.azurewebsites.net/email/Post/" + email)
                .then(function(response) {
                    return response.data;
                });
        };

        return {
            postEmail: postEmail
        };
    };

    var wizard = angular.module("wizard");
    wizard.factory("wizardApi", wizardApi);
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
    var WizardEmailController = function($scope, wizardApi) {

        $scope.emailLabel = 'Email: ';
        $scope.submitEmail = function(email) {
            wizardApi.postEmail(email)
                .then(onPostEmailComplete, onError);
        };

        var onPostEmailComplete = function(data) {
            console.log(data);
        };

        var onError = function(reason) {
            console.log(reason);
        };
    };
    
    var wizard = angular.module("wizard");
    wizard.controller("WizardEmailController", ["$scope", "wizardApi", WizardEmailController]);
}());
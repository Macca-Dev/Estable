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
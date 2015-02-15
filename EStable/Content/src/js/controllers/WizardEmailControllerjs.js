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
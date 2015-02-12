(function () {
    var WizardEmailController = function($scope) {

        $scope.stableName = 'Stable Name';

    };
    
    var wizard = angular.module("wizard");
    wizard.controller("WizardEmailController", ["$scope", WizardEmailController]);
}());
(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardEmailController = function($scope) {

        $scope.emailLabel = 'Email: ';
        $scope.submitEmail = function(email) {
          //wizardMemory.storeEmail(email)
            //    .then(onStoreEmailComplete, onError);
        };

        var onStoreEmailComplete = function(data) {
            console.log(data);
        };

        var onError = function(reason) {
            console.log(reason);
        };
    };
    wizard.controller("wizardEmailController", ["$scope", wizardEmailController]);
}());

(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardEmailController = function($scope, $rootScope, $location) {

        $scope.storeEmail = function(email) {
          $location.path('/stable');
          $rootScope.user.email = email;
        };
    };
    wizard.controller("wizardEmailController", ["$scope", "$rootScope", "$location", wizardEmailController]);
}());

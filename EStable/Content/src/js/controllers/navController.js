(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardNavigationController = function($scope, $rootScope, $location) {

        /**
        *Takes the user to the section selected.
        */
        $rootScope.navigate = function(path) {
          $location.path(path);
        };

        /**
        * controlls the active clas sto be set on the current view of the wizard.
        */
        $scope.menuClass = function(page) {
         var current = $location.path().substring(1);
         return page === current ? "active" : "";
       };
    };
    wizard.controller("wizardNavigationController", ["$scope", "$rootScope", "$location", wizardNavigationController]);
}());

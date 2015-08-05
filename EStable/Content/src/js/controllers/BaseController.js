(function () {
    "use strict";
    var wizard = angular.module("wizard"),
    BaseController = function ($scope, $rootScope, validation) {
        var user = {
            email : "",
            stableName: ""
        };

        $rootScope.user = user;
        $scope.validation = validation;
        $scope.title = "eStable Creation";
    };

    wizard.controller("BaseController", ["$scope", "$rootScope", "validation", BaseController]);
}());

(function () {
    "use strict";
    var wizard = angular.module("wizard"),
    BaseController = function ($scope) {
        var stable = {
            stableName: ""
        },user = {
            email : "fake@me.com"
        };

        $scope.stableName = stable;
        $scope.user = user;
        $scope.title = "eStable Creation";
    };

    wizard.controller("BaseController", ["$scope", BaseController]);
}());

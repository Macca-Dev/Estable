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

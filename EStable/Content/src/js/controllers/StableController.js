(function(){
  "use strict";
      var wizard = angular.module("wizard"),
      wizardStableController = function($scope, $rootScope, wizardApi){
        var onPostStableComplete = function(data) {
            console.log("data", data);
        },
        onError = function(reason) {
            console.log("reason", reason);
        },
        stable = {
          racingCode: "",
          trainer: "",
          legalEntity: "",
          mobile: "",
          phone: "",
          fax: "",
          address: ""
        };

       $scope.racingCode = stable.racingCode;
       $scope.trainer = stable.trainer;
       $scope.legalEntity = stable.legalEntity;
       $scope.mobile = stable.mobile;
       $scope.phone = stable.phone;
       $scope.fax = stable.fax;
       $scope.address = stable.address;
       $scope.email = $rootScope.user.email;
       $scope.stableName = stable.stableName;

       $scope.postStable = function(stable) {
         stable.email = $rootScope.user.email;
         stable.stableName = "kashdkjashd";
         //var data = JSON.stringify(stable);
         wizardApi.postStable(stable)
          .then(onPostStableComplete, onError);
        };

      };
      wizard.controller("wizardStableController", ["$scope", "$rootScope", "wizardApi", wizardStableController]);
}());

(function(){
  "use strict";
      var wizard = angular.module("wizard"),
      onError = function(reason) {
          console.log("reason", reason);
      },
      wizardStableController = function($scope, $rootScope, wizardApi){
        var onPostStableComplete = function(data) {
            console.log("data", data);
            $rootScope.user.stableName = data.config.data.stableName;
        },

        stable = {
          stableName: "",
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
         stable.stableEmail = $rootScope.user.email;
         //var data = JSON.stringify(stable);
         wizardApi.postStable(stable)
          .then(onPostStableComplete, this.onError);
        };

      };
      wizard.controller("wizardStableController", ["$scope", "$rootScope", "wizardApi", wizardStableController]);
}());

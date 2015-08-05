(function(){
  "use strict";
  var wizard = angular.module("wizard"),
  wizardStableController = function($scope, $rootScope, wizardApi){
    var onGetStableComplete = function(data){
      $scope.stable = JSON.parse(data.data.Result);
    };

    var onError = function(data){
      console.log(data);
    };

    $scope.postStable = function(stable) {
      var onPostStableComplete = function(data) {
        $rootScope.user.stableName = data.config.data.stableName;
      };

      wizardApi.postStable(stable)
      .then(onPostStableComplete, onError);
      //.then(onPostStableComplete, error.handle());
    };

    wizardApi.getStable($rootScope.user.email)
    .then(onGetStableComplete, onError);
    //.then(onGetStableComplete, error.handle());
  };

  wizard.controller("wizardStableController", ["$scope", "$rootScope", "wizardApi", wizardStableController]);
}());

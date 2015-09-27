(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardChargeController = function($scope, $rootScope, wizardApi) {

    	var onGetChargeComplete = function(data){
            $scope.charge = JSON.parse(data.data);
            $scope.charge.TaxDate = new Date($scope.charge.TaxDate);
    	};

    	var onError = function(data){
	      console.log(data);
	    };


        $scope.postcharge = function(charge) {
        	var onPostChargeComplete = function(data){
        		console.log(data);
        	};

        	charge.stableEmail = $rootScope.user.email;

        	wizardApi.postCharge(charge)
        	.then(onPostChargeComplete, onError);
        };

        wizardApi.getData("chargetypes", $rootScope.user.email)
        .then(onGetChargeComplete, onError);
    };

    wizard.controller("wizardChargeController", ["$scope", "$rootScope", "wizardApi", wizardChargeController]);
}());

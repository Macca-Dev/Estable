(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardChargeController = function($scope, $rootScope, wizardApi) {

      $scope.stableCharges = [
    {id: 1, description: 'awesome user1', unit: 2, rate: 4, inStable: true},
    {id: 2, description: 'awesome user2', unit: 3, rate: 4, inStable: true},
    {id: 3, description: 'awesome user3', unit: 4, rate: 7, inStable: false},
    {id: 4, description: null, unit: 2, rate: 4, inStable: true},
  ];

      $scope.units =[
        {value: 0, text: "Daily"},
        {value: 1, text: "Weekly"},
        {value: 2, text: "Fortnightly"},
        {value: 3, text: "Monthly"},
        {value: 4, text: "Quarterly"},
        {value: 5, text: "Yearly"}
      ];

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

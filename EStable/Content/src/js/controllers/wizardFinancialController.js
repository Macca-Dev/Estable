(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardFinancialController = function($scope, $rootScope, wizardApi) {

    	var onGetFinancialComplete = function(data){
            $scope.financial = JSON.parse(data.data);
            $scope.financial.TaxDate = new Date($scope.financial.TaxDate);
    	};

    	var onError = function(data){
	      console.log(data);
	    };


        $scope.postFinancial = function(financial) {
        	var onPostFinancialComplete = function(data){
        		console.log(data);
        	};

        	financial.stableEmail = $rootScope.user.email;

        	wizardApi.postFinancial(financial)
        	.then(onPostFinancialComplete, onError);
        };

        wizardApi.getData("financial", $rootScope.user.email)
        .then(onGetFinancialComplete, onError);
    };

    wizard.controller("wizardFinancialController", ["$scope", "$rootScope", "wizardApi", wizardFinancialController]);
}());

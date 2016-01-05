(function() {
    var wizard = angular.module("wizard", ["ngRoute", "xeditable"]);

    wizard.run(function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    wizard.config(function($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "src/views/email.html",
                controller: "wizardEmailController"
            })
            .when("/stable", {
              templateUrl: "src/views/stable.html",
              controller: "wizardStableController"
            })
            .when("/financial", {
              templateUrl: "src/views/financial.html",
              controller: "wizardFinancialController"
            })
            .when("/charge", {
              templateUrl: "src/views/charge.html",
              controller: "wizardChargeController"
            })
            .otherwise({ redirectTo: "/" });
    });
}());

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

(function(){
  "use strict";
  var wizard = angular.module("wizard"),
  wizardStableController = function($scope, $rootScope, wizardApi){
    var onGetStableComplete = function(data){
      $scope.stable = JSON.parse(data.data);
    };

    var onError = function(data){
      console.log(data);
    };

    $scope.postStable = function(stable) {
      var onPostStableComplete = function(data) {
        $rootScope.user.stableName = data.config.data.stableName;
      };

      stable.stableEmail = $rootScope.user.email;

      wizardApi.postData(stable, "stable")
      .then(onPostStableComplete, onError);
      //.then(onPostStableComplete, error.handle());
    };

    wizardApi.getData("stable", $rootScope.user.email)
    .then(onGetStableComplete, onError);
    //.then(onGetStableComplete, error.handle());
  };

  wizard.controller("wizardStableController", ["$scope", "$rootScope", "wizardApi", wizardStableController]);
}());

(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardEmailController = function($scope, $rootScope, $location) {

        $scope.storeEmail = function(email) {
          $location.path('/stable');
          $rootScope.user.email = email;
        };
    };
    wizard.controller("wizardEmailController", ["$scope", "$rootScope", "$location", wizardEmailController]);
}());

(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardNavigationController = function($scope, $location) {

        /**
        *Takes the user to the section selected.
        */
        $scope.navigate = function(path) {
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
    wizard.controller("wizardNavigationController", ["$scope", "$location", wizardNavigationController]);
}());

(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardChargeController = function($scope, $rootScope, wizardApi) {
    	var onGetChargeComplete = function(data){
            $scope.charge = JSON.parse(data.data);
            $scope.charge.TaxDate = new Date($scope.charge.TaxDate);
    	},
      onError = function(data){
	      console.log(data);
	    };

      $scope.stableCharges = [
        {id: 1, description: 'awesome user1', unit: 2, rate: 4, inStable: true},
        {id: 2, description: 'awesome user2', unit: 3, rate: 4, inStable: true},
        {id: 3, description: 'awesome user3', unit: 4, rate: 7, inStable: false},
        {id: 4, description: null, unit: 2, rate: 4, inStable: true},
      ];

      $scope.standardCharges = [];

      //wizard dropdown for units
      $scope.units = [
        {value: 0, text: "Daily"},
        {value: 1, text: "Weekly"},
        {value: 2, text: "Fortnightly"},
        {value: 3, text: "Monthly"},
        {value: 4, text: "Quarterly"},
        {value: 5, text: "Yearly"}
      ];

      $scope.addStableRow = function(){
        $scope.stableCharges.push({
          id: $scope.standardCharges.length+1,
          description: null,
          unit: 0,
          rate: 0,
          inStable: false
        });
      };

      $scope.addStandardRow = function(){
        $scope.standardCharges.push({
          id: $scope.standardCharges.length+1,
          description: null,
          rate: 0
        });
      };

      // remove user
      $scope.removeStableRow = function(index) {
        $scope.stableCharges.splice(index, 1);
      };

      // remove standard row
      $scope.removeStandardRow = function(index) {
        $scope.standardCharges.splice(index, 1);
      };

      $scope.postcharge = function(charge) {
      	var onPostChargeComplete = function(data){
      		console.log(data);
      	};

      	charge.stableEmail = $rootScope.user.email;

      	wizardApi.postData(charge, "chargetypes")
      	.then(onPostChargeComplete, onError);
      };

        wizardApi.getData("chargetypes", $rootScope.user.email)
        .then(onGetChargeComplete, onError);
    };

    wizard.controller("wizardChargeController", ["$scope", "$rootScope", "wizardApi", wizardChargeController]);
}());

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

        	wizardApi.postData(financial, "financial")
        	.then(onPostFinancialComplete, onError);
        };

        wizardApi.getData("financial", $rootScope.user.email)
        .then(onGetFinancialComplete, onError);
    };

    wizard.controller("wizardFinancialController", ["$scope", "$rootScope", "wizardApi", wizardFinancialController]);
}());

(function() {
    "use strict";
    var wizard = angular.module("wizard"),
    wizardApi = function($http) {
        var getData = function(dataType, email){
          return $http({
              url: "http://establewizardapi.azurewebsites.net/" + dataType + "/" + email,
              method: "GET",
          });
        },
        postData = function(data, endPoint){
            return $http({
                url: "http://establewizardapi.azurewebsites.net/" + endPoint,
                method: "POST",
                data: data
            });
        };

        return {
            getData: getData,
            postData: postData
        };
    };

    wizard.factory("wizardApi", wizardApi);
    wizard.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
  });
}());

(function(){
	"use string";
	var wizard = angular.module("wizard");

	var error = function(){
		var handle = function(data){
			console.log(data);
		};
	};

	wizard.service("error", error);
}());

(function(){
  "use strict";

  var wizard = angular.module("wizard"),
  validation = function(){
   var maxLength = 150,
   minLength = 2,
   emailPattern= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+/g,
   getMaxLengthMessage = function(){
      var message = "please enter less than " + maxLength + " characters";
      return message;
    },
    getMinLengthMessage = function(){
      var message = "please enter more than " + minLength  + " characters";
      return message;
    },
    getRequiredMessage = function(){
      return "required";
    },
    messages = {
       maxlength: getMaxLengthMessage(),
       minlength: getMinLengthMessage(),
       required: getRequiredMessage()
     };

    return{
      maxLength: maxLength,
      minLength: minLength,
      emailPattern: emailPattern,
      messages: messages
    };
  };
  wizard.service("validation", validation);
}());

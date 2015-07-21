(function() {
    var wizard = angular.module("wizard", ["ngRoute"]);

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
            .otherwise({ redirectTo: "/" });
    });
}());

(function() {
    "use strict";
    var wizard = angular.module("wizard"),
    wizardApi = function($http) {
        var postStable = function (data) {
            //return $http.post("http://establewizardapi.azurewebsites.net/stable", data);
                // .then(function(response) {
                //     return response.data;
                // });


        return $http({
            url: "http://establewizardapi.azurewebsites.net/stable",
            method: "POST",
            data: data
          });
        };

        return {
            postStable: postStable
        };
    };
    wizard.factory("wizardApi", wizardApi);
    wizard.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
    });
}());

(function () {
    "use strict";
    var wizard = angular.module("wizard"),
    BaseController = function ($scope, $rootScope) {
        var user = {
            email : ""
        };
        
        $rootScope.user = user;
        $scope.title = "eStable Creation";
    };

    wizard.controller("BaseController", ["$scope", "$rootScope", BaseController]);
}());

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

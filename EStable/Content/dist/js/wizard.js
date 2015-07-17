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

(function(){
  "use strict";
      var wizard = angular.module("wizard"),
      wizardStableController = function($scope){
        var stable = {
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
      };
      wizard.controller("wizardStableController", ["$scope", wizardStableController]);
}());

(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardEmailController = function($scope) {

        $scope.emailLabel = 'Email: ';
        $scope.submitEmail = function(email) {
          //wizardMemory.storeEmail(email)
            //    .then(onStoreEmailComplete, onError);
        };

        var onStoreEmailComplete = function(data) {
            console.log(data);
        };

        var onError = function(reason) {
            console.log(reason);
        };
    };
    wizard.controller("wizardEmailController", ["$scope", wizardEmailController]);
}());

(function() {

    var wizardApi = function($http) {

      //change this to be post stable
        var postEmail = function (email) {
            return $http.post("http://establewizardapi.azurewebsites.net/email/Post/" + email)
                .then(function(response) {
                    return response.data;
                });
        };

        return {
            postEmail: postEmail
        };
    },
    wizard = angular.module("wizard");
    wizard.factory("wizardApi", wizardApi);
}());

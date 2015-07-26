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
    BaseController = function ($scope, $rootScope) {
        var user = {
            email : "",
            stableName: ""
        };
        
        $rootScope.user = user;
        $scope.title = "eStable Creation";
    };

    wizard.controller("BaseController", ["$scope", "$rootScope", BaseController]);
}());

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
    wizardChargeController = function($scope) {

        $scope.storeCharge = function() {
        };
    },
    EditableRowCtrl = function($scope, $filter, $http) {
      $scope.users = [
        {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
        {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
        {id: 3, name: 'awesome user3', status: 2, group: null}
      ];

      $scope.statuses = [
        {value: 1, text: 'status1'},
        {value: 2, text: 'status2'},
        {value: 3, text: 'status3'},
        {value: 4, text: 'status4'}
      ];

      $scope.groups = [];
      $scope.loadGroups = function() {
        return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
          $scope.groups = data;
        });
      };

      $scope.showGroup = function(user) {
        if(user.group && $scope.groups.length) {
          var selected = $filter('filter')($scope.groups, {id: user.group});
          return selected.length ? selected[0].text : 'Not set';
        } else {
          return user.groupName || 'Not set';
        }
      };

      $scope.showStatus = function(user) {
        var selected = [];
        if(user.status) {
          selected = $filter('filter')($scope.statuses, {value: user.status});
        }
        return selected.length ? selected[0].text : 'Not set';
      };

      $scope.checkName = function(data, id) {
        if (id === 2 && data !== 'awesome') {
          return "Username 2 should be `awesome`";
        }
      };

      $scope.saveUser = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        return $http.post('/saveUser', data);
      };

      // remove user
      $scope.removeUser = function(index) {
        $scope.users.splice(index, 1);
      };

      // add user
      $scope.addUser = function() {
        $scope.inserted = {
          id: $scope.users.length+1,
          name: '',
          status: null,
          group: null
        };
        $scope.users.push($scope.inserted);
      };
    };

  wizard.controller('EditableRowCtrl', ["$scope", "xeditable",  "$filter", "$http", EditableRowCtrl]);
  wizard.controller("wizardChargeController", ["$scope", wizardChargeController]);
}());

(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardFinancialController = function($scope) {

        $scope.storeFinancial = function() {
        };
    };
    wizard.controller("wizardFinancialController", ["$scope", wizardFinancialController]);
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

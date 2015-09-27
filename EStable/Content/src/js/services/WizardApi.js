(function() {
    "use strict";
    var wizard = angular.module("wizard"),
    wizardApi = function($http) {
        var postStable = function (stable) {
            return $http({
                url: "http://establewizardapi.azurewebsites.net/stable",
                method: "POST",
                data: stable
            });
        },
        getData = function(dataType, email){
          return $http({
              url: "http://establewizardapi.azurewebsites.net/" + dataType + "/" + email,
              method: "GET",
          });
        },
        postFinancial = function(financial){
            return $http({
                url: "http://establewizardapi.azurewebsites.net/financial",
                method: "POST",
                data: financial
            });
        };

        return {
            getData: getData,
            postStable: postStable,
            postFinancial: postFinancial
        };
    };

    wizard.factory("wizardApi", wizardApi);
    wizard.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
  });
}());

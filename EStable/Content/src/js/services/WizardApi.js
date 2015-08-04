(function() {
    "use strict";
    var wizard = angular.module("wizard"),
    wizardApi = function($http) {
        var postStable = function (stable) {
            return $http({
                url: "http://establewizardapi.azurewebsites.net/stable",
                //url: "http://wizard.service/stable",
                method: "POST",
                data: stable
            });
        },
        getStable = function(email){
            return $http({
                url: "http://establewizardapi.azurewebsites.net/stable/" + email,
                //url: "http://wizard.service/stable/" + email,
                method: "GET",
            });
        },
        postFinancial = function(financial){
            return $http({
                url: "http://establewizardapi.azurewebsites.net/financial",
                method: "POST",
                data: financial
            });
        },
        getFinancial = function(email){
            return $http({
                url: "http://establewizardapi.azurewebsites.net/financial/" + email,
                method: "GET"
            });
        };

        return {
            postStable: postStable,
            getStable: getStable,
            postFinancial: postFinancial,
            getFinancial: getFinancial
        };
    };

    wizard.factory("wizardApi", wizardApi);
    wizard.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
  });
}());

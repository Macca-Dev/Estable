(function() {
    "use strict";
    var wizard = angular.module("wizard"),
    wizardApi = function($http) {
        var postStable = function (data) {
            return $http({
                //url: "http://establewizardapi.azurewebsites.net/stable",
                url: "http://wizard.service/stable",
                method: "POST",
                data: data
            });
        };

        var getStable = function(email){
            return $http({
                //url: "http://establewizardapi.azurewebsites.net/stable/" + email,
                url: "http://wizard.service/stable/" + email,
                method: "GET",
            });
        };

        return {
            postStable: postStable,
            getStable: getStable
        };
    };
    wizard.factory("wizardApi", wizardApi);
    wizard.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;
  });
}());

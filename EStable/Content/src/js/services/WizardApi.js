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

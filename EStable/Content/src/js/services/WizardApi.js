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
            data: JSON.stringify(data),
            withCredentials: true
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

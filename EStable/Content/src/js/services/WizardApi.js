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

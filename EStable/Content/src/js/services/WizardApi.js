(function() {

    var wizardApi = function($http) {

        var postEmail = function (email) {
            return $http.post("http://establewizardapi.azurewebsites.net/email/Post/" + email)
                .then(function(response) {
                    return response.data;
                });
        };

        return {
            postEmail: postEmail
        };
    };

    var wizard = angular.module("wizard");
    wizard.factory("wizardApi", wizardApi);
}());
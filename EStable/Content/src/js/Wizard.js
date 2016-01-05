(function() {
    var wizard = angular.module("wizard", ["ngRoute", "xeditable"]);

    wizard.run(function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

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

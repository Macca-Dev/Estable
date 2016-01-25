(function () {
  "use strict";
    var wizard = angular.module("wizard"),
    wizardChargeController = function($scope, $rootScope, wizardApi) {
    	var onGetChargeComplete = function(data){
            $scope.charge = data.data;
            $scope.charge.TaxDate = new Date($scope.charge.TaxDate);
    	},
      onError = function(data){
	      console.log(data);
	    },
      activeRow = null,
      activeRowform = null,
      data = {
        StableEmail: $rootScope.user.email,
        StableName: $rootScope.user.stableName,
        StableChargeTypes: [
          { id: 1, description: null, unit: 1, rate: 0, inStable: true }
        ],
        StandardChargeTypes: [
          {id: 1, description: null, rate: 0 }
        ]
      },
      hideRow = function(row, rowform){
        if(!activeRow || !rowform) return;

        saveRow(rowform);
        rowform.$cancel();
        var trimmedName = row.className.split('editing-row')[1];
        activeRow.className = trimmedName;
      };
      /**
      * Sort through the row data, if that row already esists (being edited by user), overrite the rows data.
      **/
      var storeRowData = function(rowform){
        var id = rowform.$data.Id,
        inStableChargesArray = false;

        data.StableChargeTypes.forEach(function(row, i){
          if(row.Id === id){
            data.StableChargeTypes[i] = rowform.$data;
            inStableChargesArray = true;
          }
          return;
        });

        if(!inStableChargesArray){
          data.StableChargeTypes.push(rowform.$data);
        }
        return;
      };

      var saveRow = function(rowform){
        storeRowData(rowform);
        $scope.postcharge();
      };


      //Scope Assignments
      $scope.hideRow = function(event){
        console.log('blur');
        hideRow(activeRow, this.rowform);
      };

      $scope.showRow= function(event){
        //remove detail from previous active row
        hideRow(activeRow, activeRowform);
        //reassign active row.
        activeRowform = this.rowform;
        activeRow = (event.target.parentElement.nodeName !== "TR") ? event.target.parentElement.parentElement : event.target.parentElement;
        activeRowform.$show();
        activeRow.className += ' editing-row';
      };

      $scope.stableCharges = data.StableChargeTypes;

      $scope.standardCharges = data.StandardChargeTypes;

      //wizard dropdown for units
      $scope.units = [
        {value: 0, text: "Daily"},
        {value: 1, text: "Weekly"},
        {value: 2, text: "Fortnightly"},
        {value: 3, text: "Monthly"},
        {value: 4, text: "Quarterly"},
        {value: 5, text: "Yearly"}
      ];

      $scope.addStableRow = function(){
        data.StableChargeTypes.push({
          id: $scope.standardCharges.length+1,
          description: null,
          unit: 0,
          rate: 0,
          inStable: false
        });
      };

      $scope.addStandardRow = function(){
        $scope.standardCharges.push({
          id: $scope.standardCharges.length+1,
          description: null,
          rate: 0
        });
      };

      // remove user
      $scope.removeStableRow = function(index) {
        $scope.stableCharges.splice(index, 1);
      };

      // remove standard row
      $scope.removeStandardRow = function(index) {
        $scope.standardCharges.splice(index, 1);
      };

      //Save Date request
      $scope.postcharge = function() {
      	var onPostChargeComplete = function(response){

      	};

      	wizardApi.postData(data, "chargetypes")
      	.then(onPostChargeComplete, onError);
      };

        wizardApi.getData("chargetypes", $rootScope.user.email)
        .then(onGetChargeComplete, onError);
    };

    wizard.controller("wizardChargeController", ["$scope", "$rootScope", "wizardApi", wizardChargeController]);
}());

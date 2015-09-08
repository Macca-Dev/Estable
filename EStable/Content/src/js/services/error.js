(function(){
	"use string";
	var wizard = angular.module("wizard");

	var error = function(){
		var handle = function(data){
			console.log(data);
		};
	};

	wizard.service("error", error);
}());

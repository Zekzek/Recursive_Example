var recursiveApp = angular.module('recursiveApp', []);

recursiveApp.controller('recursiveCtrl', function($scope) {
	$scope.test="test";
	
	$scope.data = {"Description":"Microwave Popcorn","ProductID":12,"BatchID":35,"Location":{"Description":"Golden Valley Factory 1","LocationID":"17"},"Component":[{"Description":"Popcorn Oil","Quantity":1,"FulfilledBy":[{"Description":"Reed's Popcorn Oil","ProductID":3,"BatchID":87,"Location":{"Description":"Reed's Oil Factory","LocationID":"23"},"Component":[]}]},{"Description":"Popcorn Kernels","Quantity":5,"FulfilledBy":[{"Description":"Johnson's Yellow Popcorn","ProductID":54,"BatchID":32,"Location":{"Description":"Johnson's Thing Factory","LocationID":"115"},"Component":[]},{"Description":"Acme Kernels","ProductID":54,"BatchID":33,"Location":{"Description":"Unknown","LocationID":"-1"},"Component":[]}]}]};
	
	$scope.toggle = function(field) {
		field.expanded = !field.expanded;
	};
});

recursiveApp.directive('product', function() {
	return { 
		restrict : 'E',
		scope : { 
			label: '=*',
			data: '=*',
		},
		template : '<div ng-include="\'product.html\'"></div>',
		link: function(scope, element, attrs) {
			scope.isObject = function(value) {
				return angular.isObject(value);
			};
			scope.isArray = function(value) {
				return angular.isArray(value);
			};
		}
	};
}).directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {            
			function into(input) {
				return JSON.parse(input);
			}
			function out(data) {
				return JSON.stringify(data);
			}
			ngModel.$parsers.push(into);
			ngModel.$formatters.push(out);
        }
    };
});
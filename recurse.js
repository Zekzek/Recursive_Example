var recursiveApp = angular.module('recursiveApp', []);

recursiveApp.controller('recursiveCtrl', function($scope) {
	$scope.test="test";
	
	$scope.data = {
		"BatchID":35,
		"Description":"Thingamabob",
		"ProductID":12,
		"Components":[
			{
				"Requirement":"Sprocket",
				"Quantity":1,
				"FulfilledBy":[
					{ 
						"BatchID":87,
						"Product":{  
							"Description":"Sprocket",
							"ProductID":3,
							"Components":[]
						}						
					}
				]
			},
			{
				"Requirement":"Gizmo",
				"Quantity":5,
				"FulfilledBy":[ 
					{  
						"BatchID":32,
						"Product":{  
							"Description":"Gizmo",
							"ProductID":54,
							"Components":[]
						}
					},
					{  
						"BatchID":33,
						"Product":{
							"Description":"Gizmo",
							"ProductID":54,
							"Components":[]
						}
					}
				]
			}
		]
	};
	
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
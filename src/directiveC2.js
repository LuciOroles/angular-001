require('./directivesC2.html');
require('./foundation.min.css');
require('./C2.scss');

var angular = require('angular');
var C2module = angular.module("myApp", []);
 
 C2module.factory('getUsers', ['$http', function($http){
 	
 	return {
 		result : function(){
 			return $http.get("/users.json");
 		}
 	};
 		
 	
 }]);


C2module.factory('githubService', ['$http',  function($http){

	var githubUrl = 'https://api.github.com';

	var runUserRequest = function (username)	 {
		return $http({
			method : 'JSONP',
			url : githubUrl + '/users/' + username + '?callback=JSON_CALLBACK'
		});
	};

	return {
		events : function (username) {
			return runUserRequest(username);
		}
	};
}]);


C2module.controller("gitCtrl",function ($scope, githubService) {
	

	githubService.events("LuciOroles").success(function(data){
		$scope.gitResult=data;
	});

});


C2module.controller('thrCtrl', function(){
	
});

C2module.controller('forthCtrl', function(){
	
});

C2module.controller('sideBoxCtrl', function(){
	
});

C2module.directive('sscDirective',function(){
	return {
		restrict : 'A' ,
		scope : true //  false: the directive does not create a new scope - default
	};
});

C2module.directive("comParDir", function($log){
	return {
			controller : function () { 
				this.identify= function () {
					$log.log("comParDir")	;
				};
			}
	};
});

C2module.directive("sibChildDir", function($log){
		return {
			restrict : 'A',
			 

			controller : function () { 
				this.identify= function () {
					$log.log("sibChildDir")	;
				};
			}
		};

});

C2module.directive("comChildDir", function($log){
		return {
	 
			require : ['^comParDir', '^sibChildDir'],
			// controller : function () { 
			// 	this.indentify= function () {
			// 		$log.log("comChildDir")	;
			// 	};
			// },
		    link: function (scope, el, attrs, ctrls) {
            ctrls[0].identify();
            // Parent!
            ctrls[1].identify();
            // Sibling!
        }
		};

});


C2module.directive("customRender",function($log, $timeout){
	return {
		restrict : 'E',
		require : 'ngModel',
		template : "<div ng-model='surname'>{{name}}</div>",
		controller : function($scope, $element, $attrs){
						$scope.name= "Romiq";
						$scope.surname= "Soia";
		},
		link : function (scope, elem, attrs, ngModel) {
			   ngModel.$render = function() {
                $timeout(function() {
                    ngModel.$setViewValue('StackOverflow k ' + ngModel.$viewValue);  
                }, 2000);                
            };

		}
	};
});




C2module.directive('sidebox',function(){
		return {
			restrict : 'EA',
			scope : {
				title : '@'
			},
		 
			transclude : true,
			controllerAs : "sideCtrl",
			controller : function($scope, $element, $attrs, $transclude ){
				$scope.sideClick = function ()	{
					//alert('TTTT');
					
				};
			},
			template : '<div ng-click="sideClick()"" class="sidebox large-3">\
			<div class="content">\
			<input type="number" ng-model="v1"/>\
			<h2 class="header"> {{title}} {{v1}}</h2>\
			<div class="t_content" ng-transclude>\
			</div>\
			 </div></div> ',
			 link : function (scope,iElem, iAttr ) {
			 
			 }
		};
});


 C2module
	.run(function($rootScope, $timeout){
		$rootScope.myValue = "Undefined";
		$rootScope.taDis = true;
		$timeout(function(){
			$rootScope.taDis = false;
		},5000);

	}).controller('myCtrl', function($scope, getUsers){
		// console.log("Controller");	
		$scope.equation ={};
		$scope.Eqchange= function() {
			$scope.equation.output = Number($scope.equation.x)	*2;
		};
		
		$scope.myValue="AAA";
		$scope.myText="Romiq";
		getUsers.result().success(function(data){
			$scope.users= data;
		 });

		$scope.sg={};
		$scope.sg.fields=[
			{name : "UserName", model: "u" , isRequired : true, placeholder : "Type Name" },
			{name : "Password", model: "p" , isRequired : true, placeholder : "Password" },
			{name : "Email", model: "e" , isRequired : false, placeholder : "Your e-mail" }

		];
	})
	.directive('samY',function(){
	
		return {
		restrict: 'A',
		scope : {
			myUrl : '@',
			myText : '@' // binding myText to my-text attribute -
			// myText : '@myUrl2' // binding myText to my-url2 attribute
		},
		replace : true,
		template: '<a href="{{myUrl}}"> {{myText}}</a>' 
	 
		};
	}).directive('samY2',function(){

		return {
			restrict : 'A',
			scope : {
				myUrl2 : '=topInput',
				myText : '@'
			},
			replace : true,
			template : "<div><input type='text' ng-model='myUrl2'> <br/> <a href='{{myUrl2}}'>{{myText}}</a> </div>"

		};

	});

	function createDirective(name, p) {
		return function () {
			return {
			restrict : 'E',
			priority : p,
			compile : function (tElem, tAttrs) {
				// console.log( "\n"  );
				// console.log( " compileing " + name  +  " # " + (new Date()).getTime() );
				return {
					pre : function (scope, iElem, iAttrs) {
						// console.log( " pre " + name);	
					},
					post : function (scope, iElem, iAttrs) {
						// console.log( " post " + name);	
					}
				};

			}	
		};
	};
	}

	C2module.directive("levelOne", createDirective("levelOne", 2));
	C2module.directive("levelOne", createDirective("levelTwo",3));
	C2module.directive("levelOne", createDirective("levelThreee", 1));
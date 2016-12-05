/* Script dependencies */

require('./TUI.html');
require('./foundation.min.css');
 
var angular = require('angular');
var TUImodule =angular.module("TUI", []);

TUImodule.factory('getLocalJson', [ "$http",function($http){
  var getCustomers = function () {
    return $http.get("/users.json");  
  };
 return {
    result : getCustomers
  };
 }]);

TUImodule.run(function($rootScope) {
        $rootScope.name = "ZADA";
    })
    .controller('tuiCtrl', function($scope, $filter) {
        console.log("tuiCttttrl");
        $scope.clock = {
            now: new Date()
        };
        var updateClock = function() {
            $scope.clock.now = new Date();

        };
        setInterval(function() {
            $scope.$apply(updateClock);
        }, 1000);
    }).controller('FirstCtrl', function($scope) {
        $scope.counter = 0;
        $scope.add = function(t) {
            $scope.counter += t;
        };
        $scope.substract = function(t) {
            $scope.counter -= t;
        };

    }).controller('P1', function($scope, $parse) {
        // partent controller for P2
        $scope.person = { greeted: false };
        $scope.$watch('some_exp', function(newValue, oldValue, scope) {
            // console.log(" old " + oldValue);
            // console.log(" new " + newValue );
            $scope.parsedValue = oldValue;
        });
    }).controller('P2', function($scope) {
        $scope.sayHe = function() {
            $scope.person.name = " Romica KK";
            $scope.person.greeted = true;
            // P2 can access P1 via prototypal inheritance

        };
    }).controller('CustomValidation', function($scope, getLocalJson) {
          
         getLocalJson.result().success(function(data){
                $scope.queryUsers = data;
         }); 
         // $scope.$watch('queryUsers',function(n, o, scope){
         //        console.log (o + " # " + new Date());
         //        console.log (n + " # " + new Date());
         // });

        $scope.val= 20;
        $scope.setValue= function (val) {
            $scope.val= val;
        };
    
    }).directive('evenNumber', function () {
        return {
            require : 'ngModel',
            link : function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.unshift(checkForEven);
                ctrl.$formatters.unshift(checkForEven);

                function checkForEven(viewValue) {
                    if (parseInt(viewValue)%2 === 0) {
                        ctrl.$setValidity('evenNumber', true);
                    }
                    else {
                        ctrl.$setValidity('evenNumber', false);
                    }

                    return viewValue;
                }

            }
        };
    }).filter('capitalize', function() {
        return function(input) {
            if (input)
                return input[0].toUpperCase() + input.slice(1);
        };
    }).directive('ensureUnique', function(){
        return {

        require : 'ngModel',
        link : function (scope, element, attrs, c) {

               
            scope.$watch(attrs.ngModel, function(n, o, scope){
                var  isValid = true; 
                       if (typeof n !== "undefined" )  {
                            console.log(n);

                            angular.forEach(scope.queryUsers, 
                                function (v,k) {
                                    if (v.name===n) {
                                        isValid = false;
                                        console.log(v.name + " # " + k);    
                                    }
                                    
                                }
                                );
                        c.$setValidity('unique', isValid) ;     
                       }

            });

          
        }   
    };
    });

/*
    $digest() is called to see it the value has changed--is Dirty
    angular.module('name',[]) <- the array presents list of dependecise/injectables
    angular.module('myApp') <- This method is known as the getter method, whereby we can get the Angular module for
later reference.
    !injectable are load before the module itself
    $scope -it’s the glue between the view and the controller
    a $scope is no longer needed, the child scope creator will need to call scope.$destroy() to
clean up the child scope.
    When we create a new controller on a page, Angular passes it a new $scope
    ng-app level scope is called the $rootScope
    Angular evaluates expressions by an internal service (called the $parse service)
*/


// angular.module("TUI", [])
//     .controller('tuiCtrl', ['tuiFactory', function(tuiFactory) {

//      tuiFactory.test();
//         console.log('my tuiCtrl' + tuiFactory.test('local'));
//     }]).factory('tuiFactory', function($http) {

//         var postApi = function() {
//          return $http({
//                 method: 'JSONP',
//                 url: 'https://ldm.nurago.com/api/v1/dmi.tt/source-panels/13/members?apikey=OTXMl4ANNqHtIxIwm7deqIcdAYQvB4QJXNp7OMX6aLzSwJbPtUjlE2GUDThrPr2KOeNWene5TPmpXKEaZ7AZtlHX4Kqu2cQXAk7I&apikey=OTXMl4ANNqHtIxIwm7deqIcdAYQvB4QJXNp7OMX6aLzSwJbPtUjlE2GUDThrPr2KOeNWene5TPmpXKEaZ7AZtlHX4Kqu2cQXAk7I&callback=JSON_CALLBACK',
//                 data: JSON.stringify( {
//                     "household_id": "pjtu9965332",
//                      "person_id": "1",
//                     "policy_accepted": "true",
//                     "name": "Denisa",
//                     "attributes": {
//                         "emailAddress": "denisa.tnae@gfk.com"
//                     },
//                     "tags": "test"
//                 }),

//                 responseType : "text"
//             }).then(function(data, status, headers, config){
//              console.log("success " + data);
//      }, function(data, status, headers, config){
//          console.log("fail" + status);
//          console.log(data);
//      }); 

//       };

//         return {
//          test : postApi
//          } ;

//     });


require('./drive-dir.html');
require('./bear.scss');

var angular = require('angular');
var anim_angular = require('angular-animate');
var touch_angular = require('angular-touch');

angular.module('myApp', ['ngAnimate']).controller('theControler', ['$compile', '$scope',   'myEditsFactory', function($compile, $scope,  myEditsFactory) {
    $scope.Tsum = 0;
    this.selector = ".Question_Text";

    $scope.nr_of_categories = document.querySelectorAll(this.selector).length || -1;
    this.myEdits = myEditsFactory.get(".Question_Text input[type='texts']");


    $scope.localSumArray = [];
    $scope.resultContainer = "#test1";

    var otherDir = "";

    for (var i = 0; i <= document.querySelectorAll(this.selector).length - 1; i++) {
       // document.querySelectorAll(this.selector)[i].style.display = "none"; /*hide pre-rendered */
        /*Drive elements have the same id */
        var tempId = document.querySelectorAll(this.selector)[i].getAttribute("id");
    	    document.querySelectorAll(this.selector)[i].setAttribute("id", tempId + "_" + i);
 		otherDir += "<el-directive intial=" + document.querySelectorAll(this.selector)[i].getAttribute("id") + " myIndex=" + i + "></el-directive>";
        $scope.localSumArray.push(0);
    }
 	otherDir += "<div class=\"i_container\"><div id=\"total_sum\" class=\"btn-hidden\"> {{Tsum}} </div></div>";
    var directive2 = $compile(otherDir)($scope);
    angular.element(document.querySelectorAll($scope.resultContainer)).append(directive2);


    var myEdits = myEditsFactory.get(".Question_Group input[type='text']");
    for (var i = 0; i < myEdits.length; i++) {
        myEdits[i].setAttribute("value", "{{localSumArray[" + i + "] | number:2 }}");
       // myEdits[i].style.display="none";
    };

    $compile(myEdits)($scope);

    $scope.$on('valChange', function(event, data) {
        $scope.Tsum = data.new_val;
        $scope.localSumArray = [];

        for (var i = 0; i <= $scope.nr_of_categories - 1; i++) {
            if (i !== parseInt(data.the_intial)) {
                $scope.Tsum += parseInt(angular.element(document.querySelectorAll(".group_sum")[i]).text());
                $scope.localSumArray[i] = parseInt(angular.element(document.querySelectorAll(".group_sum")[i]).text());
            } else {
                $scope.localSumArray[i] = data.new_val;
            }
        }
 	});
}]).factory('myEditsFactory', function() {
    return {
        get: function(selector) {
            return document.querySelectorAll(selector);
        }
    };
}).factory('myHeadersAndText', function() {
    return {
        get: function(selector) {
            return document.querySelectorAll(selector);
        }
    };
}).directive("elDirective", function($log) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            the_innersum: "=innersum",
            nr_of_categories: "=nr"
        },
        template: "<div class=\"i_container\" innersum=\"Tsum\" nr=\"nr_of_categories\"  replace=\"test1\"><section><button type=\"button\" class=\"btn btn-primary toogleB\" ng-class=\"elementVisible?'btn-visible':'btn-hidden'\" ng-click=\"contentV()\">  &nbsp; </button></section><section ng-show=\"elementVisible\" class=\"item_container\"><div class=\"text_placeholder\" ></div><div class=\"number_placeholder\"><input class=\"logo_input\" type=\"number\" name=\"i1\" ng-model=\"t_i1\" maxlength=\"2\" ng-change=\"iCh()\" /><input class=\"logo_input\" type=\"number\" name=\"i2\" ng-model=\"t_i2\" maxlength=\"2\" ng-change=\"iCh()\" /><br/><hr><div class=\"group_sum \">{{local_sum}}</div></div></section></div> ",
        link: function(scope, el, attrs) {
            scope.t_i1 = 0;
            scope.t_i2 = 0;
            scope.elementVisible = true;
            scope.local_sum = scope.t_i1 + scope.t_i2;
            var el2 = el[0].querySelector(".text_placeholder");
            var elT = el[0].querySelector(".toogleB");
            var header1 = document.getElementById(attrs.intial);
            angular.element(elT).html(angular.element(header1.childNodes[2]).html());
            angular.element(el2).html(header1.childNodes[3].data);
            scope.iCh = function() {
                if (!angular.isDefined(this.t_i1) || isNaN(parseInt(this.t_i1))) {
                    this.t_i1 = 0;
                }
                if (!angular.isDefined(this.t_i2) || isNaN(parseInt(this.t_i2))) {
                    this.t_i2 = 0;
                }
                scope.local_sum = this.t_i1 + this.t_i2;
                scope.$emit('valChange', { new_val: scope.local_sum, the_intial: attrs.myindex });
            };
            scope.contentV = function() {
                scope.elementVisible = !scope.elementVisible;
            };
        }
    };
});

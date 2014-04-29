'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.say = function (note) {
    	alert('clicked: ' + note);
    }; 

}]);


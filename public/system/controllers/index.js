'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    // Create the default pricing list below, using one big string because the point of the exercise is to parse this
    // in the code, not use a grid type control in the UI.  A future revision may include a grid control. 
    $scope.pricingList = 'Modify the pricing list below, click submit, then scan items:\n\n';
    $scope.pricingList += 'item    Unit Price    Special Price\n';
    $scope.pricingList += ' A         50           3 for 130\n';
    $scope.pricingList += ' B         30           2 for 45\n';
    $scope.pricingList += ' C         85\n';
    $scope.pricingList += ' D         155\n';
    $scope.pricingList += ' E         90           5 for 375';

    // By default, disable all scan buttons until pricing rules are submitted:
    $scope.isDisabled = true;

    $scope.scan = function (item) {
    	console.log ('clicked: ' + item);
    	return;
    }; 

    $scope.pricingListSubmit = function() {
      console.log ($scope.pricingList);
      var lines = $scope.pricingList.split('\n');
      for (var i = 3; i < lines.length; i++) {
      	var words = lines[i].trim().split(/\s+/);
      	console.log (words);
      }
      $scope.isDisabled = false;
      // Just do front end for now, will connect to Mongoose backend later...
      
      return;
    };

    $scope.reset = function() {
      console.log ('Reset clicked');
      return;
    };

}]);


// Tutorial at: www.sitepoint.com/introduction-mean-stack/

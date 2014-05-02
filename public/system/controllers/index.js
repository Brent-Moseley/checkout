'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    // Create the default pricing list below, using one big string because the point of the exercise is to parse this
    // in the code, not use a grid type control in the UI.  A future revision may include a grid control. 
    $scope.pricingList = 'Modify the pricing list below (prices in cents), click submit, then scan items:\n\n';
    $scope.pricingList += 'Item    Unit Price    Special Price\n';
    $scope.pricingList += ' A         50           3 for 130\n';
    $scope.pricingList += ' B         30           2 for 45\n';
    $scope.pricingList += ' C         85\n';
    $scope.pricingList += ' D         155\n';
    $scope.pricingList += ' E         90           5 for 375';

    // By default, disable all scan buttons until pricing rules are submitted:
    $scope.isDisabled = true;
    $scope.pricingTable = [];
    $scope.order = [0, 0, 0, 0, 0];    // Simply holds the quality of each purchased item, in alpha order (ie A, B, ...)
    $scope.totalSale = 'Sale details will appear here, once you submit\nthe pricing rules and scan items.';

    $scope.scan = function (item) {
      console.log ('clicked: ' + item);
      var indexForItem = item.charCodeAt(0) - 65;    // 65 is the ASCII code for 'A'
      $scope.order[indexForItem]++;
      console.log ('Now has: ' + $scope.order[indexForItem]);
      $scope.calculateAndDisplayOrder();

      return;
    }; 


    $scope.calculateAndDisplayOrder = function() {
      $scope.totalSale = '';
      var grandTotal = 0;
      for (var i = 0; i < $scope.order.length; i++) {
      	var numOrdered = $scope.order[i];
      	if (numOrdered > 0) {
      	  console.log ('Looking at ' + String.fromCharCode(i+65) + ' ordered ' + numOrdered.toString());
      	  $scope.totalSale += 'Item: ' + String.fromCharCode(i+65) + '   Qty: ' + numOrdered.toString();
      	  var price = $scope.pricingTable[i].unitPrice;
          var totalPrice = 0;
      	  if ($scope.pricingTable[i].hasSpecial) {
            var units = $scope.pricingTable[i].specialNum;
            var specialPrice = $scope.pricingTable[i].specialPrice;
            var groups = Math.floor(numOrdered / units) * specialPrice;
            totalPrice = groups + (numOrdered % units) * price;
      	  }
      	  else {
            totalPrice = numOrdered * price;
      	  }
      	  
          console.log ('   Total Price: ' +  totalPrice / 100);
          $scope.totalSale += '   Total Price: ' + monetize(totalPrice) + '\n';
          grandTotal += totalPrice;
      	}  
      }
      $scope.totalSale += ' GRAND TOTAL: ' + monetize(grandTotal);
      return;
    };


    $scope.pricingListSubmit = function() {
      console.log ($scope.pricingList);
      var lines = $scope.pricingList.split('\n');
      for (var i = 3; i < lines.length; i++) {
      	var words = lines[i].trim().split(/\s+/);
        
        var specialNum = 0;
        var specialPrice = 0;
        var hasSpecial = false;

        if (words[2]) {
        	specialNum = parseInt(words[2]);
        	specialPrice = parseInt(words[4]);
        	hasSpecial = true;
        }
        var current = {
      	  item: words[0],
      	  unitPrice: parseInt(words[1]),
      	  hasSpecial: hasSpecial,
      	  specialNum: specialNum,
      	  specialPrice: specialPrice
        };
        $scope.pricingTable.push(current);
      	//console.log (current);
      }
      $scope.isDisabled = false;     // Allow for purchases
      $scope.order = [0, 0, 0, 0, 0];  // Reset any current order items. 
      $scope.totalSale = '';
      console.log ($scope.pricingTable);
      // Just do front end for now, will connect to Mongoose backend later...

      return;
    };

    var monetize = function(priceInCents) {
      var dollars = priceInCents / 100;
      
      // in future: use Javascript sprintf: https://github.com/alexei/sprintf.js  
    }

    $scope.reset = function() {
      console.log ('Reset clicked');
      $scope.totalSale = '';
      $scope.order = [0, 0, 0, 0, 0];
      return;
    };

}]);


// Tutorial at: www.sitepoint.com/introduction-mean-stack/
// Also, good info on design at balderdash.co.  Sails might be a useful alternative to working directly with Express.

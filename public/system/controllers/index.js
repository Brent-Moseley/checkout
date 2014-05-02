'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    // Create the default pricing list below, using one big string because the point of the exercise is to parse this
    // in the code, not use a grid type control in the UI.  A future revision may include a grid control, make more use of
    // Angular UI features.  Will also save these rules to the Mongo DB via Mongoose.  
    $scope.pricingList = 'Modify the pricing list below (prices in cents), click submit, then scan items:\n\n';
    $scope.pricingList += 'Item    Unit Price    Special Price\n';
    $scope.pricingList += ' A         50           3 for 130\n';
    $scope.pricingList += ' B         30           2 for 45\n';
    $scope.pricingList += ' C         85\n';
    $scope.pricingList += ' D         155\n';
    $scope.pricingList += ' E         90           5 for 375';

    // Initialize values
    $scope.isDisabled = true;     // By default, disable all scan buttons until pricing rules are submitted:
    $scope.pricingTable = [];
    $scope.order = [0, 0, 0, 0, 0];    // Simply holds the quality of each purchased item, in alpha order (ie A, B, ...)
    $scope.totalSale = 'Sale details will appear here, once you submit\nthe pricing rules and scan items.';

    // Scan one item, redisplaying the order list. 
    $scope.scan = function (item) {
      var indexForItem = item.charCodeAt(0) - 65;    // 65 is the ASCII code for 'A'
      $scope.order[indexForItem]++;
      $scope.calculateAndDisplayOrder();

      return;
    }; 


    $scope.calculateAndDisplayOrder = function() {
      $scope.totalSale = '';   // String holding entire order list, is mapped to a page element via Angular
      var grandTotal = 0;

      // Loop through all items that could be ordered, calculating prices, total, and displaying each line
      for (var i = 0; i < $scope.order.length; i++) {
      	var numOrdered = $scope.order[i];
      	if (numOrdered > 0) {
      	  $scope.totalSale += 'Item: ' + String.fromCharCode(i+65) + '   Qty: ' + numOrdered.toString();
      	  var price = $scope.pricingTable[i].unitPrice;
          var totalPrice = 0;

      	  if ($scope.pricingTable[i].hasSpecial) {
            var units = $scope.pricingTable[i].specialNum;
            var specialPrice = $scope.pricingTable[i].specialPrice;
            var groups = Math.floor(numOrdered / units) * specialPrice;   // grouped items qualify for special price, ie 4 of these cost $1.00.  Determine how many there are in this order.
            totalPrice = groups + (numOrdered % units) * price;       // The remaining items are regular price.  Calculate a total.
      	  }
      	  else {
      	  	// Just normal pricing.
            totalPrice = numOrdered * price;
      	  }
      	  
          $scope.totalSale += '   Total Price: ' + monetize(totalPrice) + '\n';
          grandTotal += totalPrice;
      	}  
      }
      $scope.totalSale += ' GRAND TOTAL: ' + monetize(grandTotal);   // Setting this string automatically updates it in the UI, via Angular.
      return;
    };


    // Internal helper function to show a price given in cents as a dollar value.  Returns a string. 
    var monetize = function(priceInCents) {
      var dollars = Math.floor(priceInCents / 100, 0);
      var cents = priceInCents % 100;
      var centPart = cents < 10?  '0' + cents : cents;
      return '$' + dollars + '.' + centPart;  
      // in future: use Javascript sprintf: https://github.com/alexei/sprintf.js  
    };


    // Create pricing table from the pricing list on the UI.
    $scope.pricingListSubmit = function() {
      console.log ($scope.pricingList);
      var lines = $scope.pricingList.split('\n');    // $scope.pricingList is a data bind model item in the UI
      var listStartsAt = 3;        // UI line where list actually starts.  Future refactor:  handle case where list does not start on third line.
      var positionItem = 0;             // column position where item name is found
      var positionUnitPrice = 1;	    // column position for unit price
      var positionSpecialPriceQty = 2;  // column position where special pricing quantity is, ie the 3 in '3 for 125'
      var positionSpecialPrice = 4;     // column position for price, ie 125 in '3 for 125'

      for (var i = listStartsAt; i < lines.length; i++) {              
        var specialNum = 0;
        var specialPrice = 0;
        var hasSpecial = false;
        var words = lines[i].trim().split(/\s+/);    // split each input line on one or more spaces.

        if (words[positionSpecialPriceQty]) {
        	specialNum = parseInt(words[positionSpecialPriceQty]);
        	specialPrice = parseInt(words[positionSpecialPrice]);
        	hasSpecial = true;
        }
        var current = {
      	  item: words[positionItem],
      	  unitPrice: parseInt(words[positionUnitPrice]),
      	  hasSpecial: hasSpecial,
      	  specialNum: specialNum,
      	  specialPrice: specialPrice
        };
        $scope.pricingTable.push(current);
      	console.log (current);
      }
      $scope.isDisabled = false;     // Allow for purchases by enabling the scan button bar. 
      $scope.order = [0, 0, 0, 0, 0];  // Reset any current order items to quantity of 0. 
      $scope.totalSale = '';
      //console.log ($scope.pricingTable);
      // Just do front end for now, will connect to Mongoose backend later...

      return;
    };


    // Helper function to reset all order items to 0.
    $scope.reset = function() {
      console.log ('Reset clicked');
      $scope.totalSale = '';
      $scope.order = [0, 0, 0, 0, 0];
      return;
    };

}]);


// Tutorial at: www.sitepoint.com/introduction-mean-stack/
// Also, good info on design at balderdash.co.  Sails might be a useful alternative to working directly with Express.

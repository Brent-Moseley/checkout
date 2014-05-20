'use strict';
 

// Need to update for FullText??

angular.module('mean.system').controller('PricingController', ['$scope', '$stateParams', '$location', 'Global', 'Pricing',
  function ($scope, $stateParams, $location, Global, Pricing) {
    $scope.global = Global;
 
    $scope.create = function() {
      console.log ('Creating new pricing in the controller.');
      var pricing = new Pricing({
        //item: this.pricingList,
        //description: this.description
      });
 
      pricing.$save(function(response) {
        //$location.path('/bucketList');
        console.log ('Save completed...');
      });
    };
  }
]);
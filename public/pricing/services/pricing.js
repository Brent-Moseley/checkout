'use strict';

//Pricing service used for pricing REST endpoint
angular.module('mean.system').factory('Pricing', ['$resource', function($resource) {
    return $resource('pricing/:pricingId', {
        pricingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
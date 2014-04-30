'use strict';

// Pricing routes use pricing controller
var pricing = require('../controllers/pricing');
var authorization = require('./middlewares/authorization');

// Pricing authorization helpers
var hasAuthorization = function(req, res, next) {
    // Just allow authorization - for now
	// if (req.pricing.user.id !== req.user.id) {
 //        return res.send(401, 'User is not authorized');
 //    }
    next();
};

module.exports = function(app) {

    //app.get('/pricing', pricing.all);
    app.post('/pricing', authorization.requiresLogin, pricing.create);
    //app.get('/pricing/:pricingId', pricing.show);
    //app.put('/pricing/:pricingId', authorization.requiresLogin, hasAuthorization, pricing.update);
    //app.del('/pricing/:pricingId', authorization.requiresLogin, hasAuthorization, pricing.destroy);

    // Finish with setting up the pricingId param
    //app.param('pricingId', pricing.pricing);

};
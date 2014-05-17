'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Pricing = mongoose.model('Pricing');
    //_ = require('lodash');


/**
 * Find article by id
 */
exports.pricing = function(req, res, next, id) {
    Pricing.load(id, function(err, pricing) {
        if (err) return next(err);
        if (!pricing) return next(new Error('Failed to load pricing ' + id));
        req.pricing = pricing;
        next();
    });
};


exports.destroy = function(req, res) {
    console.log ('in Drop...');
    var pricing = new Pricing();
    pricing.collection.drop();
};

/**
 * Create a pricing
 */
exports.create = function(req, res) {
    var pricing = new Pricing(req.body);
    console.log ('server controller pricing.....');
    pricing.item = req.body.item;
    pricing.unitPrice = req.body.unitPrice;
    pricing.specialOffer = req.body.specialOffer;
    pricing.specialPriceUnits = req.body.specialPriceUnits;
    pricing.specialPriceTotal = req.body.specialPriceTotal;

    pricing.save(function(err) {
        if (err) {
            console.log ('Damn, error!  ' + err);
            // return res.send('users/signup', {
            //     errors: err.errors,
            //     pricing: pricing
            // });
        } else {
            res.jsonp(pricing);
        }
    });
};

/**
 * Update a pricing  - implement later
 
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Delete an article  - implement later
 
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        } else {
            res.jsonp(article);
        }
    });
};

*/
/**
 * Show a pricing 
 */
exports.show = function(req, res) {
    res.jsonp(req.pricing);
};

/**
 * List of Articles - do later
 
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};  */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Pricing = mongoose.model('Pricing'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Pricing.load(id, function(err, pricing) {
        if (err) return next(err);
        if (!pricing) return next(new Error('Failed to load pricing ' + id));
        req.pricing = pricing;
        next();
    });
};

/**
 * Create a pricing
 */
exports.create = function(req, res) {
    var pricing = new Pricing(req.body);
    pricing.item = req.item;
    pricing.unitPrice = req.unitPrice;
    pricing.specialOffer = req.specialOffer;
    pricing.specialPriceUnits = req.specialPriceUnits;
    pricing.specialPriceTotal = req.specialPriceTotal;

    pricing.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                pricing: pricing
            });
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
 * Show an article
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

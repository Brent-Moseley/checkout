'use strict';

/**
 * Module dependencies.
 */

/*   
 Showing MongoDB data from the terminal:
 db.pricings.find()
 show dbs
 use mean-dev
 show collections
 */
var mongoose = require('mongoose'),
    Pricing = mongoose.model('Pricing');
    //_ = require('lodash');


/**
 * Find article by id
 */
exports.pricing = function(req, res, next, id) {
    Pricing.find(id, function(err, pricing) {
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
    var pricing = new Pricing();
    console.log ('server controller pricing.....');
    console.log ('Full text: ' + req.body.fullText);
    pricing.item = req.body.item;
    pricing.fullText = req.body.fullText;
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
 * Show / read pricing list. 
 */
exports.show = function(req, res) {
    console.log (' In show');
    //var pricing = new Pricing();
    Pricing.find({ item: 'A'}, function(err, pricing) {
        if (err) return next(err);
        if (!pricing) return (new Error('Failed to load pricing '));
        //req.pricing = pricing;
        console.log ('Read record: ' + pricing[0]);
        res.json(pricing[0]);      // Should not have to do like this, fix resource configuration later... 
        // http://scotch.io/tutorials/javascript/creating-a-single-page-todo-app-with-node-and-angular
    });


    //res.jsonp(req.pricing);
};

/**
 * List of Articles - do later   -- Use this to return a set of records.   
 
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

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * pricing Schema
 */
var PricingSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    item: {
        type: String,
        default: '',
        trim: false
    },
    unitPrice: {
        type: Number,
        default: 0
    },
    specialOffer: {
        type: Boolean,
        default: false
    },
    specialPriceUnits: {
        type: Number,
        default: 0
    },
    specialPriceTotal: {
        type: Number,
        default: 0
    }
});

/**
 * Validations
 */
// ArticleSchema.path('title').validate(function(title) {
//     return title.length;
// }, 'Title cannot be blank');

// /**
//  * Statics
//  */
// ArticleSchema.statics.load = function(id, cb) {
//     this.findOne({
//         _id: id
//     }).populate('user', 'name username').exec(cb);
// };

mongoose.model('Pricing', PricingSchema);

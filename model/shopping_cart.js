var Item = require('./item');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model('Shopping_Cart', schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model('Item', schema);
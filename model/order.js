var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    date: {type: String, required: true},
    address: {type: String, required: true},
    card_holder: {type: String, required: true},
    card_number: {type: String, required: true},
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', schema);
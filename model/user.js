var mongoose = require('mongoose');
var Order = require('./order');
var Shopping_Cart = ('./shopping_cart');

var Schema = mongoose.Schema;
var schema = Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, required: true},
    birth: {type: String, required: true},
    address: {type: String, required: true},
    password: {type: String, required: true},
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    shopping_cart: [{ type: Schema.Types.ObjectId, ref: 'Shopping_Cart' }]
});

module.exports = mongoose.model('User', schema);
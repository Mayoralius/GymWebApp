var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var Product = require('../model/product');
var User = require('../model/user');
var Item = require('../model/item');
var Shopping_Cart = require('../model/shopping_cart');
var Order = require('../model/order');
var uri = 'mongodb://localhost/zzotech';
mongoose.Promise = global.Promise;

var users = [
    {
        name: 'Samuel',
        surname: 'Verdejo de Toro',
        email: 'samuel.verdejo@alu.uclm.es',
        birth: '1998/03/04',
        address: 'address',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        orders: [],
        shopping_cart: []
    },
    {
        name: 'Rafael',
        surname: 'Mayoral González',
        email: 'Rafael.Mayoral@alu.uclm.es',
        birth: '1997/02/17',
        address: 'address',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        orders: [],
        shopping_cart: []
    },
    {
        name: 'Jorge',
        surname: 'Navarro García',
        email: 'Jorge.Navarro@alu.uclm.es',
        birth: '1998/07/20',
        address: 'address',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        orders: [],
        shopping_cart: []
    }
];

var db = mongoose.connection;
db.on('connecting', function() {
    console.log('Connecting to ', uri);
});
db.on('connected', function() {
    console.log('Connected to ', uri);
});
db.on('disconnecting', function() {
    console.log('Disconnecting from ', uri);
});
db.on('disconnected', function() {
    console.log('Disconnected from ', uri);
});
db.on('error', function(err) {
    console.error('Error ', err.message);
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(function(){ return User.deleteMany(); })
    .then(function(){
        var promises = [];
        users.forEach(function(user){
            var sc = new Shopping_Cart ({items: [], subtotal: 0, tax: 21, total: 0});
            promises.push(sc.save());
            promises.push(new User({name: user.name, surname: user.surname, email: user.email, birth: user.birth, address: user.address, password: user.password, orders: user.orders, shopping_cart: sc}).save())
        });
        return Promise.all(promises)
    })
    .then(function(){
        mongoose.disconnect();
    })
    .catch(function(err){
        console.error('Error', err.message);
    });
module.exports = mongoose.connection;


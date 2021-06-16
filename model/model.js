var bcrypt = require('bcryptjs');
var Model = {};
var Product = require('./product');
var User = require('./user');
var Shopping_Cart = require('./shopping_cart');
var Item = require('./item');
var Order = require('./order');


//PRODUCTS______________________________________________________________________________________________________________
Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
            resolve(Product.find());
            reject('There is no products in the DB')
    });
};

Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
            resolve(Product.findById(pid))
            reject('Product with ID: ' + pid + 'does not exist in the DB')
    });
};
//SHOPPING CART_________________________________________________________________________________________________________
Model.getShoppingCart = function (uid) {
    return User.findById(uid)
        .then(function(user){
            return Shopping_Cart.findById(user.shopping_cart).populate({ path: 'items'});
        });
};

Model.getShoppingCartItems = function (uid) {
    return User.findById(uid)
        .then(function(user){
            return Shopping_Cart.findById(user.shopping_cart).populate({ path: 'items', populate: {path: 'product'}});
        });
};

Model.addToShoppingCart = function (pid, uid) {
    var promises = [Product.findById(pid), Model.getShoppingCartItems(uid)];
    return Promise.all(promises)
        .then(function (res) {
            product = res[0];
            cart = res[1];
            var promises = [];
            cart.items.forEach(function(item){
                if (item.product._id.toString() == product._id.toString()){
                    item.quantity += 1;
                    item.total += product.price;
                    cart.subtotal += product.price;
                    cart.total = cart.subtotal + (cart.subtotal * (cart.tax / 100));
                    promises.push(item.save());
                    promises.push(cart.save());
                }
            });
            if (promises.length == 0){
                var item = new Item({product: product, quantity: 1, total: product.price });
                promises.push(item.save());
                cart.items.push(item);
                cart.subtotal += product.price;
                cart.total = cart.subtotal + (cart.subtotal * (cart.tax / 100));
                promises.push(cart.save());
                return Promise.all(promises);
            }else{return Promise.all(promises);}
        });
};

Model.removeAllCartItem = function (pid, uid) {
    var promises = [Model.getProduct(pid), Model.getShoppingCartItems(uid)];
    return Promise.all(promises)
        .then(function (res) {
            return new Promise(function (resolve, reject) {
                product = res[0];
                cart = res[1];
                var promises = [];
                cart.items.forEach(function(item){
                    if (item.product._id.toString() == product._id.toString()){
                        promises.push(item.remove());
                        cart.subtotal -= (product.price * item.quantity);
                        cart.total = cart.subtotal + (cart.subtotal * (cart.tax / 100));
                        promises.push(cart.save());
                        resolve(promises)
                    }
                });
                reject("Product not in cart");
            })
        })
};

Model.removeOneCartItem = function (pid, uid) {
    var promises = [Model.getProduct(pid), Model.getShoppingCartItems(uid)];
    return Promise.all(promises)
        .then(function (res) {
            return new Promise(function (resolve, reject) {
                product = res[0];
                cart = res[1];
                var promises = [];
                console.log('CART: ' + cart);
                cart.items.forEach(function(item){
                    if (item.product._id.toString() == product._id.toString()){
                        if (item.quantity == 1){
                            promises.push(item.remove());
                            cart.subtotal -= product.price;
                            cart.total = cart.subtotal + (cart.subtotal * (cart.tax / 100));
                            promises.push(cart.save());
                            resolve(promises)
                        }
                        else{
                            item.quantity -= 1;
                            item.total -= product.price;
                            promises.push(item.save());
                            cart.subtotal -= product.price;
                            cart.total = cart.subtotal + (cart.subtotal * (cart.tax / 100));
                            promises.push(cart.save());
                            resolve(promises)
                        }
                    }
                });
                reject("Product not in cart");
            })
        })
};
//USERS_________________________________________________________________________________________________________________
Model.signup = function (name, surname, birth, address, email, password) {
    return new Promise(function (resolve, reject) {
        return User.findOne({ email: email })
            .then(function (user) {
                console.log(user);
                if (user) reject('Email already in database');
                else {
                    return new Shopping_Cart ({items: [], subtotal: 0, tax: 21, total: 0}).save()
                        .then(function(sc){
                            resolve(new User({ name: name, surname: surname, birth: birth, address: address, password: bcrypt.hashSync(password), email: email, shopping_cart: sc }).save());
                        })
                }
            })
    });
};

Model.signin = function (email, password) {
    return new Promise(function (resolve, reject) {
        return User.findOne({ email: email })
            .then(function (user) {
                if (!user) reject('Email not found');
                else if (!bcrypt.compareSync(password, user.password)) reject('Password mismatch!');
                else resolve(user._id);
            })
    });
};

Model.getProfile = function (user) {
    return new Promise(function (resolve, reject) {
        resolve(user);
        reject('There is no user logged');
    });
};

//ORDERS________________________________________________________________________________________________________________
Model.getOrders = function (uid) {
    return User.findById(uid)
        .then(function(user){
            var promises = []
            user.orders.forEach(order => promises.push(Order.findById(order)));
            return Promise.all(promises);
        });
};

Model.addOrder = function(uid) {
    var promises = [User.findById(uid), Model.getShoppingCart(uid)];
    return Promise.all(promises)
        .then(function (res) {
            user = res[0];
            cart = res[1];
            var promises = [];
            let order = new Order({
                date: new Date(),
                address: user.address,
                card_holder: user.name,
                card_number: '0000-0000-0000-0000',
                items: cart.items,
                subtotal: cart.subtotal,
                total: cart.total,
                tax: cart.tax
            });
            promises.push(order.save());
            user.orders.push(order);
            promises.push(user.save());
            cart.items = [];
            cart.subtotal = 0;
            cart.total = 0;
            promises.push(cart.save());
            return Promise.all(promises)
        })
};

Model.getOrder = function (uid, oid) {
    return Order.findById(oid).populate({path: 'items', populate: 'product'})
};

module.exports = Model;
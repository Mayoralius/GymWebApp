var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../config/passport');

var model = require('../model/model.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('API base');
});

//PRODUCTS

router.get('/products', function(req, res, next) {
    model.getProducts()
        .then(function(products) {
            res.json(products);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
});

router.get('/products/:pid', function (req, res, next) {
    model.getProduct(req.params.pid)
        .then(function(product) {
            res.json(product);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
});
//-------------------------------------------------------------------------
//SHOPPING CART
// Returns the cart for user :uid
router.get('/users/:uid/cart', function (req, res, next) {
    model.getShoppingCart(req.params.uid)
        .then(function (cart) {
            res.json(cart)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err)
        })
});
//Returns item collection containing products of the cart for user
// :uid
router.get('/users/:uid/cart/items', function (req, res, next) {
    model.getShoppingCartItems(req.params.uid)
        .then(function (cart) {
            res.json(cart);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err);
        })
});
// Increases the number of the product item :pid in cart for user
// :uid
router.post('/users/:uid/cart/items/:pid', function (req, res, next) {
    model.addToShoppingCart(req.params.pid, req.params.uid)
      .then(function (cart) { res.json(cart); })
      .catch(function (err) {
          console.error(err);
          res.status(500).json(err);
      })
});

//Removes the item of the product :pid from item collection for
// user :uid --> Delete all
router.delete('/users/:uid/cart/items/:pid', function (req, res, next) {
    model.removeAllCartItem(req.params.pid, req.params.uid)
      .then(function (cart) { res.json(cart); })
      .catch(function (err) {
          console.error(err);
          res.status(500).json(err);
      })
});
//Decrease the number of items of product :pid from item collection for user :uid
//--> Delete One
router.delete('/users/:uid/cart/items/:pid/decrease', function (req, res, next) {
    model.removeOneCartItem(req.params.pid, req.params.uid)
        .then(function (cart) { res.json(cart); })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
});

//-------------------------------------------------------------------------
//USERS
router.post('/users/signup', function (req, res, next) {
    model.signup( req.body.name, req.body.surname, req.body.birth, req.body.address, req.body.email, req.body.password)
        .then(function (result) { res.json(result); })
        .catch(function (err) {
            console.log(err);
            res.status(401).json(err);
        })
});

router.post('/users/signin', function (req, res, next) {
    /*model.signin(req.body.email, req.body.password)
        .then(function (user) {
            res.json(user)
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err)
        })*/
    return passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) { return res.status(400).json(err); }
        req.logIn(user, { session: false }, (err) => {
            if (err) { res.send(err); }
            var data = { id: user._id };
            const token = jwt.sign(data, passportConfig.secretKey, {
                expiresIn: 60 }); //seconds
            return res.json({ token });
        });
    })(req, res);
});

router.get('/users/profile', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    model.getProfile(req.user)
        .then(function (user) {
            res.json(user)
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json(err)
        })
});

router.get('/checkToken', passport.authenticate('jwt', {session: false}),
    function (req, res, next) {
        console.log('checkToken: ' + req.user._id);
        var data = { id: req.user._id };
        const token = jwt.sign(data, passportConfig.secretKey, { expiresIn: 60}); //seconds
        return res.json({ token });
    }
);
//-------------------------------------------------------------------------------

//ORDERS

router.get('/users/:uid/orders', function (req, res, next) {
    model.getOrders(req.params.uid)
        .then(function (products) {
            res.json(products);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        });
});

router.post('/users/:uid/orders', function (req, res, next) {
    model.addOrder(req.params.uid)
        .then(function (products) {
            res.json(products)
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err)
        })
});

router.get('/users/:uid/orders/:number', function (req, res, next) {
    model.getOrder(req.params.uid, req.params.number)
        .then(function (products) {
            res.json(products)
        })
        .catch(function (err) {
            console.error(err)
            res.status(500).json(err)
        })
});

router.get('/users/:uid/orders/:number/items', function (req, res, next) {
    model.getOrder(req.params.uid, req.params.number)
        .then(function (products) {
            res.json(products);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
});

module.exports = router;

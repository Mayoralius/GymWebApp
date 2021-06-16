let Model = {};

//PRODUCTS______________________________________________________________________________________________________________
Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/products',
            method: 'GET'
        })
            .done(function(products) {resolve(products); })
            .fail(function(err) { reject(err); })
    });
};

Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/products' + pid,
            method: 'GET'
        })
            .done(function (product) { resolve(product); })
            .fail(function (err) { reject(err) });
    });
};
//SHOPPING CART_________________________________________________________________________________________________________
Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid + '/cart',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (cart) { resolve(cart); })
            .fail(function (err) { reject(err); })
    });
};

Model.getShoppingCartItems = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid + '/cart/items',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (cart) { resolve(cart); })
            .fail(function (err) { reject(err); })
    });
};

Model.addToShoppingCart = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid + '/cart/items/' + pid,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (cart) { resolve(cart); })
            .fail(function (err) { reject(err); })
    });
};

Model.removeAllCartItem = function (pid, uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid + '/cart/items/' + pid,
            method: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function(user) { resolve(user); })
            .fail(function(err) { reject(err); });
    })
};

Model.removeOneCartItem = function (pid, uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid + '/cart/items/' + pid + '/decrease',
            method: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function(user) { resolve(user); })
            .fail(function(err) { reject(err); });
    })
};
//USERS_________________________________________________________________________________________________________________
Model.signup = function (name, surname, birth, address, email, password) {
    return new Promise(function (resolve,reject) {
        $.ajax({
            url: '/zzotech/api/users/signup',
            method: 'POST',
            data: { name: name, surname: surname, birth: birth, address: address, email: email, password: password }
        })
            .done(function (user) { resolve(user); })
            .fail(function (err) { reject(err); })
    });
};

Model.signin = function (email, password) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/signin',
            method: 'POST',
            data: { email: email, password: password },
        })
            .done(function (user) { resolve(user); })
            .fail(function (err) { reject(err); })
    });
};

Model.getProfile = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/profile',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (product) { resolve(product); })
            .fail(function (err) { reject(err); })
    });
};

Model.checkToken = function () {
    //Avisa en consola F12 cuando ha expirado la sesion
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/checkToken',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (token) { window.sessionStorage.setItem('token', token.token); resolve(token);})
            .fail(function (err) { console.log('Expired token!') });
    });
}

//ORDERS________________________________________________________________________________________________________________
Model.getOrders = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid + '/orders',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function(user) {resolve(user); })
            .fail(function(err) { reject(err); })
    });
};

Model.addOrder = function(uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/' + uid +'/orders' ,
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (cart) { resolve(cart); })
            .fail(function (err) { reject(err); })
    });
};

Model.getOrder = function (uid, oid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/zzotech/api/users/'+ uid + '/orders/' + oid,
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('token'));
            }
        })
            .done(function (user) { resolve(user); })
            .fail(function (err) { reject(err) });
    });
};
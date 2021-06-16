Controller.controllers.purchase={};

Controller.controllers.purchase.refresh = function () {
    var context = {}
    return Model.getProfile()
    .then(function(user){
        Model.getShoppingCartItems(user._id)
        .then(function(cart) {
            context.user = user;
            context.cart = cart;
            return new Promise (function (resolve, reject){
                if (cart.items.length == 0) { reject('Error, cart empty') }
                else { resolve( View.renderer.purchase.render(context));}
            });
        })
    });
};

Controller.controllers.purchase.checkout_onclick = function(event) {
    return Model.getProfile()
        .then(function(user){
            Model.addOrder(user._id)
        })
        .then(function(){
            console.log( "Order added succesfully.");
        })
        .catch(function () {
            console.error( "Order cannot be added.");
        })
        .finally(function() {
            Controller.router.go('/zzotech/views/profile')
        })

};


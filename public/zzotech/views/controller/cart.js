Controller.controllers.cart={};

Controller.controllers.cart.refresh = function (matching) {
    var context = {};
    return Model.getProfile()
    .then(function (user) {
        return Model.getShoppingCartItems(user._id)
        .then(function (cart) {
            context.user = user;
            context.cart = cart;
            console.log(context);
            View.renderer.cart.render(context);
        })
    });
};
Controller.controllers.cart.removeAllCartItem_onclick = function(event, pid){
    Model.getProfile()
        .then(function(user){
            Model.removeAllCartItem(pid, user._id)
                .then(function() {
                    console.log("Product (" + pid.toString() + ") removed succesfully.");
                    Controller.router.go('/zzotech/views/cart')
                })
                .catch(function (err) {
                    console.error("Product (" + pid.toString() + ") cannot be removed.");
                })
        });
};
Controller.controllers.cart.removeOneCartItem_onclick = function(event, pid){
    return Model.getProfile()
        .then(function(user){
            return Model.removeOneCartItem(pid, user._id)
                .then(function() {
                    console.log("One Unit of Product (" + pid.toString() + ") removed succesfully.");
                    Controller.router.go('/zzotech/views/cart')
                })
                .catch(function (err) {
                    console.error("Product (" + pid.toString() + ") cannot be removed.");
                })
        });
};

Controller.controllers.cart.goToPurchase_clicked = function () {
    Controller.router.go('/zzotech/views/purchase');
};


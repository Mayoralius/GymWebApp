Controller.controllers.index = {};

Controller.controllers.index.refresh = function () {
    var context = {};
    return Model.getProducts()
        .then(function(products){
            return new Promise (function (resolve, reject){
                resolve(Model.checkToken());
                reject(context.products = products,
                    View.renderer.index.render(context));
            })
                .then(function(token){
                    context.products = products;
                    context.user = token;
                    console.log(context);
                    View.renderer.index.render(context);
                })
        });
};

Controller.controllers.index.addToShoppingCart_onclick = function(event, product_id){
    event.preventDefault();
    Model.getProfile()
        .then(function (user) {
        Model.addToShoppingCart(user._id, product_id);
        })
        .then(function() {
        console.log("Product (" + product_id.toString() + ") added succesfully.");
        })
        .catch(function (err) {
        console.error("Product (" + product_id.toString() + ") cannot be added." + err);
        })
        .then(function() {
        Controller.router.go('/zzotech/views/index')
        })
};
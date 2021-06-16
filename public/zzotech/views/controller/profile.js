Controller.controllers.profile={};

Controller.controllers.profile.refresh = function () {
    var context = {};
    return Model.getProfile()
    .then(function (user) {
        return Model.getOrders(user._id)
        .then(function (orders) {
            context.user = user;
            context.orders = orders;
            View.renderer.profile.render(context);
            })
        });
};

Controller.controllers.profile.goToOrder_onclick = function (oid) {
    Controller.router.go('/zzotech/views/order/'+ oid.toString());
};


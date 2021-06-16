Controller.controllers.order={};

Controller.controllers.order.refresh = function () {
    var url = $(location).attr('href');
    var context = {};
    return Model.getProfile()
    .then(function(user){
        Model.getOrder(user._id, url.slice(-24))
        .then(function(order){
            context.order = order;
            View.renderer.order.render(context);
        });
    })
};
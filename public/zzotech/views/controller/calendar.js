Controller.controllers.calendar = {};

Controller.controllers.calendar.refresh = function () {
    var context = {};
    return Model.getDays()
        .then(function(days){
            return new Promise(function (resolve, reject) {
                resolve(Model.checkToken());
                reject(View.renderer.index.render(context));
            })
            .then(function (token) {
                context.days = days;
                View.renderer.calendar.render(context);
            })
    });
};
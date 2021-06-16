Controller.controllers.signin={};
Controller.controllers.signin.refresh = function (matching) {
    var context = {};
    return Model.getProducts()
        .then(function(products){
            context.products = products;
            View.renderer.signin.render(context);
        });
}

Controller.controllers.signin.signinButton = {};
Controller.controllers.signin.signinButton.clicked = function (event) {
    event.preventDefault();
    return Model.signin($('#signin_email').val(), $('#signin_password').val())
        .then(function (token) {
            window.sessionStorage.setItem("token", token.token);
            //console.log('Login success');
            Controller.messages.pushSuccess('Login success');
            console.log(Controller.messages.success)
            Controller.router.go('/zzotech/views/calendar');
        })
        .catch(function (err) {
            console.error(err)
            //Controller.messages.pushError(err.responseJSON);
            if (err.responseJSON.errors)
                if (err.responseJSON.errors.email)
                    Controller.messages.pushError(err.responseJSON.errors.email.message)
                else if (err.responseJSON.errors.password)
                    Controller.messages.pushError(err.responseJSON.errors.password.message)
                else
                    Controller.message.pushError('Unknown error');
            Controller.controllers.signin.refresh();
        })
}

Controller.controllers.signin.cancelButton = {}
Controller.controllers.signin.cancelButton.clicked = function (event) {
    event.preventDefault();
    Controller.router.go('/zzotech/views/index');
}

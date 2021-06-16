Controller.controllers.signup={};
Controller.controllers.signup.refresh = function (matching) {
  var context = {};
  return Model.getProducts()
      .then(function(products){
        context.products = products;
        View.renderer.signup.render(context);
      });
};

Controller.controllers.signup.signupButton = {};
Controller.controllers.signup.signupButton.clicked = function (event) {
  event.preventDefault();
  if ($('#password').val() != $('#password2').val()) {
    Controller.messages.pushError("Password mismatch");
    Controller.controllers.signup.refresh();
    return;
  } else {
    return Model.signup($('#name').val(), $('#surname').val(), $('#birth').val(), $('#address').val(), $('#email').val(), $('#password').val())
        .then(function () {
          Controller.messages.pushSuccess("Sign up success!");
          Controller.router.go('/zzotech/views/index');
        })
        .catch(function (err) {
          console.log(err);
          Controller.messages.pushError(err.responseJSON);
          Controller.controllers.signup.refresh();
        });
  }
};

Controller.controllers.signup.cancelButton = {}
Controller.controllers.signup.cancelButton.clicked = function (event) {
  event.preventDefault();
  Controller.router.go('/zzotech/views/index');
}
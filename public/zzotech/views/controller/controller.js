var Controller = {};
Controller.controllers = {};

Controller.router = {};
Controller.router.route = function () {
  var path = location.pathname;
  var matching = null;
  console.log('Routing ', path);
  if (matching = path.match(/^\/zzotech\/views\/index$/)) {
    Controller.controllers.index.refresh();
  } else if (matching = path.match(/^\/zzotech\/views\/signin$/)) {
    Controller.controllers.signin.refresh();
  } else if (matching = path.match(/^\/zzotech\/views\/profile$/)) {
    Controller.controllers.profile.refresh();
  } else if (matching = path.match(/^\/zzotech\/views\/order\/(\w*)$/)) {
    Controller.controllers.order.refresh();
  } else if (matching = path.match(/^\/zzotech\/views\/purchase$/)) {
    Controller.controllers.purchase.refresh();
  } else if (matching = path.match(/^\/zzotech\/views\/signup$/)) {
    Controller.controllers.signup.refresh();
  } else if (matching = path.match(/^\/zzotech\/views\/cart$/)) {
    Controller.controllers.cart.refresh();
  } else {
    console.error('Page not found!');
  }
};

Controller.router.go = function (url) {
  history.pushState(null, '', url);
  Controller.router.route();
};

Controller.messages = {};
Controller.messages.errors = [];
Controller.messages.pushError = function (error) {
  Controller.messages.errors.push(error);
};
Controller.messages.success = [];
Controller.messages.pushSuccess = function (success) {
  Controller.messages.success.push(success);
};

Controller.messages.popMessages = function () {
  var result = {
    errors: Controller.messages.errors.slice(),
    success: Controller.messages.success.slice()
  };
  Controller.messages.success = [];
  Controller.messages.errors = [];
  return result;
};
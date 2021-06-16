View.renderer.signin = {};
View.renderer.signin.render = function (c) {
  View.loadPartial('footer-partial');
  View.loadPartial('navbar-partial');
  View.loadPartial('product-partial');
  View.loadPartial('jumbotron-partial');
  View.renderTemplate('signin-template', 'contents', c);
}

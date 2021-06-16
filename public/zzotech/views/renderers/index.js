View.renderer.index = {};

View.renderer.index.render = function (c) {
  View.loadPartial('footer-partial');
  View.loadPartial('navbar-partial');
  View.loadPartial('product-partial');
  View.loadPartial('jumbotron-partial');
  View.renderTemplate('index-template', 'contents', c);
}

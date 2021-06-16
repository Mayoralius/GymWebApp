View.renderer.cart = {};
View.renderer.cart.render = function (c) {
    View.loadPartial('footer-partial');
    View.loadPartial('navbar-partial');
    View.loadPartial('jumbotron-partial');
    View.loadPartial('cart-partial');
    View.renderTemplate('cart-template', 'contents', c);
};

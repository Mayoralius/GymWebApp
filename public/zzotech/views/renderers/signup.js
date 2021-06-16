View.renderer.signup = {};
View.renderer.signup.render = function (c) {
    View.loadPartial('footer-partial');
    View.loadPartial('navbar-partial');
    View.loadPartial('product-partial');
    View.loadPartial('jumbotron-partial');
    View.renderTemplate('signup-template', 'contents', c);
};
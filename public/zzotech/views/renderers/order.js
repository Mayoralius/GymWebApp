View.renderer.order = {};
View.renderer.order.render = function (c) {
    View.loadPartial('footer-partial');
    View.loadPartial('navbar-partial');
    View.loadPartial('jumbotron-partial')
    View.loadPartial('order-partial');
    View.renderTemplate('order-template', 'contents', c);
};

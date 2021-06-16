View.renderer.purchase = {};
View.renderer.purchase.render = function (c) {
    View.loadPartial('footer-partial');
    View.loadPartial('navbar-partial');
    View.loadPartial('jumbotron-partial');
    View.loadPartial('purchase-partial');
    View.renderTemplate('purchase-template', 'contents', c);
};
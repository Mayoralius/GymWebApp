View.renderer.profile = {};
View.renderer.profile.render = function (c) {
    View.loadPartial('footer-partial');
    View.loadPartial('navbar-partial');
    View.loadPartial('jumbotron-partial');
    View.loadPartial('profile-partial');
    View.renderTemplate('profile-template', 'contents', c);
};

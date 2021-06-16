View.renderer.calendar = {};
View.renderer.calendar.render = function (c) {
    View.loadPartial('navbar-partial');
    View.loadPartial('footer-partial');
    View.renderTemplate('calendar-template', 'contents', c);
};
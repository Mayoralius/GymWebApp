Handlebars.registerHelper('formatDate', function (date) {
    return new Date(date).toDateString();
});


Controller.controllers.nav = {};

Controller.controllers.nav.signin_onclick = function (event) {
    event.preventDefault();
    Controller.router.go('/zzotech/views/signin')
};

Controller.controllers.nav.signup_onclick = function (event) {
    event.preventDefault();
    Controller.router.go('/zzotech/views/signup')
};

Controller.controllers.nav.signout_onclick = function (event) {
    event.preventDefault();
    window.sessionStorage.removeItem('token');
    Controller.router.go('/zzotech/views/index')
}

Controller.controllers.nav.profile_onclick = function (event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.nav.checkout_onclick = function (event) {
    event.preventDefault();
    /*Model.NotEmptyCart()
        .then(function () {*/
            Controller.router.go(event.target.href);
        /*})
        .catch(function (err) {
            console.log('Car is empty');
            Controller.router.go('/zzotech/views/index');
        })*/
};

Controller.controllers.nav.viewcart_onclick = function (event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};

Controller.controllers.nav.zzotech_onclick = function (event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
};
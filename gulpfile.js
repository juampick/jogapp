var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less([
        '../../../public/app/less/myless.less'
    ], 'public/app/css/mycss.css');

    mix.styles([
        // CSS Libs //
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/font-awesome.min.css',
        'angular-toastr/dist/angular-toastr.min.css',
        'angular-loading-bar/build/loading-bar.min.css',
        'angular-chart.js/dist/angular-chart.min.css',
        // My CSS compiled from Less //
        '../../app/css/mycss.css'
    ], 'public/app/css/dist/main.css', 'public/assets/bower');

    mix.scripts([
        // JS Libs //
        'assets/bower/angular/angular.min.js',
        'assets/bower/angular-ui-router/release/angular-ui-router.min.js',
        'assets/bower/angular-resource/angular-resource.min.js',
        'assets/bower/satellizer/satellizer.min.js',
        'assets/bower/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'assets/bower/angular-toastr/dist/angular-toastr.tpls.min.js',
        'assets/bower/angular-messages/angular-messages.min.js',
        'assets/bower/angular-loading-bar/build/loading-bar.min.js',
        'assets/bower/angular-animate/angular-animate.js',
        'assets/bower/moment/moment.js',
        'assets/bower/angular-moment/angular-moment.min.js',
        'assets/bower/angular-ui-mask/dist/mask.min.js',
        'assets/bower/Chart.js/Chart.min.js',
        'assets/bower/angular-chart.js/dist/angular-chart.min.js',
        // Angular App //
        'app/js/app.js',
        // Services //
        'app/js/services/timeEntry.js',
        'app/js/services/authentication.js',
        'app/js/services/report.js',
        'app/js/services/user.js',
        // Controllers //
        'app/js/controllers/homeController.js',
        'app/js/controllers/navbarController.js',
        'app/js/controllers/authController.js',
        'app/js/controllers/timeEntryListController.js',
        'app/js/controllers/timeEntryCreateController.js',
        'app/js/controllers/timeEntryEditController.js',
        'app/js/controllers/timeEntryReportController.js',
        'app/js/controllers/adminController.js',
        'app/js/controllers/adminCreateController.js',
        'app/js/controllers/profileController.js',
        'app/js/controllers/modalInstanceChangePwdController.js',
        // Directives //
        'app/js/directives/compareTo.js',
        'app/js/directives/ngReallyClick.js',
        // Filters //
        'app/js/filters/dateToISO.js',
        'app/js/filters/startFrom.js',
        'app/js/filters/dateFilter.js'
    ], 'public/app/js/dist/main.js', 'public')

});

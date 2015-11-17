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
    ], 'public/app/less/mycss.css');

    mix.styles([
        '../../../public/app/css/mycss.css'
    ], 'public/app/css/main.css');

    mix.scripts([
        // JS Libs //
        '../../../public/assets/bower/angular/angular.min.js',

        '../../../public/app/js/app.js',
        '../../../public/app/js/services/timeEntry.js'


    ], 'public/app/js/main.js')

//<script src="../assets/bower/angular/angular.min.js"></script>
//    <script src="../assets/bower/angular-ui-router/release/angular-ui-router.min.js"></script>
//    <script src="../assets/bower/angular-resource/angular-resource.min.js"></script>
//    <script src="../assets/bower/satellizer/satellizer.min.js"></script>
//    <script src="../assets/bower/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
//    <script src="../assets/bower/angular-toastr/dist/angular-toastr.tpls.min.js"></script>
//    <script src="../assets/bower/angular-messages/angular-messages.min.js"></script>
//    <script src="../assets/bower/angular-loading-bar/build/loading-bar.min.js"></script>
//    <script src="../assets/bower/angular-animate/angular-animate.js"></script>
//    <script src="../assets/bower/moment/moment.js"></script>
//    <script src="../assets/bower/angular-moment/angular-moment.min.js"></script>
//    <script src="../assets/bower/angular-ui-mask/dist/mask.min.js"></script>
//    <script src="../assets/bower/Chart.js/Chart.min.js"></script>
//    <script src="../assets/bower/angular-chart.js/dist/angular-chart.min.js"></script>
    //
    //    <!-- Angular App -->
    //<script src="../app/js/app.js"></script>
    //    <!-- Services -->
    //    <script src="../app/js/services/timeEntry.js"></script>
    //    <script src="../app/js/services/authentication.js"></script>
    //    <script src="../app/js/services/report.js"></script>
    //    <script src="../app/js/services/user.js"></script>
    //    <!--<script src="../app/js/services/redirectWhenLoggedOutInterceptor.js"></script>-->
    //    <!-- Controllers -->
    //    <script src="../app/js/controllers/homeController.js"></script>
    //    <script src="../app/js/controllers/navbarController.js"></script>
    //    <script src="../app/js/controllers/authController.js"></script>
    //    <script src="../app/js/controllers/timeEntryListController.js"></script>
    //    <script src="../app/js/controllers/timeEntryCreateController.js"></script>
    //    <script src="../app/js/controllers/timeEntryEditController.js"></script>
    //    <script src="../app/js/controllers/timeEntryReportController.js"></script>
    //    <script src="../app/js/controllers/adminController.js"></script>
    //    <script src="../app/js/controllers/adminCreateController.js"></script>
    //    <!-- Directives -->
    //    <script src="../app/js/directives/compareTo.js"></script>
    //    <script src="../app/js/directives/ngReallyClick.js"></script>
    //    <!-- Filters -->
    //    <script src="../app/js/filters/dateToISO.js"></script>
    //    <script src="../app/js/filters/startFrom.js"></script>
    //    <script src="../app/js/filters/dateFilter.js"></script>

});

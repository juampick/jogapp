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
        'public/app/less/myless.less',
    ]);

    //mix.styles([
    //    'public/app/css/mycss.css',
    //], 'public/app/css/main.css');

    mix.scripts([
        'public/app/js/app.js',
        'public/app/js/services/timeEntry.js'
    ], 'public/app/js/main.js')

});

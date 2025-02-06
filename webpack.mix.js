import mix from 'laravel-mix';

mix.js('./resources/js/app.jsx', 'public/js')
    .react()
    .sass('./resources/sass/app.scss', 'public/css')
    .version();

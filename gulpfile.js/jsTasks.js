/**
 * ============================================================================
 * FILE DI TASK JAVASCRIPT (jsTasks.js)
 * ============================================================================
 * Scopo: Gestire il bundling dei file JavaScript tramite Browserify, la 
 * conversione dei flussi in stream/buffer compatibili con Gulp, l'aggiunta 
 * opzionale di sourcemaps per il debug e la minificazione del codice per la 
 * produzione, oltre al monitoraggio in tempo reale dei file sorgente JS.
 * ============================================================================
 */

const gulp = require("gulp");
const paths = require("./paths");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");

/**
 * Esegue il bundling dei file JavaScript e salva il file risultante nella cartella di output.
 */
const bundleJs = function() {
    return browserifyBundle()
        .pipe(gulp.dest(paths.getJsOutputPath()));
};

/**
 * Configura ed esegue il processo di bundling con Browserify, gestendo sourcemaps e minificazione in base ai flag della CLI.
 */
const browserifyBundle = function() {
    // Legge gli argomenti da riga di comando per identificare i flag di produzione o debug
    const args = yargs(hideBin(process.argv)).argv;
    const prod = args.prod;
    const debug = args.debug;

    return browserify({
        entries: paths.getJsEntryPath(),
        debug: debug === true
    })
    .bundle()
    .pipe(source(paths.getJsOutputEntry()))
    .pipe(buffer())
    // Inizializza le sourcemaps se il flag di debug è attivo, leggendo la mappa pre-esistente di Browserify
    .pipe(gulpIf(debug, sourcemaps.init({ loadMaps: true })))
    
    // Se siamo in produzione, applica la minificazione del codice JavaScript
    .pipe(gulpIf(prod, uglify()))
    
    // Se il debug è attivo, scrive il file di mappa (.map) nella stessa cartella di output
    .pipe(gulpIf(debug, sourcemaps.write("./")));
}

/**
 * Monitora le modifiche sui file JavaScript sorgenti in modalità sviluppo, saltando l'esecuzione in produzione.
 */
const watchJs = function(cb) {
    const args = yargs(hideBin(process.argv)).argv; // Legge i parametri da riga di comando
    const prod = args.prod;                         // Estrae il flag di produzione

    // Se siamo in produzione, interrompe subito il watch senza avviarlo
    if (prod) {
        return cb();
    }

    // Altrimenti, avvia il monitoraggio sui file JS eseguendo il bundle a ogni modifica
    gulp.watch(paths.getJsSrcPath("**/*"), bundleJs);
    cb();
}

module.exports = {
    bundleJs: bundleJs,
    watchJs: watchJs
}
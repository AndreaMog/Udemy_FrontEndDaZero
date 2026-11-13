/**
 * ============================================================================
 * FILE DI TASK SERVER / LIVE PREVIEW (serveTasks.js)
 * ============================================================================
 * Scopo: Gestire l'avvio del server di sviluppo locale tramite BrowserSync, 
 * consentendo il live reload automatico delle pagine durante la modifica dei 
 * file all'interno della cartella di distribuzione (dist), con gestione dei 
 * flag di ambiente (produzione o debug).
 * ============================================================================
 */

const browserSync = require("browser-sync").create();
const paths = require('./paths');
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

/**
 * Inizializza e avvia il server locale di sviluppo con BrowserSync, saltando l'esecuzione se ci si trova in produzione pura.
 */
const serve = function (cb) {
    // Legge gli argomenti da riga di comando per identificare i flag di produzione o debug
    const args = yargs(hideBin(process.argv)).argv;
    const prod = args.prod;
    const debug = args.debug;

    // Se siamo in produzione e non in modalità debug, interrompe la funzione senza avviare il server
    if (prod && !debug) {
        return cb();
    }

    // Altrimenti (in sviluppo o debug), avvia BrowserSync puntando alla cartella di output (dist)
    browserSync.init({
        watch: true,
        server: {
            baseDir: paths.getDistFolder()
        }
    });
}

module.exports = {
    serve: serve
}
/**
 * ============================================================================
 * FILE DI TASK HTML (viewTasks.js)
 * ============================================================================
 * Scopo: Gestire la compilazione e l'iniezione automatica dei file CSS e 
 * JavaScript all'interno del file HTML principale (index.html) utilizzando 
 * gulp-inject, oltre a monitorare le modifiche dell'HTML durante lo sviluppo.
 * ============================================================================
 */

const gulp = require("gulp");
const inject = require("gulp-inject");
const paths = require("./paths");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

/**
 * Compila il file HTML iniettando automaticamente i riferimenti ai file CSS e 
 * JS compilati.
 */
const compileIndex = function (){
    // Prende il file JavaScript sorgente da iniettare
    const jsIndex = gulp.src(paths.getJsEntryPath());

    // Prende il file CSS sorgente da iniettare
    const cssIndex = gulp.src(paths.getCSSEntryPath());

    // Legge il file HTML sorgente, inietta prima il CSS e poi il JS (usando il 
    // nome 'custom') e salva il risultato in dist
    return gulp.src(paths.getHtmlEntryPath())
        .pipe(inject(cssIndex, { relative: true, name: "custom" }))
        .pipe(inject(jsIndex, { relative: true, name: "custom" }))
        .pipe(gulp.dest(paths.getDistFolder()));
}

/**
 * Monitora le modifiche al file HTML in modalità development, saltando l'esecuzione
 *  in produzione (--prod).
 */
const watchIndex = function(cb) {
    const args = yargs(hideBin(process.argv)).argv; // Analizza gli argomenti da riga di comando
    const prod = args.prod;                         // Estrae il flag di produzione

    // Se siamo in produzione, interrompe il watch senza avviarlo
    if (prod) {
        return cb();
    }

    // Avvia il monitoraggio sul file HTML eseguendo compileIndex a ogni modifica
    gulp.watch(paths.getHtmlEntryPath(), compileIndex);
    cb();
}

module.exports = {
    compileIndex: compileIndex,
    watchIndex: watchIndex
}
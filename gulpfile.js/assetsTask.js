/**
 * ============================================================================
 * FILE DI TASK CSS/ASSETS (assetsTask.js)
 * ============================================================================
 * Scopo: Gestire la compilazione, la concatenazione e la minificazione 
 * condizionale dei fogli di stile (CSS) in base all'ambiente di esecuzione 
 * (sviluppo o produzione), oltre a monitorare i cambiamenti dei file sorgente.
 * ============================================================================
 */

const gulp = require("gulp");
const gulpIf = require("gulp-if");
const concat = require("gulp-concat");
const paths = require("./paths");
const minifyCSS = require("gulp-minify-css");

/**
 * Preleva i file CSS sorgenti, li unisce in un unico file, li minifica se 
 * in produzione e li salva nella cartella di output.
 */
const processCSS = function() {
    // Verifica direttamente se tra gli argomenti della CLI è presente il flag --prod
    const prod = process.argv.includes('--prod');

    return gulp.src(paths.getCSSSrcPath("**/*"))
    .pipe(concat(paths.getOutputCSSFilename()))
    .pipe(gulpIf(prod, minifyCSS()))
    .pipe(gulp.dest(paths.getCSSOutputPath()));
}

/**
 * Monitora le modifiche sui file CSS sorgenti in modalità sviluppo, ignorando l'esecuzione in produzione.
 */
const watchCSS = function(cb){
    const prod = process.argv.includes('--prod'); // Controlla lo stato di produzione
    if(prod){                                     // Se siamo in produzione, interrompe subito la funzione
        return cb();
    }
    gulp.watch(paths.getCSSSrcPath("**/*"), processCSS); // Avvia il watch sui file CSS
    cb();
}

module.exports = {
    processCSS: processCSS,
    watchCSS: watchCSS
}
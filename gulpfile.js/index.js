/**
 * ============================================================================
 * FILE PRINCIPALE DI CONFIGURAZIONE GULP (gulpfile.js)
 * ============================================================================
 * Scopo: Orchestrare l'intero sistema di build e automazione del progetto.
 * Importa i vari moduli di task (viste, asset/CSS, JavaScript, live server) 
 * e definisce la sequenza di esecuzione (pulizia, compilazione, watch e avvio server).
 * ============================================================================
 */

const gulp = require("gulp");
const series = gulp.series;
const viewTasks = require("./viewTasks");
const jsTasks = require("./jsTasks");
const assetsTasks = require("./assetsTask");
const serveTasks = require("./serveTasks");
const fs = require("fs");
const paths = require("./paths");

/**
 * Pulisce la cartella di distribuzione (dist) rimuovendo file e sottocartelle precedenti in modo ricorsivo.
 */
const clean = function(cb) {
    // Cancella la cartella dist in modo sicuro e nativo
    fs.rmSync(paths.getDistFolder(), { recursive: true, force: true });
    cb();
}

/**
 * Sequenza principale di esecuzione: pulisce, compila HTML/CSS/JS, avvia i watcher e fa partire il server di sviluppo.
 */
const build = series(
    clean,                  // 1. Svuota la cartella di output
    viewTasks.compileIndex, // 2. Compila l'HTML iniettando i riferimenti
    assetsTasks.processCSS, // 3. Elabora e compila i file CSS
    assetsTasks.watchCSS,   // 4. Avvia il monitoraggio sui file CSS (se in dev)
    assetsTasks.processIcons,
    assetsTasks.watchIcons,
    jsTasks.bundleJs,       // 5. Esegue il bundling dei file JavaScript
    jsTasks.watchJs,        // 6. Avvia il monitoraggio sui file JS (se in dev)
    viewTasks.watchIndex,   // 7. Avvia il monitoraggio sul file HTML (se in dev)
    serveTasks.serve        // 8. Avvia il server locale di sviluppo (BrowserSync)
);

module.exports = {
    build: build
}
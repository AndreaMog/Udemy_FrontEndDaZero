/**
 * ============================================================================
 * FILE DI CONFIGURAZIONE GLOBALE DEI PERCORSI (Paths Manager)
 * ============================================================================
 * Scopo: Centralizzare la definizione di tutte le directory e dei file del 
 * progetto (sia sorgenti ./src che di distribuzione ./dist). 
 * Funziona come un'unica fonte di verità (Single Source of Truth), permettendo 
 * ai task di Gulp di recuperare i percorsi in modo dinamico e sicuro. Se la 
 * struttura delle cartelle del progetto dovesse cambiare, basterà aggiornare 
 * i path unicamente in questo file senza modificare i task di automazione.
 * ============================================================================
 */

const paths = {                                // Inizio dell'oggetto di configurazione globale dei percorsi
    global: {                                  // Sezione per le cartelle principali (sorgente e distribuzione)
        src: "./src",                          // Cartella dei codici sorgente
        dist: "./dist"                         // Cartella della build finale
    },
    html: {                                    // Sezione per i file HTML
        entry: "index.html",                   // Nome del file HTML principale
        dist: "index.html"                     // Nome del file HTML di output
    },
    js:{                                       // Sezione per i file JavaScript
        entry: "index.js",                     // Nome del file JavaScript principale
        base: "js",                            // Nome della cartella sorgente JS
        dist: "js"                             // Nome della cartella di output JS
    },
    css:{                                      // Sezione per i file CSS
        entry: "index.css",                    // Nome del file CSS principale
        base: "css",                           // Nome della cartella sorgente CSS
        dist: "css"                            // Nome della cartella di output CSS
    },
    icons:{
        base: "icons",
        dist: "icons"
    }
}

module.exports = {
    // Restituisce il percorso della cartella di distribuzione (dist)
    getDistFolder: function() {
        return paths.global.dist;
    },

    // Restituisce il percorso della cartella sorgente (src)
    getSrcFolder: function() {
        return paths.global.src;
    },

    // Restituisce il percorso completo del file HTML principale
    getHtmlEntryPath: function() {
        return paths.global.src + '/' + paths.html.entry;
    },

    // Restituisce il percorso completo del file JavaScript principale
    getJsEntryPath: function() {
        return paths.global.src + '/' + paths.js.base + '/' + paths.js.entry;
    },

    // Restituisce la cartella base dei sorgenti JS, unendola a un percorso interno opzionale
    getJsSrcPath: function(innerPath) {
        const baseJsPath = paths.global.src + '/' +  paths.js.base; // Costruisce la base del percorso JS
        if(innerPath) {                        // Se viene passato un sotto-percorso, lo concatena alla base
            return baseJsPath + innerPath;
        }
        return baseJsPath;                     // Altrimenti restituisce solo il percorso base
    },

    // Restituisce il percorso della cartella di output per i file JS
    getJsOutputPath: function() {
        return this.getDistFolder() + '/' + paths.js.dist;
    },

    // Restituisce il nome del file JavaScript di output
    getJsOutputEntry: function() {
        return paths.js.entry;
    },

    // Restituisce il percorso completo del file CSS principale
    getCSSEntryPath: function() {
        return paths.global.src + '/' + paths.css.base + '/' + paths.css.entry;
    },

    // Restituisce la cartella base dei sorgenti CSS, unendola a un percorso interno opzionale
    getCSSSrcPath: function(innerPath) {
        const baseCSSPath = paths.global.src + '/' +  paths.css.base; // Costruisce la base del percorso CSS
        if(innerPath) {                        // Se viene passato un sotto-percorso, lo concatena alla base
            return baseCSSPath + innerPath;
        }
        return baseCSSPath;                    // Altrimenti restituisce solo il percorso base
    },

    // Restituisce il nome del file CSS finale generato
    getOutputCSSFilename: function() {
        return paths.css.entry;
    },

    // Restituisce il percorso della cartella di output per i file CSS
    getCSSOutputPath: function() {
        return this.getDistFolder() + '/' + paths.css.dist;
    },
    getIconsSrcPath: function(innerPath) {
        const baseIconsPath = paths.global.src + '/' +  paths.icons.base; // Costruisce la base del percorso CSS
        if(innerPath) {                        // Se viene passato un sotto-percorso, lo concatena alla base
            return baseIconsPath + innerPath;
        }
        return baseIconsPath;                    // Altrimenti restituisce solo il percorso base
    },
}
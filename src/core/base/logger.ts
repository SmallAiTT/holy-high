module hh {
    export var log = console.log.bind(console);
    export var info = console.info.bind(console);
    export var debug = console.debug.bind(console);
    export var warn = console.warn.bind(console);
    export var error = console.error.bind(console);
}
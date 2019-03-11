const argv = require("yargs").argv;

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV && ENV.startsWith("build");

module.exports = function () {
    const app = argv.app || "src";
    const environment = argv.environment || "dev";

    const distFolder = "dist";

    const tmp = "tmp/";
    const svg = {
        sourceFolder: `${app}/scss/assets/icons/`,
        spriteFolder: `${distFolder}/content/styles/images/`,
        scssMapFolder: `${app}/scss/base/`,
        scssTemplateFolder: `${app}/scss/base/`,
        pngFallback: false
    };
    const config = {
        tmp,
        root: "./",
        src: "src",
        dist: distFolder,
        packages: [
            "./package.json"
        ],
        custom: {
            foldersToLint: ["src"]
        },
        path: {
            HTML: "/index.html",
            ENTRY: '/scripts/main.js',
            ALL: [
                `${app}/scripts/**/*.js`,
                `${app}/components/**/*.js`
            ],
            MINIFIED_OUT: "build.min.js",
            SRC: "scripts",
            DEST_SRC: "scripts",
            DEST_BUILD: "scripts",
            DEST: `${distFolder}/content/scripts/`,
            FAVICONS_SRC: `${app}/content/favicons/*`,
            FAVICONS_DIST: `${distFolder}/content/favicons/`
        },
        environmentConfig: {
            source: `config/${environment}.js`
        },
        svg: {
            sourceFolder: svg.sourceFolder,
            spriteFolder: svg.spriteFolder,
            scssMapFolder: svg.scssMapFolder,
            pngFallback: svg.pngFallback
        },
        html: {
            src: [
                `./${app}/**/*.html`
            ],
            dest: 'public'
        },
        scss: {
            src: [
                `./${app}/scss/**/*.scss`,
                `./${app}/components/**/*.scss`,
                `!./${app}/scss/**/*_scsslint_tmp*.scss` //ignores temporary scss-lint files
            ],
            lint: [
                `./${app}/scss/**/*.scss`,
                `!./${app}/scss/base/_svg-sprite-map.scss`,
                `!./${app}/scss/base/_svg-sprite.scss`,
                `!./${app}/scss/**/*_scsslint_tmp*.scss`,
                `!./${app}/scss/vendor/**/*.scss`,
                `!./${app}/scss/base/_svg-sprite-map.scss`
            ],
            cssFolder: `${distFolder}/content/styles/`
        },
        optimize: {
            css: {},
            js: {},
            images: {
                src: `${app}/content/images/**/*.{png,gif,jpg,svg}`,
                dest: `${distFolder}/images/`,
                options: {                       // Target options
                    optimizationLevel: 7,
                    svgoPlugins: [{removeViewBox: false}],
                    progessive: true,
                    interlaced: true
                }
            }
        }
    };

    return config;
};

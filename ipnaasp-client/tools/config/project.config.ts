import { join } from 'path';

import { SeedConfig } from './seed.config';

const proxy = require('proxy-middleware');
/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.PLUGIN_CONFIGS['browser-sync'] = {
      middleware: [require('connect-history-api-fallback')({ index: `${this.APP_BASE}index.html` })],
      port: this.PORT,
      startPath: this.APP_BASE,
      // open: argv['b'] ? false : true,
      injectChanges: false,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        routes: {
          [`${this.APP_BASE}${this.APP_SRC}`]: this.APP_SRC,
          [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${this.APP_BASE}node_modules`]: 'node_modules',
          [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    }

    // this.APP_TITLE = 'Put name of your app here';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      {src: 'font-awesome/css/font-awesome.css', inject: true, vendor: false},
      {src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true, vendor: false},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true, vendor: false}
      // {src: 'underscore/underscore.js', inject: 'libs'}
      // {src: 'angular2-jwt/angular2-jwt.js', inject: 'libs'}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
    this.PLUGIN_CONFIGS['browser-sync'] = {
      middleware: [
        proxy({
          protocol: 'http:',
          hostname: 'localhost',
          port: 8080,
          pathname: '/api',
          route: '/api'
        }),
        require('connect-history-api-fallback')({index: `${this.APP_BASE}index.html`})
      ],
      port: this.PORT,
      startPath: this.APP_BASE,
      // open: argv['b'] ? false : true,
      injectChanges: false,
      server: {
        baseDir: `${this.DIST_DIR}/empty/`,
        routes: {
          [`${this.APP_BASE}${this.APP_SRC}`]: this.APP_SRC,
          [`${this.APP_BASE}${this.APP_DEST}`]: this.APP_DEST,
          [`${this.APP_BASE}node_modules`]: 'node_modules',
          [`${this.APP_BASE.replace(/\/$/, '')}`]: this.APP_DEST
        }
      }
    }

    this.SYSTEM_CONFIG_DEV.paths['angular2-jwt'] =
      `${this.APP_BASE}node_modules/angular2-jwt/angular2-jwt`;

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-jwt'] = {
      main: 'angular2-jwt.js',
      defaultExtension : 'js'
    }
    this.SYSTEM_CONFIG_DEV.paths['underscore'] =
      `${this.APP_BASE}node_modules/underscore/underscore`;

    this.SYSTEM_BUILDER_CONFIG.packages['underscore'] = {
      main: 'underscore.js',
      defaultExtension : 'js'
    }
  }
}

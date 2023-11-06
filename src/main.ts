import * as PIXI from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

import {GameApplication} from './app/game-application';
import * as packageJson from '../package.json';

import './assets/fonts/lato-light/style.css';
import './assets/fonts/lato/style.css';

declare global {
  interface Window {
    PIXI: any;
  }
}

document.title = packageJson.name;

var font = new FontFaceObserver('jackeyfont')
font.load()
  .then(() => {
    window.PIXI = PIXI;

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

    PixiPlugin.registerPIXI(PIXI);
    gsap.registerPlugin(PixiPlugin);

    const app = new GameApplication({
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    // @ts-ignore
    document.body.appendChild(app.view);

    window.onresize = () => {
      // app.renderer.resize(window.innerWidth, window.innerHeight);
      // app.resizeView();
    };

    globalThis.__PIXI_APP__ = app;
  });

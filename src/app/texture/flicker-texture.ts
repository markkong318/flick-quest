import * as PIXI from 'pixi.js';
import Bottle from '../../framework/bottle';
import bottle from '../../framework/bottle';
import {Texture} from '../../framework/texture';

export class FlickerTexture extends Texture {
  private renderer: PIXI.Renderer = bottle.inject(PIXI.Renderer);

  constructor() {
    super();
  }

  init() {
    console.log('init...')
    debugger
    // console.log(this)
    console.log(this.renderer);
  }

  get bbb() {
    console.log('called bbbb');
    const g = new PIXI.Graphics();
    g.beginFill(0xff0000);
    g.drawRoundedRect(1, 1, 100, 100, 5);
    g.endFill();

    console.log(this.renderer);
    debugger

    const texture = this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
    return texture
  }
}

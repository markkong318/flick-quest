import * as PIXI from 'pixi.js';
import Bottle from '../../framework/bottle';
import bottle from '../../framework/bottle';
import {Texture} from '../../framework/texture';

export class FlickerTexture extends Texture {
  private renderer: PIXI.Renderer = bottle.inject(PIXI.Renderer);

  constructor() {
    super();
  }

  get roundRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRoundedRect(0, 0, 90, 70, 10);
    g.endFill();

    return this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
  }

  get rect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRect(0, 0, 94, 54);
    g.endFill();

    return this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
  }

  get leftRoundRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRect(10, 0, 84, 54);

    g.beginFill(0xffffff);
    g.drawRoundedRect(0, 0, 94, 54, 10);

    g.endFill();

    return this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
  }

  get rightRoundRect() {
    return
  }

  get upRoundRect() {
    return
  }

  get downRoundRect() {
    return
  }
}

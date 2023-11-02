import * as PIXI from 'pixi.js';
import Bottle from '../../framework/bottle';
import bottle from '../../framework/bottle';
import {Texture} from '../../framework/texture';

export class BattleTexture extends Texture {
  private renderer: PIXI.Renderer = bottle.inject(PIXI.Renderer);

  constructor() {
    super();
  }

  get messageRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.lineStyle({width: 4, color: 0xffffff})
    g.drawRoundedRect(0, 0, 450, 50, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get dummyEnemy() {
    const g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.lineStyle({width: 4, color: 0xffffff})
    g.drawRoundedRect(0, 0, 32, 32, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get timeRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0xffffff);
    g.drawRect(0, 0, 10, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }

  get stateRect() {
    const g = new PIXI.Graphics();
    g.beginFill(0x000000);
    g.lineStyle({width: 4, color: 0xffffff})
    g.drawRoundedRect(0, 0, 450, 75, 10);
    g.endFill();

    return this.renderer.generateTexture(g, {scaleMode: PIXI.SCALE_MODES.LINEAR, resolution: 2});
  }
}

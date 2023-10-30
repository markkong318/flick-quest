import * as PIXI from 'pixi.js';
import Bottle from '../../framework/bottle';
import bottle from '../../framework/bottle';
import {Texture} from '../../framework/texture';

export class BattleTexture extends Texture {
  private renderer: PIXI.Renderer = bottle.inject(PIXI.Renderer);

  constructor() {
    super();
  }

  get messageRoundRect() {
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

  // get roundRect() {
  //   const g = new PIXI.Graphics();
  //   g.beginFill(0xffffff);
  //   g.drawRoundedRect(0, 0, 90, 70, 10);
  //   g.endFill();
  //
  //   return this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
  // }
  //
  // get rect() {
  //   const g = new PIXI.Graphics();
  //   g.beginFill(0xffffff);
  //   g.drawRect(0, 0, 94, 54);
  //   g.endFill();
  //
  //   return this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
  // }
  //
  // get leftRoundRect() {
  //   const g = new PIXI.Graphics();
  //   g.beginFill(0xffffff);
  //   g.drawRect(10, 0, 84, 54);
  //
  //   g.beginFill(0xffffff);
  //   g.drawRoundedRect(0, 0, 94, 54, 10);
  //
  //   g.endFill();
  //
  //   return this.renderer.generateTexture(g, PIXI.SCALE_MODES.LINEAR, 2);
  // }
}

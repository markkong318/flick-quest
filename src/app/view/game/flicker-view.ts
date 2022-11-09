import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {FlickerTexture} from '../../texture/flicker-texture';
import bottle from '../../../framework/bottle';

export class FlickerView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private btns: PIXI.Sprite[][];

  constructor() {
    super();
  }

  public draw() {
    console.log('draw')
    // this.initBackground();

    bottle.singleton(FlickerTexture);

    this.btns = [];
    for (let i = 0; i < 5; i++) {
      this.btns[i] = [];
      for (let j = 0; j < 4; j++) {
        this.btns[i][j] = new PIXI.Sprite(this.flickerTexture.bbb);
        this.btns[i][j].x = 96 * i;
        this.btns[i][j].y = 55 * j;
        this.addChild(this.btns[i][j]);
      }
    }
  }
}

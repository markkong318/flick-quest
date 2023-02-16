import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {FlickerTexture} from '../../texture/flicker-texture';
import bottle from '../../../framework/bottle';
import {ButtonView} from './flicker/button-view';

export class FlickerView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private buttons: PIXI.Sprite[][];

  constructor() {
    super();
  }

  public draw() {
    bottle.singleton(FlickerTexture);

    // this.buttons = [];
    // for (let i = 0; i < 5; i++) {
    //   this.buttons[i] = [];
    //   for (let j = 0; j < 4; j++) {
    //     this.buttons[i][j] = new PIXI.Sprite(this.flickerTexture.bbb);
    //     this.buttons[i][j].x = 96 * i;
    //     this.buttons[i][j].y = 55 * j;
    //     this.addChild(this.buttons[i][j]);
    //   }
    // }

    for (let i = 0; i < 1/*5*/; i++) {
      for (let j = 0; j < 1/*4*/; j++) {
        const bv = new ButtonView();
        bv.postInit();
        bv.x = 96  * 3;
        bv.y = 55 * j;

        if (i === 0 || i === 4) {
          bv.renderClickable(false);
        } else {
          bv.renderClickable(true);
        }

        bv.renderChar('い')
        bv.renderPressDown();
        this.addChild(bv);
      }
    }

  }
}

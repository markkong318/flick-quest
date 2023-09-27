import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {FlickerTexture} from '../../texture/flicker-texture';
import bottle from '../../../framework/bottle';
import {ButtonView} from './flicker/button-view';
import {GridLayout} from "./flicker/grid-layout";
import {TouchSprite} from "./flicker/touch-sprite";

export class FlickerView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private buttons: PIXI.Sprite[][];

  private clickSprite: PIXI.Sprite;

  constructor() {
    super();
  }

  public wwwww() {
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

    // for (let i = 0; i < 1/*5*/; i++) {
    //   for (let j = 0; j < 1/*4*/; j++) {
    //     const bv = new ButtonView();
    //     bv.postInit();
    //     bv.x = 96  * 3;
    //     bv.y = 55 * j;
    //
    //     // if (i === 0 || i === 4) {
    //     //   bv.renderClickable(false);
    //     // } else {
    //     //   bv.renderClickable(true);
    //     // }
    //
    //     bv.renderChar('い')
    //     // bv.renderPressDown();
    //     this.addChild(bv);
    //   }
    // }


    const layout = new GridLayout(this, 4, 4, 5);

    const bv1 = new ButtonView();
    bv1.postInit();

    const bv2 = new ButtonView();
    bv2.postInit();

    const bv3 = new ButtonView();
    bv3.postInit();

    const bv4 = new ButtonView();
    bv4.postInit();

    const bv5 = new ButtonView();
    bv5.postInit();

    layout.put(bv1, 0, 0);
    layout.put(bv2, 1, 0);
    layout.put(bv3, 2, 0);
    layout.put(bv4, 3, 0);
    layout.put(bv5, 0, 1);

    bv2.initSubView();

    let touch = new TouchSprite();
    touch.width = this.width;
    touch.height = this.height;
    touch.interactive = true;

    touch.register(bv1);
    touch.register(bv2);
    touch.register(bv3);
    touch.register(bv4);
    touch.register(bv5);

    this.addChild(touch);

  }
}

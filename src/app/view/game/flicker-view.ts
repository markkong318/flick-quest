import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {FlickerTexture} from '../../texture/flicker-texture';
import bottle from '../../../framework/bottle';

export class FlickerView extends View {
  constructor() {
    super();
  }

  public init() {
    this.initBackground();

    const texture = new FlickerTexture();
    texture.init();

    const bbbSprite = new PIXI.Sprite(texture.bbb);
    bbbSprite.x = 0;
    bbbSprite.y = 0;
    bbbSprite.width=100;
    bbbSprite.height = 100;
    this.addChild(bbbSprite);
  }
}

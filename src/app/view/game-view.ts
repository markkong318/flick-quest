import * as PIXI from 'pixi.js';

import {View} from '../../framework/view';
import {Size} from '../../framework/size';
import {FlickerView} from './game/flicker-view';
import bottle from '../../framework/bottle';
import {Background} from '../../framework/background';
import {TouchSprite} from "./game/flicker/touch-sprite";

export class GameView extends View {
  private flickerView: FlickerView;
  private touchSprite: TouchSprite;

  constructor() {
    super();
  }

  public init() {
    this.background = new Background(PIXI.Texture.WHITE, 0xf9f1e1);

    const touchSprite = new TouchSprite();
    touchSprite.width = this.width;
    touchSprite.height = this.height;
    touchSprite.interactive = true;
    this.addChild(touchSprite);

    this.flickerView = bottle.singleton(FlickerView);
    this.flickerView.size = new Size(this.size.width, 300);
    this.flickerView.background = new Background(PIXI.Texture.WHITE, 0xd2d5da);
    this.flickerView.y = this.size.height - 500;
    this.flickerView.setTouchSprite(touchSprite)
    this.flickerView.wwwww();
    this.addChild(this.flickerView);

    touchSprite.setBaseView(this.flickerView);
  }
}

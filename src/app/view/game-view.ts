import * as PIXI from 'pixi.js';

import {View} from '../../framework/view';
import {Size} from '../../framework/size';
import {FlickerView} from './game/flicker-view';
import bottle from '../../framework/bottle';
import {Background} from '../../framework/background';

export class GameView extends View {
  private flickerView: FlickerView;

  constructor() {
    super();
  }

  public init() {
    this.background = new Background(PIXI.Texture.WHITE, 0xf9f1e1);
    // this.initBackground();

    this.flickerView = bottle.singleton(FlickerView);
    this.flickerView.size = new Size(this.size.width, 300);
    this.flickerView.background = new Background(PIXI.Texture.WHITE, 0xffffff);
    this.flickerView.y = this.size.height - 500;
    this.flickerView.draw();
    this.addChild(this.flickerView);
  }
}

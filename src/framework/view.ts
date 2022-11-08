import * as PIXI from 'pixi.js';

import {Size} from "./size";
import bottle from './bottle';
import {Background} from './background';

export class View extends PIXI.Container {
  private backgroundSprite: PIXI.Sprite;

  public background: Background;
  public size: Size;

  constructor() {
    super();

    this.background = new Background();
  }

  init() {}

  initBackground() {
    if (!this.size) { return; }

    this.backgroundSprite = new PIXI.Sprite(this.background.texture);
    this.backgroundSprite.width = this.size.width;
    this.backgroundSprite.height = this.size.height;
    this.backgroundSprite.tint = this.background.tint;
    this.addChild(this.backgroundSprite);
  }
}

import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import {FlickerTexture} from '../../../texture/flicker-texture';
import bottle from '../../../../framework/bottle';

export class FloatView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private roundRectSprite: PIXI.Sprite;
  private charText: PIXI.Text;

  private char: string

  constructor(char: string) {
    super();
    this.char = char;
  }

  initBottle() {
    this.roundRectSprite = new PIXI.Sprite(this.flickerTexture.roundRectShadow);
    this.roundRectSprite.x = 0;
    this.roundRectSprite.y = 0;
    this.roundRectSprite.tint = 0xffffff;
    this.addChild(this.roundRectSprite);

    this.charText = new PIXI.Text(this.char);
    this.charText.anchor.x = 0.5;
    this.charText.anchor.y = 0.5;
    this.charText.x = this.width / 2;
    this.charText.y = this.height / 2;
    this.charText.style.fontSize = '24px';
    this.addChild(this.charText);
  }

  getChar(): string {
    return this.char;
  }

  renderClickable(flg: boolean) {
    this.roundRectSprite.tint = flg ? 0xffffff : 0xb5b8bf;
  }

  renderBoardPointerDown() {
    this.roundRectSprite.tint = 0xb2b4b7;
  }

  renderBoardPointerUp() {
    this.roundRectSprite.tint = 0xffffff;
  }
}

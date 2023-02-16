import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import {FlickerTexture} from '../../../texture/flicker-texture';
import bottle from '../../../../framework/bottle';

export class ButtonView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private borderSprite: PIXI.Sprite;
  private roundRectSprite: PIXI.Sprite;
  private rectSprite: PIXI.Sprite;
  private charText: PIXI.Text;

  constructor() {
    super();
  }

  postInit() {
    this.borderSprite = new PIXI.Sprite(this.flickerTexture.roundRect);
    this.borderSprite.x = 2;
    this.borderSprite.y = 4;
    this.borderSprite.tint = 0xb2b4b7;
    this.addChild(this.borderSprite);

    this.rectSprite = new PIXI.Sprite(this.flickerTexture.rect);
    this.rectSprite.x = 0;
    this.rectSprite.y = 0;
    this.rectSprite.tint = 0x3d7aee;
    this.addChild(this.rectSprite);

    this.roundRectSprite = new PIXI.Sprite(this.flickerTexture.roundRect);
    this.roundRectSprite.x = 2;
    this.roundRectSprite.y = 2;
    this.roundRectSprite.tint = 0xffffff;
    this.addChild(this.roundRectSprite);

    this.charText = new PIXI.Text('あ');
    this.charText.anchor.x = 0.5;
    this.charText.anchor.y = 0.5;
    this.charText.x = this.width / 2;
    this.charText.y = this.height / 2;
    this.charText.style.fontSize = '24px';
    this.addChild(this.charText);
  }

  renderClickable(flg: boolean) {
    this.roundRectSprite.tint = flg ? 0xffffff : 0xb5b8bf;
  }

  renderChar(char: string) {
    this.charText.text = char;
  }

  renderPressDown() {
    this.rectSprite.visible = true;
    this.roundRectSprite.visible = false;
    this.charText.style.fill = 0x000000;

    this.rectSprite.texture = this.flickerTexture.leftRoundRect;
    this.rectSprite.tint = 0xffffff
  }
}

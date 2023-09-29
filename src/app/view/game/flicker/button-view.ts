import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import {FlickerTexture} from '../../../texture/flicker-texture';
import bottle from '../../../../framework/bottle';
import {FloatView} from "./float-view";

export class ButtonView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private borderSprite: PIXI.Sprite;
  private roundRectSprite: PIXI.Sprite;
  private rectSprite: PIXI.Sprite;
  private charText: PIXI.Text;

  private floatViews: FloatView[] = [];

  private char: string = "あ"
  private chars: string[] = ["い", "う", "え", "お"]; // left up right down

  private isHit: boolean;

  constructor() {
    super();
  }

  postInit() {
    // this.borderSprite = new PIXI.Sprite(this.flickerTexture.roundRect);
    // this.borderSprite.x = 2;
    // this.borderSprite.y = 4;
    // this.borderSprite.tint = 0xb2b4b7;
    // this.addChild(this.borderSprite);

    // this.rectSprite = new PIXI.Sprite(this.flickerTexture.rect);
    // this.rectSprite.x = 0;
    // this.rectSprite.y = 0;
    // this.rectSprite.tint = 0x3d7aee;
    // this.addChild(this.rectSprite);

    this.roundRectSprite = new PIXI.Sprite(this.flickerTexture.roundRect);
    this.roundRectSprite.x = 0;
    this.roundRectSprite.y = 0;
    this.roundRectSprite.tint = 0xffffff;
    this.addChild(this.roundRectSprite);

    this.charText = new PIXI.Text('あ');
    this.charText.anchor.x = 0.5;
    this.charText.anchor.y = 0.5;
    this.charText.x = this.width / 2;
    this.charText.y = this.height / 2;
    this.charText.style.fontSize = '24px';
    this.addChild(this.charText);


    for (let i = 0; i < 4; i++) {
      const char = i + '';
      this.chars.push(char);
    }


    // const subButtonViews: FloatView = [];

    // @ts-ignore
    this.on('boardpointerdown', (event) => {
      console.log('boardpointerdown ' + this.charText.text);
      this.renderBoardPointerDown();

      this.isHit = true;
    });

    // @ts-ignore
    this.on('boardpointermove', (event) => {
      console.log('boardpointermove');

      // @ts-ignore
      const { isHit, area } = event;

      for (let i = 0; i < this.floatViews.length; i++) {
        this.floatViews[i]?.renderBoardPointerUp();
      }

      if (isHit) {
        // TODO
        console.log('boardpointermove move in')
        this.renderBoardPointerDown();
      } else {
        console.log('boardpointermove move out')

        console.log("area: " + area)

        this.renderBoardPointerUp();

        switch (area) {
          case 2:
            this.floatViews[1]?.renderBoardPointerDown();
            break;
          case 4:
            this.floatViews[0]?.renderBoardPointerDown();
            break;
          case 6:
            this.floatViews[2]?.renderBoardPointerDown();
            break;
          case 8:
            this.floatViews[3]?.renderBoardPointerDown();
            break;
        }
      }

      this.isHit = isHit;
    });

    // @ts-ignore
    this.on('boardpointerup', (event) => {
      console.log('boardpointerup');
      this.renderBoardPointerUp();

      for (let i = 0; i < this.floatViews.length; i++) {
        this.floatViews[i]?.renderBoardPointerUp();
      }

      // @ts-ignore
      const { isHit, area } = event;

      if (isHit) {
        // send msg about the text
        console.log('send key:' + this.char);
      } else {
        // send msg about the text
        console.log("113area: " + area)
        switch (area) {
          case 2:
            console.log('send key:' + this.chars[1]);
            break;
          case 4:
            console.log('send key:' + this.chars[0]);
            break;
          case 6:
            console.log('send key:' + this.chars[2]);
            break;
          case 8:
            console.log('send key:' + this.chars[3]);
            break;
        }
      }
    });

    // @ts-ignore
    this.on('boardpointerclick', (event) => {
      console.log('boardpointerclick');

    });
  }

  initSubView() {
    let floatView;

    // left
    floatView = new FloatView();
    floatView.postInit();
    floatView.width = this.width;
    floatView.height = this.height;
    floatView.x = this.x - floatView.width;
    floatView.y = this.y;
    floatView.renderChar(this.chars[0]);
    this.parent.addChild(floatView);
    this.floatViews.push(floatView);

    // up
    floatView = new FloatView();
    floatView.postInit();
    floatView.width = this.width;
    floatView.height = this.height;
    floatView.x = this.x;
    floatView.y = this.y - floatView.height;
    floatView.renderChar(this.chars[1]);
    this.parent.addChild(floatView);
    this.floatViews.push(floatView);

    // right
    floatView = new FloatView();
    floatView.postInit();
    floatView.width = this.width;
    floatView.height = this.height;
    floatView.x = this.x + floatView.width;
    floatView.y = this.y;
    floatView.renderChar(this.chars[2]);
    this.parent.addChild(floatView);
    this.floatViews.push(floatView);

    // down
    floatView = new FloatView();
    floatView.postInit();
    floatView.width = this.width;
    floatView.height = this.height;
    floatView.x = this.x;
    floatView.y = this.y + floatView.height;
    floatView.renderChar(this.chars[3]);
    this.parent.addChild(floatView);
    this.floatViews.push(floatView);
  }

  renderClickable(flg: boolean) {
    this.roundRectSprite.tint = flg ? 0xffffff : 0xb5b8bf;
  }

  renderChar(char: string) {
    this.char = char;
    this.charText.text = char;
  }

  renderBoardPointerDown() {
    // this.rectSprite.visible = true;
    // this.roundRectSprite.visible = false;
    // this.charText.style.fill = 0x000000;

    // this.rectSprite.texture = this.flickerTexture.leftRoundRect;
    // this.rectSprite.tint = 0xffffff

    this.roundRectSprite.tint = 0xb2b4b7;
  }

  renderBoardPointerUp() {
    this.roundRectSprite.tint = 0xffffff;
  }
}

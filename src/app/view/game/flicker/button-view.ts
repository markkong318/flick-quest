import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import {FlickerTexture} from '../../../texture/flicker-texture';
import bottle from '../../../../framework/bottle';
import {FloatView} from './float-view';
import rocket from '../../../../framework/rocket';
import {EVENT_SEND_KEY} from '../../../env/event';

export class ButtonView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);

  private borderSprite: PIXI.Sprite;
  private roundRectSprite: PIXI.Sprite;
  private rectSprite: PIXI.Sprite;
  private charText: PIXI.Text;

  private floatViews: FloatView[] = [];

  private char: string = "";

  public static FLOAT_VIEW_LEFT: number = 0;
  public static FLOAT_VIEW_UP: number = 1;
  public static FLOAT_VIEW_RIGHT: number = 2;
  public static FLOAT_VIEW_DOWN: number = 3;

  private isHit: boolean;

  constructor(char: string) {
    super();

    this.char = char;
  }

  initBottle() {
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

    this.charText = new PIXI.Text(this.char);
    this.charText.anchor.x = 0.5;
    this.charText.anchor.y = 0.5;
    this.charText.x = this.width / 2;
    this.charText.y = this.height / 2;
    this.charText.style.fontSize = '24px';
    this.addChild(this.charText);

    // @ts-ignore
    this.on('boardpointerdown', (event) => {
      console.log('boardpointerdown ' + this.charText.text);
      this.renderBoardPointerDown();
      this.isHit = true;

      this.showFloatViews();
    });

    // @ts-ignore
    this.on('boardpointermove', (event) => {
      console.log('boardpointermove');

      // @ts-ignore
      const {isHit, area} = event;

      for (let i = 0; i < this.floatViews.length; i++) {
        this.floatViews[i]?.renderBoardPointerUp();
      }

      if (isHit) {
        console.log('boardpointermove move in')
        this.renderBoardPointerDown();
      } else {
        console.log('boardpointermove move out')

        this.renderBoardPointerUp();

        switch (area) {
          case 2:
            this.floatViews[ButtonView.FLOAT_VIEW_UP]?.renderBoardPointerDown();
            break;
          case 4:
            this.floatViews[ButtonView.FLOAT_VIEW_LEFT]?.renderBoardPointerDown();
            break;
          case 6:
            this.floatViews[ButtonView.FLOAT_VIEW_RIGHT]?.renderBoardPointerDown();
            break;
          case 8:
            this.floatViews[ButtonView.FLOAT_VIEW_DOWN]?.renderBoardPointerDown();
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
      const {isHit, area} = event;

      if (isHit) {
        console.log('send key:' + this.char);
        rocket.emit(EVENT_SEND_KEY, this.char);
      } else {
        switch (area) {
          case 2:
            console.log('send key:' + this.floatViews[ButtonView.FLOAT_VIEW_UP]?.getChar());
            rocket.emit(EVENT_SEND_KEY, this.floatViews[ButtonView.FLOAT_VIEW_UP]?.getChar());
            break;
          case 4:
            console.log('send key:' + this.floatViews[ButtonView.FLOAT_VIEW_LEFT]?.getChar());
            rocket.emit(EVENT_SEND_KEY, this.floatViews[ButtonView.FLOAT_VIEW_LEFT]?.getChar());
            break;
          case 6:
            console.log('send key:' + this.floatViews[ButtonView.FLOAT_VIEW_RIGHT]?.getChar());
            rocket.emit(EVENT_SEND_KEY, this.floatViews[ButtonView.FLOAT_VIEW_RIGHT]?.getChar());
            break;
          case 8:
            console.log('send key:' + this.floatViews[ButtonView.FLOAT_VIEW_DOWN]?.getChar());
            rocket.emit(EVENT_SEND_KEY, this.floatViews[ButtonView.FLOAT_VIEW_DOWN]?.getChar());
            break;
        }
      }

      this.hideFloatViews();
    });

    // @ts-ignore
    this.on('boardpointerclick', (event) => {
      console.log('boardpointerclick');
    });
  }

  setFloatViews(floatViews: FloatView[]) {
    this.floatViews = [];

    for (let i = 0; i < floatViews.length; i++) {
      const floatView = floatViews[i];

      this.floatViews.push(floatView);

      if (!floatView) {
        continue;
      }

      this.parent.addChild(floatView);

      switch (i) {
        case ButtonView.FLOAT_VIEW_LEFT:
          floatView.width = this.width;
          floatView.height = this.height;
          floatView.x = this.x - floatView.width;
          floatView.y = this.y;
          break;

        case ButtonView.FLOAT_VIEW_UP:
          floatView.width = this.width;
          floatView.height = this.height;
          floatView.x = this.x;
          floatView.y = this.y - floatView.height;
          break;

        case ButtonView.FLOAT_VIEW_RIGHT:
          floatView.width = this.width;
          floatView.height = this.height;
          floatView.x = this.x + floatView.width;
          floatView.y = this.y;
          break;

        case ButtonView.FLOAT_VIEW_DOWN:
          floatView.width = this.width;
          floatView.height = this.height;
          floatView.x = this.x;
          floatView.y = this.y + floatView.height;
          break;
      }

      floatView.visible = false;
    }
  }

  hideFloatViews() {
    for (let i = 0; i < this.floatViews.length; i++) {
      const floatView = this.floatViews[i];

      if (!floatView) {
        continue;
      }

      floatView.visible = false;
    }
  }

  showFloatViews() {
    for (let i = 0; i < this.floatViews.length; i++) {
      const floatView = this.floatViews[i];

      if (!floatView) {
        continue;
      }

      floatView.visible = true;
    }
  }

  renderClickable(flg: boolean) {
    this.roundRectSprite.tint = flg ? 0xffffff : 0xb5b8bf;
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

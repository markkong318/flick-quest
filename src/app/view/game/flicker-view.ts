import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {FlickerTexture} from '../../texture/flicker-texture';
import bottle from '../../../framework/bottle';
import {ButtonView} from './flicker/button-view';
import {GridLayout} from "./flicker/grid-layout";
import {TouchSprite} from "./touch-sprite";
import {FloatView} from "./flicker/float-view";

export class FlickerView extends View {
  private flickerTexture: FlickerTexture = bottle.inject(FlickerTexture);
  private touchSprite: TouchSprite = bottle.inject(TouchSprite);

  private buttons: PIXI.Sprite[][];

  constructor() {
    super();
  }

  public initUI() {
    bottle.singleton(FlickerTexture);

    const layout = new GridLayout(this, 5, 4, 3);

    const buttonView1 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_1', args: ['']});
    const buttonView2 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_2', args: ['あ']});
    const buttonView3 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_3', args: ['か']});
    const buttonView4 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_4', args: ['さ']});
    const buttonView5 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_5', args: ['']});

    const buttonView6 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_6', args: ['']});
    const buttonView7 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_7', args: ['た']});
    const buttonView8 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_8', args: ['な']});
    const buttonView9 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_9', args: ['は']});
    const buttonView10 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_10', args: ['']});

    const buttonView11 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_11', args: ['']});
    const buttonView12 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_12', args: ['ま']});
    const buttonView13 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_13', args: ['や']});
    const buttonView14 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_14', args: ['ら']});
    const buttonView15 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_15', args: ['']});

    const buttonView16 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_16', args: ['']});
    const buttonView17 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_17', args: ['']});
    const buttonView18 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_18', args: ['わ']});
    const buttonView19 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_19', args: ['']});
    const buttonView20 = bottle.singleton(ButtonView, {key: 'BUTTON_VIEW_20', args: ['']});

    layout.put(buttonView1, 0, 0);
    layout.put(buttonView2, 1, 0);
    layout.put(buttonView3, 2, 0);
    layout.put(buttonView4, 3, 0);
    layout.put(buttonView5, 4, 0);

    layout.put(buttonView6, 0, 1);
    layout.put(buttonView7, 1, 1);
    layout.put(buttonView8, 2, 1);
    layout.put(buttonView9, 3, 1);
    layout.put(buttonView10, 4, 1);

    layout.put(buttonView11, 0, 2);
    layout.put(buttonView12, 1, 2);
    layout.put(buttonView13, 2, 2);
    layout.put(buttonView14, 3, 2);
    layout.put(buttonView15, 4, 2);

    layout.put(buttonView16, 0, 3);
    layout.put(buttonView17, 1, 3);
    layout.put(buttonView18, 2, 3);
    layout.put(buttonView19, 3, 3);
    layout.put(buttonView20, 4, 3);

    buttonView2.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_2_LEFT', args: ['い']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_2_UP', args: ['う']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_2_RIGHT', args: ['え']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_2_DOWN', args: ['お']}),
    ]);

    buttonView3.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_3_LEFT', args: ['き']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_3_UP', args: ['く']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_3_RIGHT', args: ['け']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_3_DOWN', args: ['こ']}),
    ]);

    buttonView4.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_4_LEFT', args: ['し']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_4_UP', args: ['す']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_4_RIGHT', args: ['せ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_4_DOWN', args: ['そ']}),
    ]);

    buttonView7.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_7_LEFT', args: ['ち']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_7_UP', args: ['つ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_7_RIGHT', args: ['て']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_7_DOWN', args: ['と']}),
    ]);

    buttonView8.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_8_LEFT', args: ['に']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_8_UP', args: ['ぬ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_8_RIGHT', args: ['ね']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_8_DOWN', args: ['の']}),
    ]);

    buttonView9.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_9_LEFT', args: ['ひ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_9_UP', args: ['ふ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_9_RIGHT', args: ['へ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_9_DOWN', args: ['ほ']}),
    ]);

    buttonView12.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_12_LEFT', args: ['み']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_12_UP', args: ['む']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_12_RIGHT', args: ['め']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_12_DOWN', args: ['も']}),
    ]);

    buttonView13.setFloatViews([
      null,
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_13_UP', args: ['ゆ']}),
      null,
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_13_DOWN', args: ['よ']}),
    ]);

    buttonView14.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_14_LEFT', args: ['り']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_14_UP', args: ['る']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_14_RIGHT', args: ['れ']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_14_DOWN', args: ['ろ']}),
    ]);

    buttonView18.setFloatViews([
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_18_LEFT', args: ['を']}),
      bottle.singleton(FloatView, {key: 'FLOAT_VIEW_18_UP', args: ['ん']}),
      null,
      null,
    ]);

    this.touchSprite.register(buttonView1);
    this.touchSprite.register(buttonView2);
    this.touchSprite.register(buttonView3);
    this.touchSprite.register(buttonView4);
    this.touchSprite.register(buttonView5);

    this.touchSprite.register(buttonView6);
    this.touchSprite.register(buttonView7);
    this.touchSprite.register(buttonView8);
    this.touchSprite.register(buttonView9);
    this.touchSprite.register(buttonView10);

    this.touchSprite.register(buttonView11);
    this.touchSprite.register(buttonView12);
    this.touchSprite.register(buttonView13);
    this.touchSprite.register(buttonView14);
    this.touchSprite.register(buttonView15);

    this.touchSprite.register(buttonView16);
    this.touchSprite.register(buttonView17);
    this.touchSprite.register(buttonView18);
    this.touchSprite.register(buttonView19);
    this.touchSprite.register(buttonView20);
  }
}

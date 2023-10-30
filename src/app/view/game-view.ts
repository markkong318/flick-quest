import * as PIXI from 'pixi.js';

import {View} from '../../framework/view';
import {Size} from '../../framework/size';
import {FlickerView} from './game/flicker-view';
import bottle from '../../framework/bottle';
import {Background} from '../../framework/background';
import {TouchSprite} from "./game/touch-sprite";
import {BattleView} from "./game/battle-view";

export class GameView extends View {
  private flickerView: FlickerView;
  private battleView: BattleView;
  private touchSprite: TouchSprite;

  constructor() {
    super();
  }

  public init() {
    this.background = new Background(PIXI.Texture.WHITE, 0xf9f1e1);

    this.battleView = bottle.singleton(BattleView);
    this.battleView.size = new Size(this.size.width, 600);
    this.battleView.background = new Background(PIXI.Texture.WHITE, 0x333333);
    this.battleView.y = 0;
    this.battleView.initUI();
    this.addChild(this.battleView);

    this.touchSprite = bottle.singleton(TouchSprite);
    this.touchSprite.width = this.width;
    this.touchSprite.height = this.height;
    this.touchSprite.interactive = true;
    this.addChild(this.touchSprite);

    this.flickerView = bottle.singleton(FlickerView);
    this.flickerView.size = new Size(this.size.width, 300);
    this.flickerView.background = new Background(PIXI.Texture.WHITE, 0xd2d5da);
    this.flickerView.y = this.size.height - 300;
    this.flickerView.initUI();
    this.addChild(this.flickerView);

    this.touchSprite.setBaseView(this.flickerView);
  }
}

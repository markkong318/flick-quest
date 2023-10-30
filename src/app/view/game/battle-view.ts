import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import bottle from "../../../framework/bottle";
import {FlickerTexture} from "../../texture/flicker-texture";
import {BattleTexture} from "../../texture/battle-texture";
import {GridLayout} from "./layout/grid-layout";
import {EnemyGroupView} from "./battle/enemy-group-view";
import {Size} from "../../../framework/size";
import {Background} from "../../../framework/background";
import {QuizGroupView} from "./battle/quiz-group-view";
import {State} from "pixi.js";
import {StateView} from "./battle/state-view";

export class BattleView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private messageBackgroundSprite: PIXI.Sprite;
  private messageText: PIXI.Text;

  private enemyGroupView: EnemyGroupView;
  private quizGroupView: QuizGroupView;
  private stateView: StateView;

  private baseHeight = 400;
  private baseY: number = 0;

  constructor() {
    super();
  }

  public initUI() {
    bottle.singleton(BattleTexture);

    this.baseY = (this.height - this.baseHeight) / 2;

    const sp = new PIXI.Sprite(PIXI.Texture.WHITE)
    sp.x = 0;
    sp.y = this.baseY;
    sp.width = this.width;
    sp.height = 450
    sp.tint = 0x555555
    this.addChild(sp)

    this.messageBackgroundSprite = new PIXI.Sprite(this.battleTexture.messageRoundRect)
    this.messageBackgroundSprite.x = (this.width - this.battleTexture.messageRoundRect.width) / 2;
    this.messageBackgroundSprite.y = this.baseY;
    this.addChild(this.messageBackgroundSprite)

    this.messageText = new PIXI.Text(">>>>>>>>");
    this.messageText.x = this.messageBackgroundSprite.x + 15;
    this.messageText.y = this.messageBackgroundSprite.y + 15;
    this.messageText.style.fontSize = '24px';
    this.messageText.style.fill = ['#ffffff']
    this.addChild(this.messageText);

    console.log("this.width: "+ this.width)

    this.enemyGroupView = bottle.singleton(EnemyGroupView);
    this.enemyGroupView.size = new Size(this.size.width, 150);
    this.enemyGroupView.background = new Background(PIXI.Texture.WHITE, 0x000000);
    this.enemyGroupView.x = 0;
    this.enemyGroupView.y = this.messageText.y + 50;
    this.enemyGroupView.initUI();
    this.addChild(this.enemyGroupView);

    this.quizGroupView = bottle.singleton(QuizGroupView);
    this.quizGroupView.size = new Size(this.size.width, 150);
    this.quizGroupView.background = new Background(PIXI.Texture.EMPTY, 0x000000);
    this.quizGroupView.x = 0;
    this.quizGroupView.y = this.enemyGroupView.y + this.enemyGroupView.height ;
    this.quizGroupView.initUI();
    this.addChild(this.quizGroupView);

    this.stateView = bottle.singleton(StateView);
    this.stateView.size = new Size(this.size.width, 50);
    this.stateView.background = new Background(PIXI.Texture.EMPTY, 0x000000);
    this.stateView.x = 0;
    this.stateView.y = this.quizGroupView.y + this.quizGroupView.height ;
    this.stateView.initUI();
    this.addChild(this.stateView);
  }


}

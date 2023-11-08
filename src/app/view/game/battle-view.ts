import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import bottle from '../../../framework/bottle';
import {BattleTexture} from '../../texture/battle-texture';
import {EnemyGroupView} from './battle/enemy-group-view';
import {Size} from '../../../framework/size';
import {Background} from '../../../framework/background';
import {QuizGroupView} from './battle/quiz-group-view';
import {StateView} from './battle/state-view';
import {MessageView} from './battle/message-view';

export class BattleView extends View {
  private battleTexture: BattleTexture;

  private messageView: MessageView;

  private enemyGroupView: EnemyGroupView;
  private quizGroupView: QuizGroupView;
  private stateView: StateView;

  private baseHeight = 450;
  private baseY: number = 0;

  constructor() {
    super();
  }

  public initUI() {
    this.battleTexture = bottle.singleton(BattleTexture);

    this.baseY = (this.height - this.baseHeight) / 2;

    // const sp = new PIXI.Sprite(PIXI.Texture.WHITE)
    // sp.x = 0;
    // sp.y = this.baseY;
    // sp.width = this.width;
    // sp.height = this.baseHeight;
    // sp.tint = 0x555555
    // this.addChild(sp)

    this.messageView = bottle.singleton(MessageView);
    this.messageView.size = new Size(this.size.width, 0);
    this.messageView.background = new Background(PIXI.Texture.WHITE, 0x000000);
    this.messageView.x = 0;
    this.messageView.y = this.baseY;
    this.messageView.initUI();
    this.addChild(this.messageView);

    console.log("this.width: " + this.width)

    this.enemyGroupView = bottle.singleton(EnemyGroupView);
    this.enemyGroupView.size = new Size(this.size.width, 150);
    this.enemyGroupView.background = new Background(PIXI.Texture.WHITE, 0x000000);
    this.enemyGroupView.x = 0;
    this.enemyGroupView.y = this.messageView.y + this.messageView.height;
    this.enemyGroupView.initUI();
    this.addChild(this.enemyGroupView);

    this.quizGroupView = bottle.singleton(QuizGroupView);
    this.quizGroupView.size = new Size(this.size.width, 150);
    this.quizGroupView.background = new Background(PIXI.Texture.EMPTY, 0x000000);
    this.quizGroupView.x = 0;
    this.quizGroupView.y = this.enemyGroupView.y + this.enemyGroupView.height;
    this.quizGroupView.initUI();
    this.addChild(this.quizGroupView);

    this.stateView = bottle.singleton(StateView);
    this.stateView.size = new Size(this.size.width, 50);
    this.stateView.background = new Background(PIXI.Texture.EMPTY, 0x000000);
    this.stateView.x = 0;
    this.stateView.y = this.quizGroupView.y + this.quizGroupView.height;
    this.stateView.initUI();
    this.addChild(this.stateView);
  }


}

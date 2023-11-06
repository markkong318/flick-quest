import gsap from 'gsap';

import {Controller} from '../../framework/controller';
import bottle from '../../framework/bottle';
import {MessageView} from '../view/game/battle/message-view';
import {EnemyGroupView} from '../view/game/battle/enemy-group-view';
import {QuizGroupView} from '../view/game/battle/quiz-group-view';
import {BattleTexture} from '../texture/battle-texture';

export class MainController extends Controller {
  private messageView: MessageView = bottle.inject(MessageView);
  private enemyGroupView: EnemyGroupView = bottle.inject(EnemyGroupView);
  private quizGroupView: QuizGroupView = bottle.inject(QuizGroupView);
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  start() {
    this.enemyGroupView.setEnemy(0, ...this.battleTexture['acientFighter']);
    this.enemyGroupView.setEnemy(1, ...this.battleTexture.acientFighter);
    this.enemyGroupView.setEnemy(2, ...this.battleTexture.acientFighter);

    const timeline = gsap.timeline({});
    timeline.add(this.messageView.playMessage('hhhhh'))
      .add(this.messageView.playMessage('あああああ'), '>')
      .add(this.enemyGroupView.playShow([0, 1, 2]), '>')
      .add(this.quizGroupView.playShow([0, 1, 2]), '<');


  }
}

import gsap from 'gsap';

import {Controller} from '../../framework/controller';
import bottle from '../../framework/bottle';
import {MessageView} from '../view/game/battle/message-view';
import {EnemyGroupView} from '../view/game/battle/enemy-group-view';
import {QuizGroupView} from '../view/game/battle/quiz-group-view';

export class MainController extends Controller {
  private messageView: MessageView = bottle.inject(MessageView);
  private enemyGroupView: EnemyGroupView = bottle.inject(EnemyGroupView);
  private quizGroupView: QuizGroupView = bottle.inject(QuizGroupView);

  start() {
    const timeline = gsap.timeline({});
    timeline.add(this.messageView.playMessage('hhhhh'))
      .add(this.messageView.playMessage('あああああ'), '>')
      .add(this.enemyGroupView.playShow([0, 1, 2]), '>')
      .add(this.quizGroupView.playShow([0, 1, 2]), '<');
  }
}

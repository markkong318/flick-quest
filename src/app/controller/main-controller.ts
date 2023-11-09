import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {Controller} from '../../framework/controller';
import bottle from '../../framework/bottle';
import {MessageView} from '../view/game/battle/message-view';
import {EnemyGroupView} from '../view/game/battle/enemy-group-view';
import {QuizGroupView} from '../view/game/battle/quiz-group-view';
import {BattleTexture} from '../texture/battle-texture';
import {FlickerView} from '../view/game/flicker-view';
import {StageModel} from '../model/stage-model';

import stage1json from '../../assets/stages/stage1.json';
import stage2json from '../../assets/stages/stage2.json';
import stage3json from '../../assets/stages/stage3.json';
import stage4json from '../../assets/stages/stage4.json';
import stage5json from '../../assets/stages/stage5.json';
import configjson from '../../assets/config.json';
import {GameModel} from '../model/game-model';
import rocket from '../../framework/rocket';
import {EVENT_SEND_KEY} from '../env/event';
import {MaskView} from '../view/game/mask-view';
import {StateView} from '../view/game/battle/state-view';

export class MainController extends Controller {
  private messageView: MessageView = bottle.inject(MessageView);
  private enemyGroupView: EnemyGroupView = bottle.inject(EnemyGroupView);
  private quizGroupView: QuizGroupView = bottle.inject(QuizGroupView);
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);
  private flikerView: FlickerView = bottle.inject(FlickerView);
  private maskView: MaskView = bottle.inject(MaskView);
  private stateView: StateView = bottle.inject(StateView);

  private stageModels: StageModel[] = [];
  private gameModel: GameModel;

  private timeline: gsap.core.Timeline;

  private timerId: number = -1;

  initStages() {
    this.stageModels.push(new StageModel(stage1json));
    this.stageModels.push(new StageModel(stage2json));
    this.stageModels.push(new StageModel(stage3json));
    this.stageModels.push(new StageModel(stage4json));
    this.stageModels.push(new StageModel(stage5json));
  }

  initGame() {
    this.gameModel = new GameModel();
    this.gameModel.time = configjson.time;
    this.gameModel.maxTime = configjson.time;
    this.gameModel.life = configjson.life;
    this.gameModel.maxStageId = configjson.maxStageId;
  }

  initSendKey() {
    rocket.on(EVENT_SEND_KEY, (key) => {
      if (this.timerId == -1) {
        return;
      }

      const quizs = this.gameModel.quizs;
      const enemyIds = this.gameModel.enemyIds;

      let hitIdx = -1;
      for(let i = 0; i < quizs.length; i++) {
        if (enemyIds[i] != '' && quizs[i].charAt(0) === key) {
          quizs[i] = quizs[i].substring(1);
          hitIdx = i;
          break;
        }
      }

      if (hitIdx == -1) {
        return;
      } else {
        this.quizGroupView.setQuiz(hitIdx, quizs[hitIdx]);

        if (quizs[hitIdx].length == 0) {
          this.enemyGroupView.playHide(hitIdx);

          for(let j = 0; j < this.gameModel.killEvent.messages.length; j++) {
            const message = this.gameModel.killEvent.messages[j];
            this.timeline.add(this.messageView.playMessage(message));
          }
        }
      }

      let isClear = true;
      for(let i = 0; i < quizs.length; i++) {
        if (enemyIds[i] == '') {
          continue;
        }

        if (quizs[i].length != 0) {
          isClear = false;
        }
      }

      if (isClear) {
        this.pauseTimer();

        this.timeline
          .add(this.maskView.playHide())
          .add(this.quizGroupView.playHide([0, 1, 2]), '<');

        for(let i = 0; i < this.gameModel.successEvent.messages.length; i++) {
          const message = this.gameModel.successEvent.messages[i];
          if (i == this.gameModel.successEvent.messages.length - 1 &&
            this.gameModel.stageId == this.gameModel.maxStageId - 1) {
            this.timeline.add(this.messageView.playMessage(message, 300), '>');
          } else {
            this.timeline.add(this.messageView.playMessage(message), '>');
          }
        }

        this.gameModel.stageId++;

        if (this.gameModel.stageId >= this.gameModel.maxStageId) {
          return;
        }

        this.timeline.call(() => this.loadStage(this.gameModel.stageId));

        this.gameModel.time = this.gameModel.maxTime;

        this.timeline.call(() => this.restoreTimer());

        this.timeline.call(() => this.play());
      }
    });
  }

  initTimeline() {
    this.timeline = gsap.timeline();
  }

  init() {
    this.initStages();
    this.initGame();
    this.initSendKey();
    this.initTimeline();
  }

  loadStage(stageId: number) {
    const stageModel = this.stageModels[stageId];

    this.gameModel.quizs = [];
    this.gameModel.enemyIds = [];
    this.gameModel.startEvent = {};
    this.gameModel.timeoutEvent = {};
    this.gameModel.killEvent = {};
    this.gameModel.failEvent = {};
    this.gameModel.successEvent = {};

    for (let i = 0; i < stageModel.events.length; i++) {
      const event = stageModel.events[i];
      switch (event.on) {
        case 'start':
          this.gameModel.startEvent = event;
          break;
        case 'timeout':
          this.gameModel.timeoutEvent = event;
          break;
        case 'kill':
          this.gameModel.killEvent = event;
          break;
        case 'fail':
          this.gameModel.failEvent = event;
          break;
        case 'success':
          this.gameModel.successEvent = event;
          break;
      }
    }

    for (let i = 0; i < stageModel.enemies.length; i++) {
      const enemy = stageModel.enemies[i];

      this.gameModel.quizs.push(enemy.quiz);
      this.gameModel.enemyIds.push(enemy.enemyId);
    }

    this.gameModel.decrease = stageModel.decrease;
  }

  play() {
    this.timeline.add(this.stateView.playLife(this.gameModel.life));

    for (let i = 0; i < this.gameModel.enemyIds.length; i++) {
      const enemyId = this.gameModel.enemyIds[i];

      if (!enemyId) {
        this.enemyGroupView.setEnemy(i, [PIXI.Texture.EMPTY], 0);
        continue;
      }

      // @ts-ignore
      this.enemyGroupView.setEnemy(i, ...this.battleTexture[enemyId]);
    }

    for (let i = 0; i < this.gameModel.quizs.length; i++) {
      const quiz = this.gameModel.quizs[i];

      if (!quiz) {
        this.quizGroupView.setQuiz(i, '');
        continue;
      }

      this.quizGroupView.setQuiz(i, quiz);
    }

    this.timeline.add(this.maskView.playHide());

    for(let i = 0; i < this.gameModel.startEvent.messages.length; i++) {
      const message = this.gameModel.startEvent.messages[i];
      this.timeline.add(this.messageView.playMessage(message), '>');
    }

    this.timeline.add(this.enemyGroupView.playShow([0, 1, 2]), '>')
      .add(this.quizGroupView.playShow([0, 1, 2]), '<')
      .add(this.maskView.playShow(), '<')
      .call(() => {
        this.restartTimer()
      });
  }

  restartTimer() {
    if (this.timerId != -1) {
      return;
    }

    this.timerId = setInterval(() => {
      this.gameModel.time -= this.gameModel.decrease;

      if (this.gameModel.time < 0) {
        this.pauseTimer();

        this.timeline.add(this.maskView.playHide());

        this.gameModel.time = 0;

        this.gameModel.life--;

        if (this.gameModel.life == 0) {
          this.timeline
            .add(this.stateView.playLife(this.gameModel.life))
            .add(this.enemyGroupView.playPause([0, 1, 2]), '<')

          for (let i = 0; i < this.gameModel.failEvent.messages.length; i++) {
            const message = this.gameModel.failEvent.messages[i];

            if (i == this.gameModel.failEvent.messages.length - 1) {
              this.timeline.add(this.messageView.playMessage(message, 300), '>');
            } else {
              this.timeline.add(this.messageView.playMessage(message), '>');
            }
          }
        } else {
          this.timeline
            .add(this.enemyGroupView.playPause([0, 1, 2]));

          for (let i = 0; i < this.gameModel.timeoutEvent.messages.length; i++) {
            const message = this.gameModel.timeoutEvent.messages[i];
            this.timeline.add(this.messageView.playMessage(message), '>');
          }

          this.timeline
            .add(this.flikerView.playShake())
            .add(this.stateView.playLife(this.gameModel.life), '<')
            .call(() => {
              this.restoreTimer();
              this.restartTimer();
            })
            .add(this.maskView.playShow(), '>')
            .add(this.enemyGroupView.playResume([0, 1, 2]), '<')
        }
      }

      this.stateView.playTime(this.gameModel.time);
    }, 16);
  }

  pauseTimer() {
    clearInterval(this.timerId);
    this.timerId = -1;
  }

  restoreTimer() {
    this.gameModel.time = this.gameModel.maxTime;
    this.timeline.add(this.stateView.playTime(this.gameModel.time, 0.5), '>');
  }

  main() {
    this.init();
    this.loadStage(0);
    this.play();
  }
}

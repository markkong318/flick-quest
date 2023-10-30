import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import bottle from "../../../../framework/bottle";
import {BattleTexture} from "../../../texture/battle-texture";
import {GridLayout} from "../layout/grid-layout";

export class QuizGroupView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private quizTexts: PIXI.HTMLText[] = [];

  constructor() {
    super();
  }

  public initUI() {
    const layout = new GridLayout(this, 1, 3, 5, {noResize: true});

    for (let i = 0; i < 3; i++) {
      const quizText: PIXI.HTMLText = new PIXI.HTMLText("<font color='red'>あ</font><font color='white'>ああああ</font>");
      layout.put(quizText, 0, i);

      this.quizTexts.push(quizText)
    }
  }

  setQuiz(id: number, text: string) {
    this.quizTexts[id].text = `<font color="red">${text.charAt(0)}</font><font color='white'>${text.substring(1)}</font>`
  }

  playShow(ids: number | number[]) {

  }
}

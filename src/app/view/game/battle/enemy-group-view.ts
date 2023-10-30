import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import bottle from "../../../../framework/bottle";
import {BattleTexture} from "../../../texture/battle-texture";
import {GridLayout} from "../layout/grid-layout";

export class EnemyGroupView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private enemySprite: PIXI.Sprite[] = [];

  constructor() {
    super();
  }

  public initUI() {
    const layout = new GridLayout(this, 3, 1, 30);

    for (let i = 0; i < 3; i++) {
      const enemySprite = new PIXI.Sprite(this.battleTexture.dummyEnemy);
      layout.put(enemySprite, i, 0);

      this.enemySprite.push(enemySprite);
    }

    // const sp = new PIXI.Sprite(PIXI.Texture.WHITE)
    // sp.x = 0;
    // sp.y = this.baseY;
    // sp.width = this.width;
    // sp.height = 400
    // sp.tint = 0xff0000
    // this.addChild(sp)
  }

  setEnemy(id: number, sprite: PIXI.Sprite) {

  }

  playKill(ids: number | number[]) {

  }

  playShow(ids: number | number[]) {

  }


}

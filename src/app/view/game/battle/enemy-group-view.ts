import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../../framework/view';
import bottle from "../../../../framework/bottle";
import {BattleTexture} from '../../../texture/battle-texture';
import {GridLayout} from '../layout/grid-layout';

export class EnemyGroupView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private enemySprites: PIXI.Sprite[] = [];

  constructor() {
    super();
  }

  public initUI() {
    const layout = new GridLayout(this, 3, 1, 30);

    for (let i = 0; i < 3; i++) {
      const enemySprite = new PIXI.Sprite(this.battleTexture.dummyEnemy);
      enemySprite.alpha = 0;
      layout.put(enemySprite, i, 0);

      this.enemySprites.push(enemySprite);
    }

    // const sp = new PIXI.Sprite(PIXI.Texture.WHITE)
    // sp.x = 0;
    // sp.y = this.baseY;
    // sp.width = this.width;
    // sp.height = 400
    // sp.tint = 0xff0000
    // this.addChild(sp)
  }

  setEnemy(id: number, texture: PIXI.Texture) {
    this.enemySprites[id].texture = texture;
  }

  playHide(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();

    for (let i = 0; i < ids.length; i++) {
      const sprite = this.enemySprites[ids[i]];
      timeline.to(sprite, {
        pixi: {
          duration: 0.5,
          alpha: 0,
        },
      }, '<')
    }

    return timeline;
  }

  playShow(ids: number | number[]): gsap.core.Timeline {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    const timeline = gsap.timeline();

    for (let i = 0; i < ids.length; i++) {
      const sprite = this.enemySprites[ids[i]];
      timeline.to(sprite, {
        pixi: {
          duration: 0.5,
          alpha: 1,
        },
      }, '<')
    }

    return timeline;
  }
}

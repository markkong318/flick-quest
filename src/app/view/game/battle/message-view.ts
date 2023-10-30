import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import bottle from "../../../../framework/bottle";
import {BattleTexture} from "../../../texture/battle-texture";
import {GridLayout} from "../layout/grid-layout";

export class MessageView extends View {
  private battleTexture: BattleTexture = bottle.inject(BattleTexture);

  private messageBackgroundSprite: PIXI.Sprite;
  private messageText: PIXI.Text;

  constructor() {
    super();
  }

  public initUI() {
    this.messageBackgroundSprite = new PIXI.Sprite(this.battleTexture.messageRoundRect)
    this.messageBackgroundSprite.x = (this.width - this.battleTexture.messageRoundRect.width) / 2;
    this.messageBackgroundSprite.y = 0;
    this.addChild(this.messageBackgroundSprite)

    this.messageText = new PIXI.Text(">>>>>>>>");
    this.messageText.x = this.messageBackgroundSprite.x + 15;
    this.messageText.y = this.messageBackgroundSprite.y + 15;
    this.messageText.style.fontSize = '24px';
    this.messageText.style.fill = ['#ffffff']
    this.addChild(this.messageText);
  }

  playMessage(text: string) {

  }
}

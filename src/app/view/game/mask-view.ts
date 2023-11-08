import {View} from '../../../framework/view';
import {Background} from '../../../framework/background';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export class MaskView extends View {
  private waitText: PIXI.Text

  constructor() {
    super();
  }

  initUI() {
    this.alpha = 0.5;

    this.waitText = new PIXI.Text("Please wait...");
    this.waitText.x = 0;
    this.waitText.y = 0;
    this.waitText.style.fontFamily = 'jackeyfont';
    this.waitText.style.fontSize = '24px';
    this.waitText.style.fill = ['#ffffff'];
    this.addChild(this.waitText);
  }

  playShow(): gsap.core.Timeline {
    return gsap.timeline()
      .to(this, {
        pixi: {
          duration: 0.5,
          alpha: 0,
        },
        onCompleteParams: [this],
        onComplete: function (target: View) {
          target.interactive = false;
        },
      });
  }

  playHide(): gsap.core.Timeline {
    return gsap.timeline()
      .to(this, {
        pixi: {
          duration: 0.5,
          alpha: 0.5,
        },
        onStartParams: [this],
        onStart: function (target: View) {
          console.log('play hide')
          target.interactive = true;
        },
      });
  }
}

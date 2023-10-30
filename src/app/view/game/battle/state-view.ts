import {View} from "../../../../framework/view";
import * as PIXI from "pixi.js";

export class StateView extends View {
    private timeTitleText: PIXI.Text;
    private timeSprite: PIXI.Sprite;
    private lifeTitleText: PIXI.Text;
    private lifeValueText:PIXI.Text;

    public initUI() {
        this.timeTitleText =  new PIXI.Text("Time:");
        this.timeTitleText.x = 0;
        this.timeTitleText.y = 0;
        this.timeTitleText.style.fontSize = '20px';
        this.timeTitleText.style.fill = ['#ffffff'];
        this.addChild(this.timeTitleText);

        this.lifeTitleText =  new PIXI.Text("Life:");
        this.lifeTitleText.x = 0;
        this.lifeTitleText.y = this.timeTitleText.y + 20;
        this.lifeTitleText.style.fontSize = '20px';
        this.lifeTitleText.style.fill = ['#ffffff'];
        this.addChild(this.lifeTitleText);

        this.lifeValueText =  new PIXI.Text("♥♥♥♥♥");
        this.lifeValueText.x = 100;
        this.lifeValueText.y = this.timeTitleText.y + 20;
        this.lifeValueText.style.fontSize = '20px';
        this.lifeValueText.style.fill = ['#ffffff']
        this.addChild(this.lifeValueText);
    }
}

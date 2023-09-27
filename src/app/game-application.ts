import * as PIXI from 'pixi.js';
import {GameView} from './view/game-view';
import {Application} from '../framework/application';
import {Size} from '../framework/size';
import {Storage} from './storage/storage';
import bottle from '../framework/bottle';
import {MainController} from './controller/main-controller';

export class GameApplication extends Application {
  private mainController: MainController;
  private gameView: GameView;
  private storage: Storage;

  constructor(options?) {
    super(options);
    this.preload();
  }

  public preload(): void {
    // PIXI.Assets
    //   .load((loader, resources) => {
    //     this.onAssetsLoaded();
    //   });
    // const texturePromise = PIXI.Assets.load('examples/assets/bunny.png');

    this.onAssetsLoaded()
  }

  public onAssetsLoaded(): void {
    this.initScene();
  }

  public initScene(): void {
    bottle.setObject(this.renderer);

    // this.peerModel = bottle.singleton(PeerModel);
    // this.roomModel = bottle.singleton(RoomModel);

    this.storage = bottle.singleton(Storage);

    const viewWidth = 480;
    const viewHeight = this.getViewHeight(viewWidth);

    this.gameView = new GameView();
    this.gameView.size = new Size(viewWidth, viewHeight);
    this.gameView.init();

    this.stage.addChild(this.gameView);

    this.resizeView();

    this.mainController = bottle.singleton(MainController);

    this.mainController.start();
  }

  public getViewHeight(viewWidth) {
    if (this.renderer.width > this.renderer.height) {
      return 900;
    } else {
      return Math.floor(viewWidth * this.renderer.height / this.renderer.width);
    }
  }

  public resizeView(): void {
    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(this.renderer.width / this.gameView.size.width, this.renderer.height / this.gameView.size.height) / this.renderer.resolution;

      this.gameView.scale.x = scale;
      this.gameView.scale.y = scale;

      this.gameView.x = (this.renderer.width - this.gameView.size.width * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
      this.gameView.y = (this.renderer.height - this.gameView.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    } else {
      const scale = this.renderer.width / this.gameView.size.width / this.renderer.resolution;

      this.gameView.scale.x = scale;
      this.gameView.scale.y = scale;

      this.gameView.x = 0;
      this.gameView.y = (this.renderer.height - this.gameView.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    }
  }
}

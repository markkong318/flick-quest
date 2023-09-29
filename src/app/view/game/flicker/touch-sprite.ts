import * as PIXI from "pixi.js";
import {Texture} from "@pixi/core";
import {View} from "../../../../framework/view";
import {ButtonView} from "./button-view";

export class TouchSprite extends PIXI.Sprite {
    private isDown: boolean = false;
    private views: View[] = [];
    private pointerDownViews: Map<View, View> = new Map<View, View>();
    private pointerDownTimestamp: number;
    private pointerUpTimestamp: number;

    private baseView: View;

    constructor(texture?: Texture){
        super(texture);

        this.interactive = true;
        this.on('pointerdown', (event) => {
            console.log('pointerdown');

            this.isDown = true;

            this.pointerDownTimestamp = Date.now();
            this.checkCollision(event);
        });
        this.on('pointermove', (event) => {
            if (!this.isDown) {
                return;
            }

            console.log('pointermove');

            this.checkCollision(event);
        });
        this.on('pointerup', (event) => {
            if (!this.isDown) {
                return;
            }

            console.log('pointerup');

            this.pointerUpTimestamp = Date.now();
            this.checkCollision(event)
            this.isDown = false;
        });
        this.on('pointerout', (event) => {
            if (!this.isDown) {
                return;
            }

            console.log('pointerout');
        });

        this.on('pointerupoutside', (event) => {
            if (!this.isDown) {
                return;
            }

            console.log('pointerupoutside');

            this.pointerUpTimestamp = Date.now();
            this.checkCollision(event)

            this.isDown = false;
        });
    }

    public setBaseView(view: View) {
        this.baseView = view;
    }

    public register(view: View) {
        this.views.push(view);
    }

    private checkCollision(event) {
        // console.log(event.data)
        const {x, y} = this.baseView.toLocal(event.global);

        for (let i = 0; i < this.views.length; i ++) {
            const view = this.views[i];

            // console.log("x:" + x)
            // console.log("y:" + y)
            //
            // console.log("view.x:" + view.x)
            // console.log("view.y:" + view.y)
            // console.log("view.width:" + view.width)
            // console.log("view.height:" + view.height)

            let isHit = false;
            if (x >= view.x && x <= view.x + view.width &&
                y >= view.y && y <= view.y + view.height) {
                isHit = true;
            }

            // 1    2    3
            // 4 view(5) 6
            // 7    8    9
            let area = 5;
            if (x < view.x && y < view.y) {
                area = 1
            } else if (x >= view.x && x <= view.x + view.width && y < view.y) {
                area = 2;
            } else if (x > view.x + view.width && y < view.y) {
                area = 3;
            } else if (x < view.x && y >= view.y && y <= view.y + view.height) {
                area = 4;
            } else if (x > view.x + view.width && y <= view.y + view.height) {
                area = 6;
            } else if (x < view.x && y > view.y + view.height) {
                area = 7;
            } else if (x >= view.x && x <= view.x + view.width && y > view.y + view.height) {
                area = 8;
            } else if (x > view.x + view.width && y > view.y + view.height) {
                area = 9;
            }

            if (event.type == 'pointerdown') {
                if (!isHit) {
                    continue;
                }

                if (this.pointerDownViews.has(view)) {
                   continue;
                }

                // @ts-ignore
                view.emit('boardpointerdown', {
                    type: 'boardpointerdown',
                    isHit,
                    area,
                    ...event,
                });
                this.pointerDownViews.set(view, view);
            } else if (event.type == 'pointermove') {
                if (!this.pointerDownViews.has(view)) {
                    continue;
                }

                // @ts-ignore
                view.emit('boardpointermove', {
                    type: 'boardpointermove',
                    isHit,
                    area,
                    ...event,
                });
            } else if (event.type == 'pointerup' || event.type == 'pointerupoutside') {
                if (!this.pointerDownViews.has(view)) {
                    continue;
                }

                // @ts-ignore
                view.emit('boardpointerup', {
                    type: 'boardpointerup',
                    isHit,
                    area,
                    ...event,
                });

                if (this.pointerUpTimestamp - this.pointerDownTimestamp < 150) {
                    // @ts-ignore
                    view.emit('boardpointerclick', {
                        type: 'boardpointerclick',
                        ...event,
                    });
                }

                this.pointerDownViews.delete(view);
            }


            // else if (!isMatch || (event.type == 'pointerup' || event.type == 'pointerupoutside' || event.type == 'pointermove')) {
            //     if (this.pointerDownViews.has(view)) {
            //         // @ts-ignore
            //         view.emit('boardpointerup', {});
            //         this.pointerDownViews.delete(view);
            //     }
            // }

            // if (event.type == 'pointerdown' || event.type == 'pointermove') {
            //     if (x >= view.x && x <= view.x + view.width &&
            //         y >= view.y && y <= view.y + view.height) {
            //         if (!this.pointerDownViews.has(view)) {
            //             // @ts-ignore
            //             view.emit('boardpointerdown', {});
            //             this.pointerDownViews.set(view, view);
            //         }
            //     } else {
            //         if (this.pointerDownViews.has(view)) {
            //             // @ts-ignore
            //             view.emit('boardpointerup', {});
            //             this.pointerDownViews.delete(view);
            //         }
            //     }
            // } else if (event.type == 'pointerup' || event.type == 'pointerupoutside') {
            //     if (this.pointerDownViews.has(view)) {
            //         // @ts-ignore
            //         view.emit('boardpointerup', {});
            //         this.pointerDownViews.delete(view);
            //     }
            // }
        }
    }
}

import {View} from "../../../../framework/view";

export class GridLayout {
    private parent: View;

    private sizeX: number;
    private sizeY: number;
    private padding: number;

    constructor(parent, sizeX, sizeY, padding) {
        this.parent = parent;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.padding = 10//padding;
    }

    put(view, idxX, idxY) {
        this.parent.addChild(view)

        const width = (this.parent.width / this.sizeX) - this.padding * 2;
        const height = (this.parent.height / this.sizeY) - this.padding * 2;

        // const cellWidth = width / this.sizeX;
        // const cellHeight = height / this.sizeY
        view.width = width;
        view.height = height;

        // view.width = cellWidth;
        // view.height = cellHeight;

        console.log("vw: " + view.width)
        console.log("vh: " + view.height)
        console.log("scale: " + view.scale)

        console.log("cellWidth: " + width)
        console.log("cellHeight: " + height)
        // console.log("scale: " + this.scale)

        const x =
            this.padding +
            (width + this.padding * 2) * idxX +
            (width - view.width) / 2;
        const y = this.padding +
            (height + this.padding * 2) * idxY +
            (height - view.height) / 2;

        view.x = x;
        view.y = y;
    }
}

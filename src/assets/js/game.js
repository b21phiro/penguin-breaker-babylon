import * as babylonjs from "babylonjs";

class Game {

    /** @type HTMLCanvasElement */
    _canvas = null;

    /** @type BABYLON.Engine */
    _engine = null;

    /**
     * @param canvas { HTMLCanvasElement }
     */
    constructor(canvas) {

        // Init canvas element.
        this._canvas = canvas;
        this._setCanvasSizeToParent();

        // Init of babylon engine.
        this._engine = new BABYLON.Engine(canvas, true);

        // Resizes the canvas element to the parent
        // when the browser changes size.
        window.onresize = (ev) => {
            this._setCanvasSizeToParent();
        };

    }

    _setCanvasSizeToParent() {
        const aspectRatio = 16 / 9;
        const parentElement = this._canvas.parentElement;
        this._canvas.width = parentElement.offsetWidth;
        this._canvas.height = parentElement.offsetWidth / aspectRatio;
    }

}

export { Game };
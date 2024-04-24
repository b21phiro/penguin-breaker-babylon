class Game {

    /** @type HTMLCanvasElement */
    _canvas = null;

    /**
     * @param canvas { HTMLCanvasElement }
     */
    constructor(canvas) {

        this._canvas = canvas;
        this._setCanvasSizeToParent();

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
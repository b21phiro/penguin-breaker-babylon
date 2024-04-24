import {Game} from "./game";

class Boot {

    /** @type Game */
    game = null;

    /** @type HTMLElement */
    _rootElement = null;

    /** @type string */
    _rootElementId = undefined;

    /** @type { HTMLCanvasElement } */
    _canvas = null;

    constructor() {}

    /**
     * @param rootElementId { string }
     */
    boot(rootElementId) {
        this._initCanvas(rootElementId);
        if (!this.game) {
            this.game = new Game(this._canvas);
        }
        return this.game;
    }

    /**
     * @param rootElementId { string }
     */
    _initCanvas(rootElementId) {
        this._rootElementId = rootElementId;
        this._canvas = document.createElement('canvas');
        this._canvas.id = 'PenguinBreakerCanvas';
        this._insertCanvasToRootElement();
    }

    _insertCanvasToRootElement() {
        this._rootElement = document.getElementById(this._rootElementId) ?? null;
        if (!this._rootElement) {
            console.error(`No root element with the ID ${this._rootElementId} was found!`);
            return;
        }
        this._rootElement.insertAdjacentElement('beforeend', this._canvas);
    }

}

const GameBoot = new Boot();

export { GameBoot };
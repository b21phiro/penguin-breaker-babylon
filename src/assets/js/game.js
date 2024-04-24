import * as BABYLON from 'babylonjs';
import {Board} from "./board";

class Game {

    /** @type HTMLCanvasElement */
    _canvas = null;

    /** @type BABYLON.Engine */
    _engine = null;

    /** @type BABYLON.Scene */
    _scene = null;

    /** @type Board */
    _board = null;

    /**
     * @param canvas { HTMLCanvasElement }
     */
    constructor(canvas) {

        // Init canvas element.
        this._canvas = canvas;
        this._setCanvasSizeToParent();

        // Init of babylon engine.
        this._engine = new BABYLON.Engine(canvas, true);

        // The board or the cave in which the game takes place in.
        this._board = new Board();

        // Resizes the canvas element to the parent
        // when the browser changes size.
        window.onresize = (ev) => {
            this._setCanvasSizeToParent();
        };

    }

    play() {
        this._createGameScene();
        this._engine.runRenderLoop(() => this._loop());
    }

    _loop() {
        this._scene.render();
    }

    _setCanvasSizeToParent() {
        const aspectRatio = 16 / 9;
        const parentElement = this._canvas.parentElement;
        this._canvas.width = parentElement.offsetWidth;
        this._canvas.height = parentElement.offsetWidth / aspectRatio;
    }

    _createGameScene() {

        // Init of the engine.
        const engine = this._engine;

        // Init of canvas.
        const canvas = this._canvas;

        // Creates a basic Babylon Scene object
        const scene = new BABYLON.Scene(engine);

        // Creates and positions a free camera
        const camera = new BABYLON.FreeCamera("camera1",
            new BABYLON.Vector3(0, 5, -15), scene);

        // Targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // Creates a light, aiming 0,1,0 - to the sky
        const light = new BABYLON.HemisphericLight("light",
            new BABYLON.Vector3(0, 1, 0), scene);

        // Dim the light a small amount - 0 to 1
        light.intensity = 0.7;

        // Load in the board meshes.
        this._board.initBoardMeshes(this._scene);

        // Delegate scene.
        this._scene = scene;

    }

}

export { Game };
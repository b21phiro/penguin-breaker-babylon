import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import {Board} from "./board";
import {Player} from "./player";

// Images for the skybox.
import '../images/skybox/skybox_nz.jpg';
import '../images/skybox/skybox_nx.jpg';
import '../images/skybox/skybox_ny.jpg';
import '../images/skybox/skybox_px.jpg';
import '../images/skybox/skybox_py.jpg';
import '../images/skybox/skybox_pz.jpg';

// GLB files.
import '../models/PlayerModel.glb';

class Game {

    /** @type HTMLCanvasElement */
    _canvas = null;

    /** @type BABYLON.Engine */
    _engine = null;

    /** @type BABYLON.Scene */
    _scene = null;

    /** @type Board */
    _board = null;

    /** @type BABYLON.ArcRotateCamera */
    _camera = null;

    /** @type BABYLON.HemisphericLight */
    _light = null;

    /** @type Player */
    player = null;

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

        this.player = new Player();

        // Resizes the canvas element to the parent
        // when the browser changes size.
        window.onresize = (ev) => {
            this._setCanvasSizeToParent();
        };

    }

    play() {
        this._createGameScene().then(() => {
            this.resetPositions();
            this._engine.runRenderLoop(() => this._loop());
        });
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

    async _createGameScene() {
        this._scene = new BABYLON.Scene(this._engine);
        this._initSceneCamera();
        this._initSceneLight();
        this._initSceneSkybox();
        this._board.initBoardMeshes(this._scene);
        await this.player.initPlayerMeshAsync(this._scene);
    }

    _initSceneCamera() {

        // Check that we got everything.
        if (!this._scene || !this._canvas) {
            console.error(`Missing scene or canvas, can't prepare the camera without them!`);
            return;
        }

        // Creates and positions a free camera
        this._camera = new BABYLON.ArcRotateCamera("Camera",
            -Math.PI / 2,
            Math.PI / 2,
            20,
            new BABYLON.Vector3(
                0,
                4.5,
                0
            ),
            this._scene
        );

        // Less fish-eye.
        this._camera.fov = 0.5;

    }

    _initSceneLight() {
        this._light = new BABYLON.HemisphericLight("Light",
            new BABYLON.Vector3(0, .5, -5),
            this._scene
        );
        this._light.intensity = 1.0;
    }

    _initSceneSkybox() {
        const skybox = BABYLON.MeshBuilder.CreateBox("Sky",
            { size: 100.0 },
            this._scene
        );
        const skyboxMaterial = new BABYLON.StandardMaterial("Sky", this._scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.infiniteDistance = true;
        // Files are in dist/images/skybox/skybox_[name].[ext]
        // due to how webpack does things.
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", this._scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skybox.material = skyboxMaterial;
    }

    resetPositions() {

        // Set player centered on the board.
        this.player._mesh[0].position = new BABYLON.Vector3(
            0,
            this._board.getFloorPositionY(),
            0
        );

    }

}

export { Game };
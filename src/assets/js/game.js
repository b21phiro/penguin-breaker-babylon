import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

// Images for the skybox.
import '../images/skybox/skybox_nz.jpg';
import '../images/skybox/skybox_nx.jpg';
import '../images/skybox/skybox_ny.jpg';
import '../images/skybox/skybox_px.jpg';
import '../images/skybox/skybox_py.jpg';
import '../images/skybox/skybox_pz.jpg';

// GLB files.
import '../models/PenguinBreakerGameScene.glb';

import {Player} from "./player";
import {Ball} from "./ball";
import {Cave} from "./cave";

class Game {

    /** @type HTMLCanvasElement */
    canvas = null;

    /** @type { BABYLON.Engine } */
    engine = null;

    /** @type { BABYLON.Scene } */
    scene = null;

    /** @type { BABYLON.ArcRotateCamera } */
    camera = null;

    /** @type { BABYLON.HemisphericLight } */
    light = null;

    /** @type {Mesh} */
    skybox = null;

    /** @type Player */
    player = null;

    /** @type Ball */
    ball = null;

    /** @type Cave */
    cave = null;

    inputMap = null;

    ballHasBeenShot = false;

    /** @param canvas { HTMLCanvasElement } */
    constructor(canvas) {

        this.inputMap = {};

        this.player = new Player();
        this.ball = new Ball();
        this.cave = new Cave();

        this.canvas = canvas;
        this._setCanvasSize();

        this.engine = new BABYLON.Engine(canvas, true);

        window.onresize = (ev) => this._onResize(ev);

    }

    play() {
        this.initGameScene()
            .then(() => {

                // Handler for updating input before render.
                this.scene.onBeforeRenderObservable.add(() => this.input());

                // What to do BEFORE each render tick.
                this.scene.registerBeforeRender(() => this.update());

                // Ready
                this.engine.runRenderLoop(() => this.scene.render());

            })
            .catch(err => {
                console.error(err);
            })
    }

    input() {

        if (this.inputMap[' ']) { // Spacebar
            if (!this.ballHasBeenShot) {
                this.ballHasBeenShot = true;
                this.ball.speedY = this.ball.maxSpeed;
                this.ball.speedX = this.ball.maxSpeed;
            }
        } else if (this.inputMap['ArrowLeft'] || this.inputMap['a']) {
            this._moveLeft();
        } else if (this.inputMap['ArrowRight'] || this.inputMap['d']) {
            this._moveRight();
        } else {
            this._moveStop();
        }

    }

    _moveStop() {
        if (!this.ballHasBeenShot) {
            this.ball.speedX = 0;
        }
        this.player.speedX = 0;
    }

    _moveLeft() {
        if (!this.ballHasBeenShot) {
            this.ball.speedX = this.player.maxSpeed * -1;
        }
        this.player.speedX = this.player.maxSpeed;
    }

    _moveRight() {
        if (!this.ballHasBeenShot) {
            this.ball.speedX = this.player.maxSpeed;
        }
        this.player.speedX = this.player.maxSpeed * -1;
    }

    update() {

        if (!this.ballHasBeenShot) {

            // Stops if the player hits the right wall.
            if (this.player.meshNode.position.x < this.cave.getMinimumPosX() + this.player.getWidth()) {
                this.ball.speedX = 0;
                this.ball.mesh.position.x = (this.cave.getMinimumPosX() + this.player.getWidth()) * -1;
            } else if (this.player.meshNode.position.x > this.cave.getMaximumPosX() - this.player.getWidth()) {
                this.ball.speedX = 0;
                this.ball.mesh.position.x = (this.cave.getMaximumPosX() - this.player.getWidth()) * -1;
            }

            // Ball should move with the player.
            this.ball.mesh.position.x += this.ball.speedX;

        } else {

            // Ball should bounce on walls.

            if (this.ball.getMaximumPosX() >= this.cave.getMaximumPosX()) {
                this.ball.speedX = this.ball.maxSpeed * -1;
            } else if (this.ball.getMinimumPosX() <= this.cave.getMinimumPosX()) {
                this.ball.speedX = this.ball.maxSpeed;
            } else if (this.ball.getMaximumPosY() >= this.cave.getMaximumPosY()) {
                this.ball.speedY = this.ball.maxSpeed * -1;
            }

            // Hits the floor
            if (this.ball.getMinimumPosY() <= this.cave.getMinimumPosY()) {
                this.ball.speedY = 0;
                this.ball.speedX = 0;
            }

            // Bounce on the paddle.
            if (this.ball.mesh.intersectsMesh(this.player._getPaddleMesh(), false)) {
                this.ball.speedY = this.ball.maxSpeed;
            }

            this.ball.mesh.position.y += this.ball.speedY;
            this.ball.mesh.position.x += this.ball.speedX;

        }

        // Stops if the player hits the right wall.
        if (this.player.meshNode.position.x < this.cave.getMinimumPosX() + this.player.getWidth()) {
            this._moveStop();
            this.player.meshNode.position.x = this.cave.getMinimumPosX() + this.player.getWidth();
        }
        // Stops if the player hits the left wall.
        else if (this.player.meshNode.position.x > this.cave.getMaximumPosX() - this.player.getWidth()) {
            this._moveStop();
            this.player.meshNode.position.x = this.cave.getMaximumPosX() - this.player.getWidth();
        }

        this.player.meshNode.position.x += this.player.speedX;

    }

    async initGameScene() {

        this._initScene();

        this._initCamera();

        this._initLight();

        this._initSkybox();

        await this._initMeshesAsync();

    }

    async _initMeshesAsync() {

        const loaderResult = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            'models/',
            'PenguinBreakerGameScene.glb',
        );

        this.player.setMeshNode(new BABYLON.TransformNode("Player", this.scene));
        this.cave.setMeshNode(new BABYLON.TransformNode("Cave", this.scene));

        loaderResult.meshes.forEach(mesh => {
            console.log(mesh.name);
            switch (mesh.name) {
                case 'Ball':
                    this.ball.setMesh(mesh);
                    break;
                case 'Paddle':
                case 'pinguin_002.001':
                    mesh.parent = this.player.meshNode;
                    break;
                case 'LeftWall':
                case 'Roof':
                case 'Floor':
                case 'RightWall':
                    mesh.parent = this.cave.meshNode;
                    break;
                default:
                    break;
            }
        });

    }

    _initSkybox() {
        this.skybox = BABYLON.MeshBuilder.CreateBox("sky", { size: 150.0 }, this.scene);
        const material = new BABYLON.StandardMaterial("sky", this.scene);
        material.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", this.scene);
        material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        material.backFaceCulling = false;
        material.disableLighting = true;
        this.skybox.material = material;
        this.skybox.infiniteDistance = true;
    }

    _initScene() {
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.actionManager = new BABYLON.ActionManager(this.scene);
        // Register inputs.
        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (ev) => {
            this.inputMap[ev.sourceEvent.key] = ev.sourceEvent.type === "keydown";
        }));
        this.scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (ev) => {
            this.inputMap[ev.sourceEvent.key] = ev.sourceEvent.type === "keydown";
        }));
    }

    _initLight() {
        this.light = new BABYLON.HemisphericLight(
            'light',
            new BABYLON.Vector3(-5,50, 15),
            this.scene
        );
        this.light.intensity = 1.0;
    }

    _initCamera() {
        this.camera = new BABYLON.ArcRotateCamera(
            "camera",
            Math.PI / 2,
            Math.PI / 2,
            40,
            new BABYLON.Vector3(
                0,
                10.5,
                0
            )
        );
        this.camera.fov = 0.5;
    }

    _setCanvasSize() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetWidth / (16/9);
    }

    /** @param ev { UIEvent } */
    _onResize(ev) {
        this._setCanvasSize();
        this.engine.resize();
    }

}

export { Game };
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
import '../models/PlayerModel.glb';

class Game {

    /** @type HTMLCanvasElement */
    canvas = null;

    /** @param canvas { HTMLCanvasElement } */
    constructor(canvas) {

        // Init canvas.
        // The size of the canvas will change when the user
        // changes the browser size.
        this.canvas = canvas;
        this._setCanvasSize();
        window.onresize = (ev) => this._setCanvasSize();

    }

    _setCanvasSize() {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetWidth / (16/9);
    }

}

export { Game };
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';


class Input {

    /** @type BABYLON.Scene */
    _scene = null;

    inputMap = [];

    /** @param scene { BABYLON.Scene } */
    constructor(scene) {

        this._scene = scene;

        scene.actionManager = new BABYLON.ActionManager(scene);

        this.inputMap = {};
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type === "keydown";
        }));

        scene.onBeforeRenderObservable.add(() => {
            this._updateFromKeyboard();
        });

    }

    _updateFromKeyboard() {}

}

export { Input }
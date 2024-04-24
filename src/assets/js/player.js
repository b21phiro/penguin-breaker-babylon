class Player {

    /** @type BABYLON.AbstractMesh[] */
    _mesh = null;

    /** @type Movement */
    _movement = null;

    /** @type { BABYLON.Scene } */
    _scene = null;

    _speed = 0.1;
    _currentSpeed = 0;

    /**
     * @param scene { BABYLON.Scene }
     * @param movement { Movement }
     */
    constructor(scene, movement) {
        this._scene = scene;
        this._movement = movement;
        this._scene.registerBeforeRender(() => {
            this._updateFromInput();
        });
    }

    async _initMeshAsync() {
        const result = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            'models/',
            'PlayerModel.glb',
            this._scene
        );
        this._mesh = result.meshes;
    }

    _updateFromInput() {
        if (this._mesh[0].position.x < this._getMinPositionX()) {
            this._currentSpeed = 0;
            this._mesh[0].position.x = this._getMinPositionX();
        } else if (this._mesh[0].position.x > this._getMaxPositionX()) {
            this._currentSpeed = 0;
            this._mesh[0].position.x = this._getMaxPositionX();
        } else {
            this._currentSpeed = this._speed * this._movement._direction;
        }
        this._mesh[0].position.x += this._currentSpeed;
    }

    _getMinPositionX() {
        return this._scene.getMeshByName('BottomWall').getBoundingInfo().boundingBox.minimum.x
            + this._mesh[2].getBoundingInfo().maximum.x;
    }

    _getMaxPositionX() {
        return this._scene.getMeshByName('BottomWall').getBoundingInfo().boundingBox.maximum.x
            - this._mesh[2].getBoundingInfo().maximum.x;
    }

}

export { Player }
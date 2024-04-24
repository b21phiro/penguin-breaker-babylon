class Player {

    /** @type BABYLON.AbstractMesh[] */
    _mesh = null;

    constructor() {
    }

    async initPlayerMeshAsync(scene) {
        const result = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            'models/',
            'PlayerModel.glb',
            scene
        );
        this._mesh = result.meshes;
    }

}

export { Player }
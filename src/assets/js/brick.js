class Brick {

    row = 0;

    column = 0;

    /** @type BABYLON.Scene */
    scene = null;

    /** @type BABYLON.Mesh */
    mesh = null;

    /**
     * @param row { number }
     * @param column { number }
     * @param scene { BABYLON.Scene }
     */
    constructor(row, column, scene) {
        this.row = row;
        this.column = column;
        this.scene = scene;
    }

    /**
     * @param rows { number }
     * @param columns { number }
     */
    initMesh(rows, columns) {

        const width = this._getMaxWidth() / columns;
        const height = 1;

        const minPositionX = this._getMinPositionX() - (width / 2);

        this.mesh = new BABYLON.CreateBox(
            `Brick_${this.row}_${this.column}`,
            {
                size: 1,
                width,
                height
            },
            this.scene
        );

        let color;

        if ((this.row % 2 === 0 && this.column % 2 === 0) || (this.row % 2 !== 0 && this.column % 2 !== 0)) {
            color = new BABYLON.Color4.FromHexString('#8af1ff');
        } else {
            color = new BABYLON.Color4.FromHexString('#ffffff');
        }

        const material = new BABYLON.StandardMaterial("BrickMaterial", this.scene);
        material.diffuseColor = color;
        this.mesh.material = material;

        this.mesh.position.x = minPositionX - (width * this.column);
        this.mesh.position.y = 17 - (height * this.row);
    }

    _getMinPositionX() {
        return this.scene.getMeshByName('RightWall').getBoundingInfo().minimum.x;
    }

    _getMaxWidth() {
        return this.scene.getMeshByName('Floor').getBoundingInfo().maximum.x - this.scene.getMeshByName('Floor').getBoundingInfo().minimum.x;
    }

}

export { Brick }
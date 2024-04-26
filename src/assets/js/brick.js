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
        const width = this._width(columns);
        const height = 1;
        this.mesh = new BABYLON.CreateBox(
            `Brick_${this.row}_${this.column}`,
            {
                size: 1,
                width,
                height
            },
            this.scene
        );

        const color = (this.column % 2 === 0)
            ? new BABYLON.Color3.FromHexString('#ff0000')
            : new BABYLON.Color3.FromHexString('#00ff00');
        const material = new BABYLON.StandardMaterial("BrickMaterial", this.scene);
        material.diffuseColor = color;
        this.mesh.material = material;

        this.mesh.position.x = 10 - width;
        this.mesh.position.y = 18 - ((height + 0.1) * this.row);
    }

    _width(columns) {
        let width = 0;
        if (columns === 0) {
            width = 0;
        } else {
            width = ((this.scene.getMeshByName('Floor').getBoundingInfo().boundingBox.maximum.x - this.scene.getMeshByName('Floor').getBoundingInfo().boundingBox.minimum.x) / columns);
        }
        return width;
    }

}

export { Brick }
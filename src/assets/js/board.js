class Board {

    /** @type { BABYLON.TransformNode } */
    _root = null;

    /**
     * @param scene { BABYLON.Scene }
     */
    initBoardMeshes(scene) {

        const root = new BABYLON.TransformNode('Board', scene);

        const wallWidth = 1;
        const wallHeight = 10;

        let leftWall,
            topWall,
            rightWall,
            bottomWall;

        leftWall = BABYLON.MeshBuilder.CreateBox("LeftWall", {
            size: 1,
            height: wallHeight,
            width: 20
        });
        leftWall.position = new BABYLON.Vector3(
            -15,
            (wallHeight / 2) - (wallWidth / 2),
            0
        );

        topWall = BABYLON.MeshBuilder.CreateBox("TopWall", {
            size: 1,
            height: wallWidth,
            width: wallHeight
        });
        topWall.position = new BABYLON.Vector3(
            0,
            wallHeight - wallWidth,
            0
        );

        rightWall = BABYLON.MeshBuilder.CreateBox("RightWall", {
            size: 1,
            height: wallHeight,
            width: 20
        });
        rightWall.position = new BABYLON.Vector3(
            15,
            (wallHeight / 2) - (wallWidth / 2),
            0
        );

        bottomWall = BABYLON.MeshBuilder.CreateBox("BottomWall", {
            size: 1,
            height: wallWidth,
            width: wallHeight
        });
        bottomWall.position = BABYLON.Vector3.Zero();

        topWall.parent = root;
        bottomWall.parent = root;
        rightWall.parent = root;
        leftWall.parent = root;

        this._root = root;

    }

    getFloor() {
        return this._root.getChildMeshes().find(_mesh => _mesh.name === 'BottomWall');
    }

    getFloorPositionY() {
        return this.getFloor()._boundingInfo.boundingBox.maximum.y;
    }

}

export { Board };
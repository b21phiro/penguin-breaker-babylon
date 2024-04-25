class Cave {

    /** @type module:babylonjs/Meshes/transformNode.TransformNode */
    meshNode = null;

    /**
     * @param meshNode {module:babylonjs/Meshes/transformNode.TransformNode}
     */
    setMeshNode(meshNode) {
        this.meshNode = meshNode;
    }

    getMinimumPosX() {
        return this._getFloor().getBoundingInfo().boundingBox.minimum.x;
    }

    getMaximumPosX() {
        return this._getFloor().getBoundingInfo().boundingBox.maximum.x;
    }

    getMinimumPosY() {
        return this._getFloor().getBoundingInfo().boundingBox.maximum.y;
    }

    getMaximumPosY() {
        return this._getRoof().getBoundingInfo().boundingBox.minimum.y;
    }

    _getFloor() {
        return this.meshNode.getChildMeshes().find(mesh => mesh.name === 'Floor');
    }

    _getRoof() {
        return this.meshNode.getChildMeshes().find(mesh => mesh.name === 'Roof');
    }

}

export { Cave }
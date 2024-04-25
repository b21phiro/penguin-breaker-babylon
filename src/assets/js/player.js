class Player {

    /** @type module:babylonjs/Meshes/transformNode.TransformNode */
    meshNode = null;

    maxSpeed = 0.1;
    speedX = 0;

    /**
     * @param meshNode {module:babylonjs/Meshes/transformNode.TransformNode}
     */
    setMeshNode(meshNode) {
        this.meshNode = meshNode;
        console.log(this.meshNode);
    }
    getWidth() {
        return this._getPaddleMesh().getBoundingInfo().boundingBox.maximum.x;
    }

    _getPaddleMesh() {
        return this.meshNode.getChildMeshes().find(mesh => mesh.name === 'Paddle');
    }

}

export { Player }
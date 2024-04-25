class Ball {

    /** @type Mesh */
    mesh = null;

    maxSpeed = 0.1;
    speedX = this.maxSpeed;
    speedY = this.maxSpeed;

    /** @param mesh {Mesh} */
    setMesh(mesh) {
        this.mesh = mesh;
    }

    getMaximumPosX() {
        return this.mesh.getBoundingInfo().boundingBox.maximum.x + this.mesh.position.x;
    }

    getMinimumPosX() {
        return this.mesh.getBoundingInfo().boundingBox.minimum.x + this.mesh.position.x
    }

    getMinimumPosY() {
        return this.mesh.getBoundingInfo().boundingBox.minimum.y + this.mesh.position.y
    }

    getMaximumPosY() {
        return this.mesh.getBoundingInfo().boundingBox.maximum.y + this.mesh.position.y;
    }

}

export { Ball }
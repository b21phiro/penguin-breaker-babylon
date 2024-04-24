import {Movement} from "./movement";

class CanMove extends Movement {

    moveLeft() {
        this._direction = -1;
    }

    moveRight() {
        this._direction = 1;
    }

    stop() {
        this._direction = 0;
    }

}

export { CanMove }
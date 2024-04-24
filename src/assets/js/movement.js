import {Input} from "./input";

class Movement extends Input {

    _direction = 0;

    _updateFromKeyboard() {
        if (this.inputMap['ArrowLeft'] || this.inputMap['a']) {
            this.moveLeft();
        } else if (this.inputMap['ArrowRight'] || this.inputMap['d']) {
            this.moveRight();
        } else {
            this.stop();
        }
    }

    moveLeft() {}

    moveRight() {}

    stop() {}

}

export { Movement };
import {Movement} from "./movement";

class CanNotMove extends Movement {

    moveLeft() {
        console.log("Can not move!");
    }

    moveRight() {
        console.log("Can not move!");
    }

}

export { CanNotMove }
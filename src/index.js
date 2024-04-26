import './main.css';
import { Game } from "./assets/js/game";

window.onload = async (ev) => {

    const game = new Game(
        document.getElementById('canvas')
    );

    game.play();

    game.showFps();
    game.showMs();

};
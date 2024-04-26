class Health {

    /** @type HTMLElement */
    display = null;

    _maxAmountOfHearts = 3;
    hearts = this._maxAmountOfHearts;

    constructor() {
        this.display = document.getElementById('healthDisplay');
        this.render();
    }

    subtract() {
        this.hearts -= 1;
        this.render();
    }

    render() {

        const hearts = [];

        // Clear list.
        while (this.display.firstChild) {
            this.display.removeChild(this.display.lastChild);
        }

        // Renders the hearts that the player has remaining.
        for (let i = 0; i < this._maxAmountOfHearts; i++) {
            if (i < this.hearts) {
                hearts.push(this._createHeartSvgString(false));
            } else {
                hearts.push(this._createHeartSvgString(true));
            }
        }

        // Render hearts.
        hearts.forEach(svg => {
            this.display.insertAdjacentHTML('beforeend', svg);
        });

    }

    _createHeartSvgString(isBroken = false) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="feather feather-heart ${(isBroken) ? "is-broken" : ""}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    }

}

export { Health }
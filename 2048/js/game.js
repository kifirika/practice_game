let createAndAppend = function ({className, parentElement, value}, tag = 'div') {
    let element = document.createElement(tag);
    element.className = className;
    if (value) {
        element.innerHTML = value;
    }
    parentElement.appendChild(element);
    return element;
}

class Game {
    constructor(parentElement, size = 4) {

        // Создание структуры игрового поля
        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        let headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        this.rating = 0;
        headerElement.innerHTML = 'Rating: ' + this.rating;

        // Создание поля ячеек

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {

                let cellElement = createAndAppend({
                    className: 'cell',
                    parentElement: fieldElement
                });

                if (Math.random() > 0.8) {
                    cellElement.innerHTML = Math.random() > 0.5 ? 4 : 2;
                }
            }
        }
    }
}
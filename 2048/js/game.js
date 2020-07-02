class Game {
    constructor(parentElement, size = 4) {
        this.size = size;
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

        this.field = [];
        for (let i = 0; i < size; i++) {
            this.field[i] = []
            for (let j = 0; j < size; j++) {
                this.field[i][j] = new Cell(fieldElement);
            }
        }

        // this.fieldElement.onkeyup
        console.log(this.field);
    }
    spawnUnit() {
        let emptyCells = [];
        for (let i = 0; i < this.field.length; i++) {
            for(let j = 0; j < this.field[i].length; j++) {
                if (!this.field[i][j].value) {
                    emptyCells.push(this.field[i][j])
                }
            }
        }
        if (emptyCells.length) {
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
        } else {
            alert('Lose');
        }


    }
    moveRight() {
        let hasMoved = false;
        for (let i = 0; i < this.field.length; i++) {
            for(let j = this.field[i].length - 2; j >= 0; j--) {

                if (this.field[i].isEmpty) {
                    continue;
                }

                let nextCellKey = j + 1;

                while (nextCellKey < this.size) {
                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || (nextCellKey == (this.size - 1))) {
                        this.field[i][nextCellKey].merge(this.field[i][j]);
                        hasMoved = true;
                        break;
                    }
                    nextCellKey++;
                    nextCell = this.field[i][nextCellKey];
                }
            }
        }
        if (hasMoved) {
            this.spawnUnit();
        }
    }
}

class Game {
    constructor(parentElement, size = 4) {
        this.fieldSize = 80;
        this.size = size;
        this.cellSize = ((this.fieldSize / this.size) - 2);
        // Создание структуры игрового поля
        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        this.headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        this.ratingElement = createAndAppend({
            className: 'rating',
            parentElement: this.headerElement
        });
        this.rating = 0;

        // Создание поля ячеек

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        this.field = [];
        for (let i = 0; i < size; i++) {
            this.field[i] = []
            for (let j = 0; j < size; j++) {
                this.field[i][j] = new Cell(fieldElement, this);
            }
        }
        //
        window.addEventListener('keyup', function(e) {
            switch (e.keyCode) {
                case 38:
                    this.moveUp();
                    break;
                case 40:
                    this.moveDown();
                    break;
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight();
                    break;
            }
        }.bind(this));

    }
    set rating(value) {
        this._rating = value;
        this.headerElement.innerHTML = 'Счет: ' + value;
    }

    get rating() {
        return this._rating;
    }

    addRating(value) {
        this.rating += value;
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
        for (let i = 0; i < this.size; i++) {
            for (let k = this.size - 2; k >= 0; k--) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = k + 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != k) {
                            this.field[i][nextCellKey - 1].merge(currentCell);
                            hasMoved = true;
                        }

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

    isLastKey(key) {
        return key == (this.size - 1);
    }

    isFirstKey(key) {
        return key == 0;
    }

    // Логика перемещения значений

    moveLeft() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let k = 1; k < this.size; k++) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = k - 1;
                while (nextCellKey >= 0) {
                    let nextCell = this.field[i][nextCellKey];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != k) {
                            this.field[i][nextCellKey + 1].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey--;
                    nextCell = this.field[i][nextCellKey];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }


    moveDown() {
        let hasMoved = false;
        for (let k = 0; k < this.size; k++) {
            for (let i = this.size - 2; i >= 0; i--) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i + 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[nextCellKey][k];
                    if (!nextCell.isEmpty || this.isLastKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[nextCellKey][k].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey - 1 != i) {
                            this.field[nextCellKey - 1][k].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey++;
                    nextCell = this.field[nextCellKey][k];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }

    moveUp() {
        let hasMoved = false;
        for (let k = 0; k < this.size; k++) {
            for (let i = 1; i < this.size; i++) {
                let currentCell = this.field[i][k];
                if (currentCell.isEmpty) {
                    continue;
                }

                let nextCellKey = i - 1;
                while (nextCellKey < this.size) {

                    let nextCell = this.field[nextCellKey][k];
                    if (!nextCell.isEmpty || this.isFirstKey(nextCellKey)) {
                        if ((nextCell.isEmpty && this.isFirstKey(nextCellKey)) // last cell with no value
                            || nextCell.isSameTo(currentCell)) {
                            this.field[nextCellKey][k].merge(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty && nextCellKey + 1 != i) {
                            this.field[nextCellKey + 1][k].merge(currentCell);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellKey--;
                    nextCell = this.field[nextCellKey][k];
                }
            }
        }

        if (hasMoved) {
            this.spawnUnit();
        }
    }
}


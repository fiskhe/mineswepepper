console.log('script loaded');

var game = {
    container: null,
    grid: [],
    bombs: 99,
    rows: 16,
    cols: 30
}

function main(row, col) {
    console.log('main called');
    var container = document.createElement('div');
    container.id = 'container';
    for(i = 0; i < row; i++) {
        var row_div = document.createElement('div');
        row_div.className = 'row';
        for(j = 0; j < col; j++) {
            var square = document.createElement('div');
            square.className = 'square';
            row_div.appendChild(square);
        }
        container.appendChild(row_div);
    }

    game.container = container;
    document.body.appendChild(container);
    console.log('container appended');

    var grid_row = [];
    for(j = 0; j < col; j++) {
        grid_row.push(0);
    }

    for(i = 0; i < row; i++) {
        game.grid.push(grid_row);
        grid_row = grid_row.slice();
    }

    alert(JSON.stringify(game.grid));
    generate(game.bombs);
} 

//Generates the number of bombs given on the minesweeper grid
//Currently generates randomly
function generate(bombs) {
    
    // Putting the data into the BTS
    for(i = 0; i < bombs; i++) {

        var row_index = Math.floor(Math.random() * game.rows);
        var col_index = Math.floor(Math.random() * game.cols);

        if(game.grid[row_index][col_index] !== -1) { 
            game.grid[row_index][col_index] = -1;
        } else {
            i = i - 1;
        }
    }
    
    //Testing to make sure there are the right number of bombs
    counter = 0;
    for(i = 0; i < game.rows; i++) {
        for(j = 0; j < game.cols; j++) {
            if(game.grid[i][j] === -1) {
                counter++;
            }
        }
    }
    console.log(counter);
    alert(counter);
    
    // Putting the data into the DOM
    for(i = 0; i < game.rows; i++) {
        var row_nl = game.container.children[i].children;
        for(j = 0; j < game.cols; j++) {
            if(game.grid[i][j] == -1) {
                row_nl[j].innerHTML = '-1';
            }
        }
    }
}

// Is not recursive. Only copies 2D arrays.
function deepCopy(arr) {
}

window.onload = main.bind(null, game.rows, game.cols);






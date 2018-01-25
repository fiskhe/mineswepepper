console.log('script loaded');

var game = {
    container: null,
    grid: [],
    bombs: 99,
    rows: 16,
    cols: 30
}

window.onload = main.bind(null, game.rows, game.cols);

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

    generateBombs(game.bombs);
    generateNums();

    updateDOM();
} 

//Generates the number of bombs given on the minesweeper grid
//Currently generates randomly
function generateBombs(bombs) {
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
    console.log('counter', counter);
}

function generateNums() {
    var temp_grid = deepCopy(game.grid); 
    for(i = 0; i < game.rows; i++) {
	for(j = 0; j < game.cols; j++) {
	     
	    // For every square in the grid, do the below...
	    if(temp_grid[i][j] === 0) {
		var num_bombs = 0;

		// Goes through the adjacent squares to check for bombs!
		// First rows
		for(r = 0; r < 3; r++) {
		    // Then columns
		    for(c = 0; c < 3; c++) {
			// To stop from accessing row -1 and rows past the actual number of rows.
			if(r == 0 && i == 0 || r == 2 && i == game.rows-1)
			    break;

			// Has a precaution to stop from accessing undefined columns.
			if (temp_grid[i - 1 + r][j - 1 + c] === -1 && j > 0 && j < game.cols-1) {
			    num_bombs++;
			}
		    }
		}

		game.grid[i][j] = num_bombs;
	    }
	}
    }
    
    alert(game.grid);
}

// Putting the data into the DOM
function updateDOM() {
    for(i = 0; i < game.rows; i++) {
        var row_nl = game.container.children[i].children;

        for(j = 0; j < game.cols; j++) {
	    var square_val = game.grid[i][j];
            if(square_val !== 0) {
		row_nl[j].classList.add(toWord(square_val));
                row_nl[j].innerHTML = square_val;
            }
        }
    }
}


// Is not recursive. Only copies 2D arrays.
function deepCopy(arr) {
    var new_arr = [];
    for(i = 0; i < arr.length; i++) {
	var new_sub = arr[i].slice();
	new_arr.push(new_sub);
    }

    console.log(new_arr);
    return new_arr;
}

// Takes a number and returns a word string
function toWord(num) {
    switch (num) {
	case 1:
	    return 'one';
	case 2:
	    return 'two';
	case 3:
	    return 'three';
	case 4:
	    return 'four';
	case 5:
	    return 'five';
	case 6:
	    return 'six';
	case 7:
	    return 'seven';
	case 8:
	    return 'eight';
	case -1:
	    return 'bomb';
	default:
	    return;
    }
}






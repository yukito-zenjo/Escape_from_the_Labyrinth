document.addEventListener('DOMContentLoaded', (event) => {
    const maze = document.getElementById('maze');
    let currentPos = { row: 0, col: 0 };
    let hasKey = false;

    const mazeLayout = [
        /* 14x24 grid layout with 'S' for start, 'E' for end, 'K' for key, 'W' for wall, and '.' for empty space */
        'S.....W.....W...W.W.....',
        '.W.W.W...W.W.W.W....W..W',
        '..W.....W.......W..W.W..',
        'WW.W.W.W.W.WW..W..W..WW.',
        '...W..W....W....W..W..W.',
        '.W.W.W...W...WW..W..W.W.',
        'W.......W..W....WE.W....',
        '.WW..W.W.W.W.W.W.WW..W.W',
        '..KWW...W......W...W....',
        '.WW..W.W.W.WWW.W.W....WW',
        '....W.W.......W...WW.W..',
        '.W.W...WWW.W.W.WW..W..W.',
        '..W..W....W....W..W...W.',
        'W...W..W....W.......W...'
    ];

    // Build the maze layout
    for (let row = 0; row < 14; row++) {
        for (let col = 0; col < 24; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'hidden'); // Add 'hidden' class to all cells initially
            if (mazeLayout[row][col] === 'W') {
                cell.classList.add('wall');
            } else if (mazeLayout[row][col] === 'S') {
                cell.id = 'start';
            } else if (mazeLayout[row][col] === 'E') {
                cell.id = 'end';
            } else if (mazeLayout[row][col] === 'K') {
                cell.id = 'key';
            }
            maze.appendChild(cell);
        }
    }

    document.addEventListener('keydown', (e) => {
        let newRow = currentPos.row;
        let newCol = currentPos.col;

        switch (e.key) {
            case 'ArrowUp':
                newRow--;
                break;
            case 'ArrowDown':
                newRow++;
                break;
            case 'ArrowLeft':
                newCol--;
                break;
            case 'ArrowRight':
                newCol++;
                break;
        }

        if (isValidMove(newRow, newCol)) {
            movePlayer(newRow, newCol);
            updateVisibility(newRow, newCol); // Update visibility after moving
        }

        const currentCell = maze.children[newRow * 24 + newCol];
        if (currentCell.id === 'key') {
            hasKey = true;
            currentCell.id = ''; // Remove the key visual
            alert('鍵を手に入れた！');
        }

        if (currentCell.id === 'end') {
            if (hasKey) {
                window.location.href = 'ending.html'; // Redirect to ending page
            } else {
                alert('出口の扉には鍵がかかっている。');
            }
        }
    });

    function isValidMove(row, col) {
        return row >= 0 && row < 14 && col >= 0 && col < 24 && !maze.children[row * 24 + col].classList.contains('wall');
    }

    function movePlayer(row, col) {
        maze.children[currentPos.row * 24 + currentPos.col].classList.remove('player');
        currentPos = { row, col };
        maze.children[row * 24 + col].classList.add('player');
    }

    function updateVisibility(row, col) {
        // Hide all cells first
        for (let i = 0; i < maze.children.length; i++) {
            maze.children[i].classList.add('hidden');
        }

        // Show cells within the 5x5 area centered on the player
        for (let r = row - 2; r <= row + 2; r++) {
            for (let c = col - 2; c <= col + 2; c++) {
                if (r >= 0 && r < 14 && c >= 0 && c < 24) {
                    maze.children[r * 24 + c].classList.remove('hidden');
                }
            }
        }
    }

    // Initial player placement and visibility update
    maze.children[0].classList.add('player');
    updateVisibility(0, 0);
});

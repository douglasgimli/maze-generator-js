const Cell = {
  row: 0,
  column: 0,
  visited: false,
  corridors: []
}

const createMaze = (width, height) => {
  let maze = [];
  
  for (let x = 0 ; x < height ; x++) {
    maze[x] = [];
    for (let y = 0 ; y < width ; y++) {
      maze[x][y] = Object.create(Cell);
      maze[x][y].row = x;
      maze[x][y].column = y;
      maze[x][y].corridors = [];
    }
  }
  
  let currentCell = maze[0][0];
  
  maze_loop:
  while (true) {
    currentCell.visited = true;
    
    const currentRow = currentCell.row;
    const currentColumn = currentCell.column;
    
    let availableNeighbours = [];
    
    if (currentColumn > 0 && !maze[currentRow][currentColumn-1].visited) {
      availableNeighbours.push(maze[currentRow][currentColumn-1]);
    }
    if (currentRow > 0 && !maze[currentRow-1][currentColumn].visited) {
      availableNeighbours.push(maze[currentRow-1][currentColumn]);
    }
    if (currentColumn < width-1 && !maze[currentRow][currentColumn+1].visited) {
      availableNeighbours.push(maze[currentRow][currentColumn+1]);
    }
    if (currentRow < height-1 && !maze[currentRow+1][currentColumn].visited) {
      availableNeighbours.push(maze[currentRow+1][currentColumn]);
    }
    
    if (availableNeighbours.length) {
      const nextCell = availableNeighbours[parseInt(Math.random()*availableNeighbours.length)];
      currentCell.corridors.push(nextCell);
      currentCell = nextCell;
    }
    else {
      let nextCell = false;
      row_loop:
      for(let x = 0 ; x < width ; x++) {
        for(let y = 0 ; y < height ; y++) {
          if (!maze[x][y].visited) {
            let unavailableNeighbours = [];

            if (y > 0 && maze[x][y-1].visited) {
              unavailableNeighbours.push(maze[x][y-1]);
            }
            if (x > 0 && maze[x-1][y].visited) {
              unavailableNeighbours.push(maze[x-1][y]);
            }
            if (y < width-1 && maze[x][y+1].visited) {
              unavailableNeighbours.push(maze[x][y+1]);
            }
            if (x < height-1 && maze[x+1][y].visited) {
              unavailableNeighbours.push(maze[x+1][y]);
            }
    
            if (unavailableNeighbours.length) {
              const openCorridorToCell = unavailableNeighbours[parseInt(Math.random()*unavailableNeighbours.length)];
              maze[x][y].corridors.push(openCorridorToCell);
            }
            
            nextCell = maze[x][y];
            break row_loop;
          }
        }
      }
      if (nextCell) {
        currentCell = nextCell;
      }
      else {
        break maze_loop; 
      }
    }
  }
  return maze;
}

const createMap = maze => {
  let map = new Array(maze.length*2+1);
  map.fill('#', 0, maze.length*2+1);
  
  for (let i = 0 ; i < map.length ; i++) {
    map[i] = new Array(maze.length*2+1);
    map[i].fill('#', 0, maze.length*2+1);
  }
 
  for (let x = 0 ; x < maze.length ; x++) {
    for (var y = 0 ; y < maze[x].length ; y++) {
      if (maze[x][y].visited) {
        map[x*2+1][y*2+1] = '.';
        maze[x][y].corridors.forEach(neighbour => {
          if (neighbour.row > maze[x][y].row) {
            map[x*2+2][y*2+1] = '.';
          }
          else if (neighbour.row < maze[x][y].row) {
            map[x*2][y*2+1] = '.';
          }
          else if (neighbour.column > maze[x][y].column) {
            map[x*2+1][y*2+2] = '.';
          }
          else if (neighbour.column < maze[x][y].column) {
            map[x*2+1][y*2] = '.';
          }
        });
      }
    }
  }
  return map;
}

var maze = createMaze(5, 5);
var map = createMap(maze);
console.log(map.join('\n'));
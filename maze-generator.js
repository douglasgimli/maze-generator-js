// Given an maze array and one specific cell find any not visited near cells
function findNeighbourAvailableNeighbour(maze, cell, emptyNeighbours = false) {
  let availableNeighbours = [];

  if (
    cell.column > 0 &&
    maze[cell.line][cell.column - 1].visited == emptyNeighbours
  ) {
    availableNeighbours.push(maze[cell.line][cell.column - 1]);
  }
  if (
    cell.line > 0 &&
    maze[cell.line - 1][cell.column].visited == emptyNeighbours
  ) {
    availableNeighbours.push(maze[cell.line - 1][cell.column]);
  }
  if (
    cell.column < maze.length - 1 &&
    maze[cell.line][cell.column + 1].visited == emptyNeighbours
  ) {
    availableNeighbours.push(maze[cell.line][cell.column + 1]);
  }
  if (
    cell.line < maze.length - 1 &&
    maze[cell.line + 1][cell.column].visited == emptyNeighbours
  ) {
    availableNeighbours.push(maze[cell.line + 1][cell.column]);
  }

  if (availableNeighbours.length > 0) {
    const nextCell =
      availableNeighbours[parseInt(Math.random() * availableNeighbours.length)];
    return nextCell;
  }

  return false;
}

// Given a maze and a position itinerate creating connections until there's no more available positions
function createConnectionsBetweenEmptyCells(maze, line = 0, column = 0) {
  const cell = maze[line][column];
  cell.visited = true;

  const nextCell = findNeighbourAvailableNeighbour(maze, cell);
  if (nextCell) {
    cell.corridors.push(nextCell);
    createConnectionsBetweenEmptyCells(maze, nextCell.line, nextCell.column);
    return;
  }
  findAndConnectEmptyCells(maze);
}

// Given a maze find empty cells and connect with a near available cell
function findAndConnectEmptyCells(maze, line = 0, column = 0) {
  if (line >= maze.length - 1 && column >= maze.length - 1) {
    return;
  }

  const cell = maze[line][column];
  if (cell.visited) {
    if (column >= maze.length - 1) {
      findAndConnectEmptyCells(maze, line + 1, 0);
      return;
    }
    findAndConnectEmptyCells(maze, line, column + 1);
    return;
  }

  const nextCell = findNeighbourAvailableNeighbour(maze, cell, true);
  if (nextCell) {
    cell.corridors.push(nextCell);
    createConnectionsBetweenEmptyCells(maze, nextCell.line, nextCell.column);
  }
}

// Given a square dimension create a random maze with the hunt and kill algorithm
function createMaze(width, height) {
  // Create a multidimensional array with objects representing each square of the maze
  const maze = Array.from(Array(width)).map((line, lineIndex) =>
    Array.from(Array(height)).map((column, columnIndex) => ({
      line: lineIndex,
      column: columnIndex,
      visited: false,
      corridors: [],
    }))
  );
  createConnectionsBetweenEmptyCells(maze);
  return maze;
}

const createMap = (maze) => {
  let map = new Array(maze.length * 2 + 1);
  map.fill("#", 0, maze.length * 2 + 1);

  for (let i = 0; i < map.length; i++) {
    map[i] = new Array(maze.length * 2 + 1);
    map[i].fill("#", 0, maze.length * 2 + 1);
  }

  for (let x = 0; x < maze.length; x++) {
    for (var y = 0; y < maze[x].length; y++) {
      if (maze[x][y].visited) {
        map[x * 2 + 1][y * 2 + 1] = ".";
        maze[x][y].corridors.forEach((neighbour) => {
          if (neighbour.line > maze[x][y].line) {
            map[x * 2 + 2][y * 2 + 1] = ".";
          } else if (neighbour.line < maze[x][y].line) {
            map[x * 2][y * 2 + 1] = ".";
          } else if (neighbour.column > maze[x][y].column) {
            map[x * 2 + 1][y * 2 + 2] = ".";
          } else if (neighbour.column < maze[x][y].column) {
            map[x * 2 + 1][y * 2] = ".";
          }
        });
      }
    }
  }
  return map;
};

var maze = createMaze(5, 5);
var map = createMap(maze);
console.log(map.join("\n"));

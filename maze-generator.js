// Given an maze array and one specific cell find any not visited near cells
function findRandomNeighbour(maze, cell, checkForVisitedNeighbours = false) {
  const possibleMoviments = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  const availableNeighbours = possibleMoviments.reduce(
    (validNeighbours, position, index) =>
      maze[cell.line + position[0]] !== undefined &&
      maze[cell.line + position[0]][cell.column + position[1]] !== undefined &&
      maze[cell.line + position[0]][cell.column + position[1]].visited ==
        checkForVisitedNeighbours
        ? validNeighbours.concat(
            maze[cell.line + position[0]][cell.column + position[1]]
          )
        : validNeighbours,
    []
  );

  return availableNeighbours.length
    ? availableNeighbours[parseInt(Math.random() * availableNeighbours.length)]
    : false;
}

// Given a maze and a position itinerate creating connections until there's no more available positions
function createEmptyCellsConnections(maze, line = 0, column = 0) {
  const cell = maze[line][column];
  cell.visited = true;

  const nextCell = findRandomNeighbour(maze, cell);
  if (nextCell) {
    cell.corridors.push(nextCell);
    createEmptyCellsConnections(maze, nextCell.line, nextCell.column);
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

  const nextCell = findRandomNeighbour(maze, cell, true);
  if (nextCell) {
    cell.corridors.push(nextCell);
    createEmptyCellsConnections(maze, nextCell.line, nextCell.column);
  }
}

// Given a square dimension create a random maze with the hunt and kill algorithm
function createMaze(dimension) {
  // Create a multidimensional array with objects representing each square of the maze
  const maze = Array.from(Array(dimension)).map((line, lineIndex) =>
    Array.from(Array(dimension)).map((column, columnIndex) => ({
      line: lineIndex,
      column: columnIndex,
      visited: false,
      corridors: [],
    }))
  );
  createEmptyCellsConnections(maze);
  return maze;
}

// Given a maze array create a visual map
function createMap(maze) {
  const wallTile = "\x1b[32m# \x1b[0m";
  const floorTile = "\x1b[36m. \x1b[0m";

  let map = Array.from(Array(maze.length * 2 + 1)).map((line) =>
    Array.from(Array(maze.length * 2 + 1)).fill(
      wallTile,
      0,
      maze.length * 2 + 1
    )
  );

  maze.map((line, lineIndex) => {
    line.map((cell, columnIndex) => {
      if (cell.visited) {
        map[lineIndex * 2 + 1][columnIndex * 2 + 1] = floorTile;
        cell.corridors.map((corridor) => {
          if (corridor.line > cell.line) {
            map[lineIndex * 2 + 2][columnIndex * 2 + 1] = floorTile;
          } else if (corridor.line < cell.line) {
            map[lineIndex * 2][columnIndex * 2 + 1] = floorTile;
          } else if (corridor.column > cell.column) {
            map[lineIndex * 2 + 1][columnIndex * 2 + 2] = floorTile;
          } else if (corridor.column < cell.column) {
            map[lineIndex * 2 + 1][columnIndex * 2] = floorTile;
          }
        });
      }
    });
  });

  return map.map((line) => line.join("")).join("\n");
}

var maze = createMaze(5);
var map = createMap(maze);
console.log(map);

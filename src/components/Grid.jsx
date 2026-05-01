import { useEffect, useState } from "react";
import Cell from "./Cell";

function Grid({ rows, cols, setSteps }) {
  const [grid, setGrid] = useState([]);
  const [agent, setAgent] = useState({ row: 0, col: 0 });

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  useEffect(() => {
    generateGrid();
  }, [rows, cols]);

  useEffect(() => {
    if (grid.length > 0) {
      const timer = setInterval(() => {
        moveAgent();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [grid, agent]);

  const generateGrid = () => {
    let board = [];

    for (let r = 0; r < rows; r++) {
      let row = [];

      for (let c = 0; c < cols; c++) {
        row.push({
          row: r,
          col: c,
          pit: false,
          wumpus: false,
          breeze: false,
          stench: false,
          visited: false,
          safe: false,
        });
      }

      board.push(row);
    }

    placeHazards(board);
    generatePercepts(board);

    board[0][0].visited = true;
    board[0][0].safe = true;

    infer(board, 0, 0);

    setGrid(board);
    setAgent({ row: 0, col: 0 });
    setSteps(0);
  };

  const placeHazards = (board) => {
    let pits = 2;

    while (pits > 0) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * cols);

      if ((r !== 0 || c !== 0) && !board[r][c].pit) {
        board[r][c].pit = true;
        pits--;
      }
    }

    while (true) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * cols);

      if ((r !== 0 || c !== 0) && !board[r][c].pit) {
        board[r][c].wumpus = true;
        break;
      }
    }
  };

  const generatePercepts = (board) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c].pit) {
          dirs.forEach(([dr, dc]) => {
            let nr = r + dr;
            let nc = c + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              board[nr][nc].breeze = true;
            }
          });
        }

        if (board[r][c].wumpus) {
          dirs.forEach(([dr, dc]) => {
            let nr = r + dr;
            let nc = c + dc;

            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              board[nr][nc].stench = true;
            }
          });
        }
      }
    }
  };

  const infer = (board, r, c) => {
    let current = board[r][c];

    if (!current.breeze && !current.stench) {
      dirs.forEach(([dr, dc]) => {
        let nr = r + dr;
        let nc = c + dc;

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          board[nr][nc].safe = true;
        }
      });
    }
  };

  const resolutionCheck = (cell) => {
    setSteps((prev) => prev + 1);

    if (!cell.pit && !cell.wumpus) return true;

    return false;
  };

  const moveAgent = () => {
    let choices = [];

    dirs.forEach(([dr, dc]) => {
      let nr = agent.row + dr;
      let nc = agent.col + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        let cell = grid[nr][nc];

        if (!cell.visited && resolutionCheck(cell)) {
          choices.push({ row: nr, col: nc });
        }
      }
    });

    if (choices.length === 0) return;

    let next = choices[0];

    let newGrid = [...grid];
    newGrid[next.row][next.col].visited = true;

    infer(newGrid, next.row, next.col);

    setGrid(newGrid);
    setAgent(next);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 70px)`,
        gap: "5px",
      }}
    >
      {grid.flat().map((cell, i) => (
        <Cell
          key={i}
          data={cell}
          isAgent={cell.row === agent.row && cell.col === agent.col}
        />
      ))}
    </div>
  );
}

export default Grid;
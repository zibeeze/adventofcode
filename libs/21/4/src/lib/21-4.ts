export function partOne(input: string[]) {
  const { balls, boards } = createBoards(input);

  let bingoBoard: Board;
  let winningBall: number;
  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    for (let i = 0; i < boards.length; i++) {
      const board: Board = boards[i];
      board.markValue(ball);
      if (board.isBingo()) {
        bingoBoard = board;
        winningBall = ball;
      }
    }
    if (bingoBoard !== undefined) {
      break;
    }
  }

  return answer(bingoBoard, winningBall);
}

export function partTwo(input) {
  let solvedOrder = [];

  let { balls, boards } = createBoards(input);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    let toRemove = [];
    for (let i = 0; i < boards.length; i++) {
      const board: Board = boards[i];
      board.markValue(ball);
      if (board.isBingo()) {
        solvedOrder.push({ board, ball });
        toRemove.push(i);
      }
    }
    for (let i = 0; i < toRemove.length; i++) {
      const remove = toRemove[i];
      boards.splice(remove - i, 1);
    }
  }

  let bingoBoard = solvedOrder[solvedOrder.length - 1];
  return answer(bingoBoard.board, bingoBoard.ball);
}

function createBoards(input: string[]) {
  const balls = input[0].split(',').map((x) => +x);
  const boards = input.slice(1).map((x) => {
    let board = new Board();
    board.numbers = x
      .split('\n')
      .filter((line) => !!line)
      .map((x) =>
        x
          .trim()
          .split(/ +/)
          .map((x) => ({ value: +x, marked: false }))
      );
    return board;
  });

  return { balls, boards };
}

function answer(board: Board, winningBall: number) {
  let sum = 0;
  board.numbers.forEach((row) => {
    row.forEach((number) => {
      if (!number.marked) {
        sum += number.value;
      }
    });
  });
  return sum * winningBall;
}

class Board {
  public numbers: { value: number; marked: boolean }[][];

  public markValue(value: number) {
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = 0; j < this.numbers.length; j++) {
        const number = this.numbers[i][j];
        if (number.value === value) number.marked = true;
      }
    }
  }

  public isBingo() {
    let isBingo = false;
    for (let j = 0; j < this.numbers.length; j++) {
      let bingo = 0;
      for (let i = 0; i < this.numbers.length; i++) {
        const number = this.numbers[i][j];
        if (number.marked) {
          bingo += 1;
        }
      }
      if (bingo === 5) {
        isBingo = true;
        break;
      }
    }
    if (isBingo) return isBingo;

    for (let j = 0; j < this.numbers.length; j++) {
      let bingo = 0;
      for (let i = 0; i < this.numbers.length; i++) {
        let number = this.numbers[j][i];
        if (number.marked === true) {
          bingo += 1;
        }
      }
      if (bingo === 5) {
        isBingo = true;
        break;
      }
    }

    return isBingo;
  }

  constructor() {
    this.numbers = [];
  }
}

import * as path from "https://deno.land/std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const bingo1: bingo = parseBingoInput(rawInput);
    const bingo2: bingo = parseBingoInput(rawInput);

    solvePart1(bingo1);
    solvePart2(bingo2);
}

function solvePart1(bingo: bingo) {
    const [wonBoard, lastNumber] = playBingo(bingo);

    let sumOfUnmarked = 0;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const value = wonBoard[i][j];

            if (value > 0) {
                sumOfUnmarked += value;
            }
        }
    }

    console.log(
        `Answer to part 1 is: ${sumOfUnmarked} * ${lastNumber} = ${
            sumOfUnmarked * lastNumber
        }\n`
    );
}

function solvePart2(bingo: bingo) {
    const [lastToWinBoard, lastNumber] = tryToLoseBingo(bingo);

    let sumOfUnmarked = 0;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const value = lastToWinBoard[i][j];

            if (value > 0) {
                sumOfUnmarked += value;
            }
        }
    }

    console.log(
        `Answer to part 2 is: ${sumOfUnmarked} * ${lastNumber} = ${
            sumOfUnmarked * lastNumber
        }\n`
    );
}

type board = number[][];

type bingo = {
    drawnNumbers: number[];
    boards: board[];
};

type neighbourInformation = {
    x: number;
    y: number;
};

function parseBingoInput(rawInput: string): bingo {
    const inputLines = rawInput.split("\n");

    const drawnNumbersLine = inputLines[0];
    const boardsLines = inputLines.slice(2);

    const drawnNumbers = parseDrawnNumbers(drawnNumbersLine);

    const boards = parseBoardsInput(boardsLines);

    return {
        drawnNumbers,
        boards,
    };
}

function parseDrawnNumbers(input: string): number[] {
    return input.split(",").map((numberAsString) => parseInt(numberAsString));
}

function parseBoardsInput(inputLines: string[]): board[] {
    let tmpBoardStartLine = 0;

    const parsedBoards: board[] = [];

    while (tmpBoardStartLine + 4 < inputLines.length) {
        const board = [];
        for (let i = tmpBoardStartLine; i < tmpBoardStartLine + 5; i++) {
            const line: number[] = [...inputLines[i].matchAll(/[0-9]+/g)].map(
                (n) => parseInt(n[0])
            );

            board.push(line);
        }

        parsedBoards.push(board);
        tmpBoardStartLine += 6;
    }

    return parsedBoards;
}

const initializeBoardNeighboursInformation = () => {
    return Array.from(
        {
            length: 5,
        },
        () => {
            return Array.from(
                {
                    length: 5,
                },
                () => {
                    return {
                        x: 0,
                        y: 0,
                    };
                }
            );
        }
    );
};

// returns the winning board with marked numbers being negative
// and the last marked number
function playBingo(bingo: bingo): [board, number] {
    const { drawnNumbers, boards } = bingo;
    const boardsCount = boards.length;

    const boardsWithNeigboursInformation = Array.from(
        { length: boardsCount },
        () => initializeBoardNeighboursInformation()
    );

    for (const drawnNumber of drawnNumbers) {
        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (board[i][j] === drawnNumber && board[i][j]) {
                        board[i][j] *= -1;

                        const foundWinner = fillNeighboursInformation(
                            boardsWithNeigboursInformation[b],
                            i,
                            j
                        );

                        if (foundWinner) {
                            return [board, drawnNumber];
                        }
                    }
                }
            }
        }
    }

    return [boards[0], 3];
}

function tryToLoseBingo(bingo: bingo): [board, number] {
    const { drawnNumbers, boards } = bingo;
    const boardsCount = boards.length;
    const boardsWon: Set<number> = new Set();

    const boardsWithNeigboursInformation = Array.from(
        { length: boardsCount },
        () => initializeBoardNeighboursInformation()
    );

    for (const drawnNumber of drawnNumbers) {
        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];

            if (boardsWon.has(b)) {
                continue;
            }
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    if (board[i][j] === drawnNumber) {
                        board[i][j] *= -1;

                        const foundWinner = fillNeighboursInformation(
                            boardsWithNeigboursInformation[b],
                            i,
                            j
                        );

                        if (foundWinner) {
                            boardsWon.add(b);
                        }

                        if (boardsWon.size === boardsCount) {
                            return [board, drawnNumber];
                        }
                    }
                }
            }
        }
    }

    return [boards[0], 3];
}

function fillNeighboursInformation(
    boardWithNeigboursInformation: neighbourInformation[][],
    yOfMarked: number,
    xOfMarked: number
): boolean {
    for (let i = 0; i < 5; i++) {
        boardWithNeigboursInformation[i][xOfMarked].y += 1;

        if (boardWithNeigboursInformation[i][xOfMarked].y === 5) {
            return true;
        }
    }

    for (let j = 0; j < 5; j++) {
        boardWithNeigboursInformation[yOfMarked][j].x += 1;

        if (boardWithNeigboursInformation[yOfMarked][j].x === 5) {
            return true;
        }
    }
    return false;
}

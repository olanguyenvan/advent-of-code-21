import * as path from "https://deno.land/std/path/mod.ts";
import {
    Axis,
    point,
    foldInstruction,
    getPointsAfterFolding,
} from "./folds.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const [points, foldInstructions] = parsePaperInformation(rawInput);

    solvePart1(points, foldInstructions);
    console.log("\n");
    solvePart2(points, foldInstructions);
}

const POINT_REGEX = /^([0-9]+),([0-9]+)$/;
const FOLD_REGEX = /^fold along (x|y)=([0-9]+)$/;

function parsePaperInformation(rawInput: string): [point[], foldInstruction[]] {
    const lines = rawInput.split("\n").filter(Boolean);
    const points: point[] = [];
    const foldInstructions: foldInstruction[] = [];

    for (const line of lines) {
        const pointMatch = line.match(POINT_REGEX);

        if (pointMatch) {
            const [_, xCoordinate, yCoordinate] = pointMatch;
            const point: point = {
                x: parseInt(xCoordinate),
                y: parseInt(yCoordinate),
            };
            points.push(point);

            continue;
        }

        const foldInstructionMatch = line.match(FOLD_REGEX);

        if (foldInstructionMatch) {
            const [_, axis, foldAt] = foldInstructionMatch;

            const foldInstruction: foldInstruction = {
                axis: axis === "x" ? Axis.Left : Axis.Up,
                foldAt: parseInt(foldAt),
            };

            foldInstructions.push(foldInstruction);
        }
    }

    return [points, foldInstructions];
}
// =======================

function solvePart1(
    points: point[],
    foldInstructions: foldInstruction[]
): void {
    const t0 = performance.now();
    const pointsAfterFolding = getPointsAfterFolding(
        points,
        foldInstructions.slice(0, 1)
    );
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${pointsAfterFolding.length}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

function solvePart2(
    points: point[],
    foldInstructions: foldInstruction[]
): void {
    const t0 = performance.now();
    const pointsAfterFolding = getPointsAfterFolding(points, foldInstructions);
    const t1 = performance.now();

    console.log(`Answer to part 2 is:`);
    printPoints(pointsAfterFolding);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds.`);
}

function printPoints(points: point[]) {
    let maxX = 0;
    let maxY = 0;

    for (const point of points) {
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
    }

    const m = Array.from(Array(maxY + 1), () => new Array(maxX + 1).fill("  "));

    for (const point of points) {
        const { x, y } = point;

        m[y][x] = "🌸";
    }

    const rows: string[] = [];
    for (let i = 0; i < m.length; i++) {
        let currentRow: string[] = [];

        for (let j = 0; j < m[i].length; j++) {
            currentRow.push(m[i][j]);
        }

        rows.push(currentRow.join(""));
    }

    console.log(rows.join("\n"));
}

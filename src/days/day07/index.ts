import * as path from "https://deno.land/std/path/mod.ts";
import {
    getClosestPositionForAll,
    getSumOfDistanceFromDestination,
} from "./crabs.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const positions = parseCrabInput(rawInput);

    solvePart1(positions);
    // solvePart2(positions);
}

function parseCrabInput(rawInput: string): number[] {
    return rawInput
        .split(",")
        .map((counterAsString) => parseInt(counterAsString));
}

// =======================

function solvePart1(positions: number[]): void {
    const t0 = performance.now();
    const position = getClosestPositionForAll(positions);
    const sumOfDistance = getSumOfDistanceFromDestination(position, positions);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${sumOfDistance}\n`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds`);
}

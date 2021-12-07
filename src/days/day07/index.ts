import * as path from "https://deno.land/std/path/mod.ts";
import {
    getClosestPositionForAll,
    getSumOfDistanceFromDestination,
    linearFuelBurn,
    incrementingFuelBurn,
} from "./crabs.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const positions = parseCrabInput(rawInput);

    solvePart1(positions);
    console.log("\n");
    solvePart2(positions);
}

function parseCrabInput(rawInput: string): number[] {
    return rawInput
        .split(",")
        .map((counterAsString) => parseInt(counterAsString));
}

// =======================

function solvePart1(positions: number[]): void {
    const t0 = performance.now();
    const position = getClosestPositionForAll(linearFuelBurn, positions);
    const sumOfDistance = getSumOfDistanceFromDestination(
        linearFuelBurn,
        position,
        positions
    );
    const t1 = performance.now();

    console.log(
        `Found best position is ${position}. Answer to part 1 is: ${sumOfDistance}.`
    );
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds`);
}

function solvePart2(positions: number[]): void {
    const t0 = performance.now();
    const position = getClosestPositionForAll(incrementingFuelBurn, positions);
    const sumOfDistance = getSumOfDistanceFromDestination(
        incrementingFuelBurn,
        position,
        positions
    );
    const t1 = performance.now();

    console.log(
        `Found best position is ${position}. Answer to part 2 is: ${sumOfDistance}.`
    );
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds`);
}

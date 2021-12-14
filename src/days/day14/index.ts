import * as path from "https://deno.land/std/path/mod.ts";
import {
    getElementsCount,
    polymer,
    insertions,
    getPolymerAfterInsertions,
    getMostCommonElementCount,
    getLeastCommonElementCount,
    getPolymerElementsCountAfterInsertions,
} from "./polymers.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const [initialPolymer, insertions] = parsePolymersInput(rawInput);

    solvePart1(initialPolymer, insertions);
    console.log("\n");
    solvePart2(initialPolymer, insertions);
}

const INSERTION_REGEX = /^([A-Z]{2}) -> ([A-Z])$/;

function parsePolymersInput(rawInput: string): [polymer, insertions] {
    const lines = rawInput.split("\n").filter(Boolean);
    const initialPolymer: polymer = lines[0];

    const insertions: insertions = {};

    for (const line of lines.slice(1)) {
        const insertionMatch = line.match(INSERTION_REGEX);

        if (insertionMatch) {
            const [_, match, toInsert] = insertionMatch;
            insertions[match] = toInsert;
        }
    }

    return [initialPolymer, insertions];
}
// =======================

function solvePart1(initialPolymer: polymer, insertions: insertions): void {
    const t0 = performance.now();
    const steps = 10;
    const polymer = getPolymerAfterInsertions(
        initialPolymer,
        insertions,
        steps
    );
    const mostCommonElementCount = getMostCommonElementCount(polymer);
    const leastCommonElementCount = getLeastCommonElementCount(polymer);
    const result = mostCommonElementCount - leastCommonElementCount;
    const t1 = performance.now();

    console.log(`Polymer's length is ${polymer.length}`);
    console.log(`Answer to part 1 is: ${result}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

// =======================

function solvePart2(initialPolymer: polymer, insertions: insertions): void {
    const t0 = performance.now();
    const steps = 40;
    const elementsCount = getPolymerElementsCountAfterInsertions(
        initialPolymer,
        insertions,
        steps
    );

    let max = 0;
    let min = elementsCount[initialPolymer[0]];

    for (const value of Object.values(elementsCount)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
    }

    const result = max - min;
    const t1 = performance.now();

    console.log(`Answer to part 2 is: ${result}.`);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds.`);
}

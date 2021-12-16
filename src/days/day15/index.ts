import * as path from "https://deno.land/std/path/mod.ts";
import { map, findShortestPath } from "./dijkstra.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const map = parseMapInput(rawInput);

    solvePart1(map);
    console.log("\n");
    // solvePart2(initialPolymer, insertions);
}

const INSERTION_REGEX = /^([A-Z]{2}) -> ([A-Z])$/;

function parseMapInput(rawInput: string): map {
    const lines = rawInput.split("\n").filter(Boolean);

    const map: map = [];

    for (const line of lines) {
        map.push(line.split("").map((s) => parseInt(s)));
    }

    return map;
}
// =======================

function solvePart1(map: map): void {
    const t0 = performance.now();
    const shortestPath = findShortestPath(map);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${shortestPath}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

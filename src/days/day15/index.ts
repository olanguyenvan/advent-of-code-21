import * as path from "https://deno.land/std/path/mod.ts";
import { Map, tile, findShortestPath } from "./dijkstra.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const tile = parseTileInput(rawInput);

    solvePart1(tile);
    console.log("\n");
    solvePart2(tile);
}

function parseTileInput(rawInput: string): tile {
    const lines = rawInput.split("\n").filter(Boolean);

    const tile: tile = [];

    for (const line of lines) {
        tile.push(line.split("").map((s) => parseInt(s)));
    }

    return tile;
}
// =======================

function solvePart1(tile: tile): void {
    const t0 = performance.now();
    const map = new Map(tile, 1, 1);
    const shortestPath = findShortestPath(map);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${shortestPath}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

function solvePart2(tile: tile): void {
    const t0 = performance.now();
    const map = new Map(tile, 5, 5);
    const shortestPath = findShortestPath(map);
    const t1 = performance.now();

    console.log(`Answer to part 2 is: ${shortestPath}.`);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds.`);
}

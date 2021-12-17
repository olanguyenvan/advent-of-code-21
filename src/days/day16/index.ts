import * as path from "https://deno.land/std/path/mod.ts";
// import { Map, tile, findShortestPath } from "./dijkstra.ts";
import { parsePacket } from "./parser.ts";
import { getSum } from "./packet.ts";
import { packet } from "./types.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const packet = parsePacket(rawInput);

    solvePart1(packet);
    console.log("\n");
    // solvePart2(tile);
}

function solvePart1(packet: packet): void {
    const t0 = performance.now();
    const sum = getSum(packet);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${sum}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

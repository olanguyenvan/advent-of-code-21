import * as path from "https://deno.land/std/path/mod.ts";
import { parsePacket } from "./parser.ts";
import { getVersionSums, getPacketsCalculated } from "./packet.ts";
import { packet } from "./types.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const packet = parsePacket(rawInput);

    solvePart1(packet);
    console.log("\n");
    solvePart2(packet);
}

function solvePart1(packet: packet): void {
    const t0 = performance.now();
    const sum = getVersionSums(packet);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${sum}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

getPacketsCalculated;

function solvePart2(packet: packet): void {
    const t0 = performance.now();
    const result = getPacketsCalculated(packet);
    const t1 = performance.now();

    console.log(`Answer to part 2 is: ${result}.`);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds.`);
}

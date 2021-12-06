import * as path from "https://deno.land/std/path/mod.ts";
import { getFishLengthAfterDays } from "./fish.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const fish = parseFishInput(rawInput);

    solvePart1(fish);
}

function parseFishInput(rawInput: string): number[] {
    return rawInput
        .split(",")
        .map((counterAsString) => parseInt(counterAsString));
}

// =======================

function solvePart1(fish: number[]): void {
    const days = 80;

    const t0 = performance.now();
    const fishLength = getFishLengthAfterDays(fish, days);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${fishLength}\n`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds`);
}

import * as path from "https://deno.land/std/path/mod.ts";
import { parseAreaInput } from "./parser.ts";
import { getMaximumY } from "./area.ts";
import { area } from "./types.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, "input");

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const area = parseAreaInput(rawInput);

    solvePart1(area);
    console.log("\n");
    solvePart2(area);
}

function solvePart1(area: area): void {
    const t0 = performance.now();
    const [maximumY, _] = getMaximumY(area);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${maximumY}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

function solvePart2(area: area): void {
    const t0 = performance.now();
    const [_, combinationsCount] = getMaximumY(area);
    const t1 = performance.now();

    console.log(`Answer to part 2 is: ${combinationsCount}.`);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds.`);
}

import * as path from "https://deno.land/std/path/mod.ts";
import { getFlashesCount, UNTIL_SYNC } from "./octopuses.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const octopuses1 = parseOctopuses(rawInput);
    const octopuses2 = parseOctopuses(rawInput);

    solvePart1(octopuses1);
    console.log("\n");
    solvePart2(octopuses2);
}

function parseOctopuses(rawInput: string): number[][] {
    const lines = rawInput.split("\n").filter(Boolean);

    return lines.reduce((acc: number[][], line: string) => {
        const octopusesAsString: string[] = line.split("");
        const octopuses: number[] = octopusesAsString.map((s) => parseInt(s));
        acc.push(octopuses);

        return acc;
    }, []);
}
// =======================

function solvePart1(octopuses: number[][]): void {
    const steps = 200;
    const t0 = performance.now();
    const [flashesCount] = getFlashesCount(octopuses, steps);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${flashesCount}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

function solvePart2(octopuses: number[][]): void {
    const t0 = performance.now();

    const [_, stepsCount] = getFlashesCount(octopuses, UNTIL_SYNC);
    const t1 = performance.now();

    console.log(`Answer to part 2 is: ${stepsCount}.`);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds.`);
}

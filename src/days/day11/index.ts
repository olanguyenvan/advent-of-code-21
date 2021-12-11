import * as path from "https://deno.land/std/path/mod.ts";
import { getFlashesCount } from "./octopuses.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const octopuses = parseOctopuses(rawInput);

    solvePart1(octopuses);
    console.log("\n");
    // solvePart2(octopuses);
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
    const t0 = performance.now();

    const flashesCount = getFlashesCount(octopuses);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${flashesCount}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

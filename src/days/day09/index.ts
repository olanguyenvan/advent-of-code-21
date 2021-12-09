import * as path from "https://deno.land/std/path/mod.ts";
import { getRiskLevels } from "./cave.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const cave = parseCaveInput(rawInput);

    solvePart1(cave);
    console.log("\n");
    // solvePart2(displays);
}

const DIGIT_REGEX = /[a-g]+/g;

function parseCaveInput(rawInput: string): number[][] {
    const lines = rawInput.split("\n").filter(Boolean);

    return lines.reduce((acc: number[][], line: string) => {
        const currentLevels = line.split("").map((s) => parseInt(s));
        acc.push(currentLevels);

        return acc;
    }, []);
}
// =======================

function solvePart1(cave: number[][]): void {
    const t0 = performance.now();

    const riskLevels = getRiskLevels(cave);
    const sumOfRiskLevels = riskLevels.reduce((acc, riskLevel) => {
        return acc + riskLevel + 1;
    }, 0);
    const t1 = performance.now();

    console.log(`. Answer to part 1 is: ${sumOfRiskLevels}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds`);
}

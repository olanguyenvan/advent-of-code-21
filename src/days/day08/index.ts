import * as path from "https://deno.land/std/path/mod.ts";
import {
    display,
    getCountOfUniqueLengthDigitsInOutput,
    getDisplaysOutputSum,
} from "./display.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const displays = parseDisplaysInput(rawInput);

    solvePart1(displays);
    console.log("\n");
    solvePart2(displays);
}

const DIGIT_REGEX = /[a-g]+/g;

function parseDisplaysInput(rawInput: string): display[] {
    const lines = rawInput.split("\n").filter(Boolean);

    function parseDigitSeries(s: string): string[] {
        return [...s.matchAll(DIGIT_REGEX)].map((r) => r.toString());
    }

    return lines.reduce((acc: display[], line: string) => {
        const [input, output] = line.split("|");
        acc.push({
            input: parseDigitSeries(input),
            output: parseDigitSeries(output),
        });

        return acc;
    }, []);
}
// =======================

function solvePart1(displays: display[]): void {
    const t0 = performance.now();

    const repOfUniqueLengthDigitsInOutput =
        getCountOfUniqueLengthDigitsInOutput(displays);
    const t1 = performance.now();

    console.log(`. Answer to part 1 is: ${repOfUniqueLengthDigitsInOutput}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds`);
}

function solvePart2(displays: display[]): void {
    const t0 = performance.now();

    const displaysOutputSum = getDisplaysOutputSum(displays);
    const t1 = performance.now();

    console.log(`. Answer to part 2 is: ${displaysOutputSum}.`);
    console.log(`Solution to part 2 was solved in ${t1 - t0} milliseconds`);
}

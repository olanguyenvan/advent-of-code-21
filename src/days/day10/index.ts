import * as path from "https://deno.land/std/path/mod.ts";
import { getSyntaxErrorScore } from "./parentheses.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const parenthesesLines = parseParenthesesLines(rawInput);

    solvePart1(parenthesesLines);
    console.log("\n");
}

function parseParenthesesLines(rawInput: string): string[][] {
    const lines = rawInput.split("\n").filter(Boolean);

    return lines.reduce((acc: string[][], line: string) => {
        const currentLine: string[] = line.split("");
        acc.push(currentLine);

        return acc;
    }, []);
}
// =======================

function solvePart1(parseParenthesesLines: string[][]): void {
    const t0 = performance.now();

    const syntaxErrorScore = getSyntaxErrorScore(parseParenthesesLines);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${syntaxErrorScore}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

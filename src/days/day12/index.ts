import * as path from "https://deno.land/std/path/mod.ts";
import { segment, getPathsCombinationsCount } from "./paths.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const paths = parseSegments(rawInput);

    solvePart1(paths);
    console.log("\n");
    // solvePart2(octopuses2);
}

function parseSegments(rawInput: string): segment[] {
    const lines = rawInput.split("\n").filter(Boolean);

    return lines.reduce((acc: segment[], line: string) => {
        const [segmentFrom, segmentTo] = line.split("-");
        acc.push([segmentFrom, segmentTo]);

        return acc;
    }, []);
}
// =======================

function solvePart1(segments: segment[]): void {
    const t0 = performance.now();
    const pathCombinationsCount = getPathsCombinationsCount(segments);
    const t1 = performance.now();

    console.log(`Answer to part 1 is: ${pathCombinationsCount}.`);
    console.log(`Solution to part 1 was solved in ${t1 - t0} milliseconds.`);
}

import * as path from "https://deno.land/std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const binariesAsString = rawInput.split("\n");

    solvePart1(binariesAsString);
    solvePart2(binariesAsString);
}

// =======
function solvePart1(binaries: string[]) {
    const binarySize = binaries[0].length;

    let gamma = 0;
    for (let position = 0; position < binarySize; position++) {
        const mostCommonBit = getMostCommonBitOnPosition(binaries, position);

        if (mostCommonBit === 1) {
            gamma += Math.pow(2, binarySize - 1 - position);
        }
    }

    const epsilon = Math.pow(2, binarySize) - 1 - gamma;

    console.log(`Answer to part 1 is: ${gamma * epsilon}\n`);
}

function solvePart2(binaries: string[]) {
    const oxygenRating = getOxygenRating(binaries);
    const scrubberRating = getScrubberRating(binaries);

    console.log(`Answer to part 2 is: ${oxygenRating * scrubberRating}\n`);
}

function getOxygenRating(binaries: string[]): number {
    const comparator: comparatorFunc = (mostCommonBit, bit) =>
        bit === mostCommonBit;

    return getRating(binaries, comparator);
}

function getScrubberRating(binaries: string[]): number {
    const comparator: comparatorFunc = (mostCommonBit, bit) =>
        bit !== mostCommonBit;

    return getRating(binaries, comparator);
}

type comparatorFunc = (arg1: number, arg2: number) => boolean;

function getRating(binaries: string[], comparator: comparatorFunc): number {
    let filteredBinaries = binaries;
    let position = 0;

    while (filteredBinaries.length > 1) {
        const mostCommonBit = getMostCommonBitOnPosition(
            filteredBinaries,
            position
        );

        filteredBinaries = filteredBinaries.filter((binary) => {
            const bit = parseInt(binary[position]);

            return comparator(mostCommonBit, bit);
        });

        position++;
    }

    return parseInt(filteredBinaries[0], 2);
}

function getMostCommonBitOnPosition(binaries: string[], position: number) {
    let tmp = 0;

    for (let j = 0; j < binaries.length; j++) {
        const currentBit = parseInt(binaries[j][position]);
        tmp += 2 * currentBit - 1;
    }

    return tmp >= 0 ? 1 : 0;
}

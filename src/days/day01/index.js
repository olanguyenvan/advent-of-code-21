var fs = require("fs");
const path = require("path");

fs.readFile(path.resolve(__dirname, "input"), "utf8", main);

// ========================
function main(err, contents) {
    const entries = contents.split("\n");
    const entriesAsNumbers = entries.map((e) => parseInt(e));

    solvePart1(entriesAsNumbers);
    solvePart2(entriesAsNumbers);
}

// ==============

function solvePart1(entries) {
    const localIncreasesCount = countLocalIncreases(entries);

    console.log(`Answer to part 1 is: ${localIncreasesCount}\n`);
}

function countLocalIncreases(entries) {
    let counter = 0;

    for (let i = 1; i < entries.length; i++) {
        if (entries[i - 1] < entries[i]) {
            counter++;
        }
    }

    return counter;
}

// ==============

function solvePart2(entries) {
    const localIncreasesOfSumOf3Count = countLocalIncreasesOfSumOf3(entries);

    console.log(`Answer to part 2 is: ${localIncreasesOfSumOf3Count}\n`);
}

function countLocalIncreasesOfSumOf3(entries) {
    let counter = 0;
    if (entries.length < 2) {
        return 0;
    }
    let sum = entries[0] + entries[1] + entries[2];

    for (let i = 3; i < entries.length; i++) {
        const newSum = sum - entries[i - 3] + entries[i];

        if (sum < newSum) {
            counter++;
        }

        sum = newSum;
    }

    return counter;
}

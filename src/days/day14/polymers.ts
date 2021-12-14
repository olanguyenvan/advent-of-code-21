export type polymer = string;
export type insertions = {
    [key: string]: string;
};
export type elementsCount = { [key: string]: number };

export function getPolymerAfterInsertions(
    initialPolymer: polymer,
    insertions: insertions,
    steps: number
): polymer {
    let resultPolymer = initialPolymer;

    while (steps > 0) {
        let i = 0;

        let resultPolymerAfterStep: string[] = [];

        while (i + 1 < resultPolymer.length) {
            const currentChain = resultPolymer.slice(i, i + 2);

            resultPolymerAfterStep.push(resultPolymer[i]);

            if (currentChain in insertions) {
                resultPolymerAfterStep.push(insertions[currentChain]);
            }

            i++;
        }

        resultPolymerAfterStep.push(resultPolymer[resultPolymer.length - 1]);

        steps--;
        resultPolymer = resultPolymerAfterStep.join("");
    }
    return resultPolymer;
}

export function getMostCommonElementCount(polymer: polymer): number {
    const elementsCount = getElementsCount(polymer);

    let max = 0;

    for (const value of Object.values(elementsCount)) {
        max = Math.max(max, value);
    }

    return max;
}

export function getLeastCommonElementCount(polymer: polymer): number {
    const elementsCount = getElementsCount(polymer);

    let min = elementsCount[polymer[0]];

    for (const value of Object.values(elementsCount)) {
        min = Math.min(min, value);
    }

    return min;
}

export function getElementsCount(polymer: polymer): elementsCount {
    let elementsCount: elementsCount = {};

    for (let i = 0; i < polymer.length; i++) {
        const currentChar = polymer[i];

        if (!(currentChar in elementsCount)) {
            elementsCount[currentChar] = 0;
        }

        elementsCount[currentChar]++;
    }

    return elementsCount;
}

function getPolymersOfLength(polymer: polymer, length: number): polymer[] {
    const polymers: polymer[] = [];

    let i = 0;

    while (i < polymer.length) {
        polymers.push(polymer.slice(i, i + length));
        i += length;
    }

    return polymers;
}

export function getPolymerElementsCountAfterInsertions(
    initialPolymer: polymer,
    insertions: insertions,
    steps: number
): elementsCount {
    const cache: { [key: string]: string } = {};
    let cacheUsageCount = 0;

    const occurencesCache: { [key: string]: elementsCount } = {};
    let occurencesCacheUsageCount = 0;
    const sumOccurences = getPolymersAfterInsertionsRec(initialPolymer, steps);

    // all sub polymers were trimmed, even the last one.
    sumOccurences[initialPolymer[initialPolymer.length - 1]]++;

    console.log("cache stats");
    console.log(`\tcache was used ${cacheUsageCount} times! 🌸`);
    console.log(
        `\toccurencesCache was used ${occurencesCacheUsageCount} times! 🌸`
    );

    return sumOccurences;

    function getPolymersAfterInsertionsRec(
        polymer: polymer,
        steps: number
    ): elementsCount {
        const interval = 6;
        if (steps === 0) {
            const trimmedPolymer = polymer.slice(0, polymer.length - 1);

            if (!occurencesCache[trimmedPolymer]) {
                occurencesCache[trimmedPolymer] =
                    getElementsCount(trimmedPolymer);
            } else {
                occurencesCacheUsageCount++;
            }

            return occurencesCache[trimmedPolymer];
        }

        const polymersLengthInterval = getPolymersOfLength(polymer, interval);
        const connections: string[] = [];

        for (let i = 0; i + 1 < polymersLengthInterval.length; i++) {
            const lastElement = polymersLengthInterval[i][interval - 1];
            const nextElement = polymersLengthInterval[i + 1][0];
            const chain = `${lastElement}${nextElement}`;

            connections.push(insertions[chain]);
        }

        // compute after 1 step and store in cache
        for (const polymerLengthInterval of polymersLengthInterval) {
            if (!cache[polymerLengthInterval]) {
                cache[polymerLengthInterval] = getPolymerAfterInsertions(
                    polymerLengthInterval,
                    insertions,
                    1
                );
            } else {
                cacheUsageCount++;
            }
        }

        const doublePolymersWithNeighbours: polymer[] = [];

        // get result polymers with neighbours: <before><resultPolymer><after>
        for (let i = 0; i < polymersLengthInterval.length; i++) {
            const polymerLength5 = cache[polymersLengthInterval[i]];
            const before = connections[i - 1] ? connections[i - 1] : "";
            const after = connections[i] ? connections[i] : "";
            const polymerLength10 = `${before}${polymerLength5}${after}`;

            doublePolymersWithNeighbours.push(polymerLength10);
        }

        const sumOccurences: elementsCount = {};

        for (const polymerLength10 of doublePolymersWithNeighbours) {
            const subElementsCount = getPolymersAfterInsertionsRec(
                polymerLength10,
                steps - 1
            );

            for (const [key, value] of Object.entries(subElementsCount)) {
                if (!(key in sumOccurences)) {
                    sumOccurences[key] = 0;
                }

                sumOccurences[key] += value;
            }
        }

        return sumOccurences;
    }
}

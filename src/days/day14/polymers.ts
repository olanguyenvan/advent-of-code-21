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

export function getPolymersOfLengthWithNextNeighbour(
    polymer: polymer,
    length: number
): polymer[] {
    const polymers: polymer[] = [];

    let i = 0;

    while (i < polymer.length - 1) {
        polymers.push(polymer.slice(i, i + length));
        i += length - 1;
    }

    return polymers;
}

export function getPolymerElementsCountAfterInsertions(
    initialPolymer: polymer,
    insertions: insertions,
    steps: number
): elementsCount {
    type cache = { [key: string]: string };

    const occurencesPerStepsCache: { [key: string]: elementsCount }[] =
        Array.from(Array(steps + 1), () => ({}));

    let occurencesPerStepsCacheUsageCount = 0;
    const cache: cache = {};
    let cacheUsageCount = 0;

    const sumOccurences = getPolymersAfterInsertionsRec(initialPolymer, steps);

    console.log("cache stats ♻️");
    console.log(`\tcache was used ${cacheUsageCount} times! 🌸`);
    console.log(
        `\tcache per steps was used ${occurencesPerStepsCacheUsageCount} times! 🌸`
    );

    return sumOccurences;

    function getPolymersAfterInsertionsRec(
        polymer: polymer,
        steps: number
    ): elementsCount {
        const interval = 6;
        if (steps === 0) {
            if (!occurencesPerStepsCache[steps][polymer]) {
                occurencesPerStepsCache[steps][polymer] =
                    getElementsCount(polymer);
            } else {
                occurencesPerStepsCacheUsageCount++;
            }

            return occurencesPerStepsCache[steps][polymer];
        }

        const polymersLengthInterval = getPolymersOfLengthWithNextNeighbour(
            polymer,
            interval
        );

        const doublePolymersWithNeighbours: polymer[] = [];

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

            doublePolymersWithNeighbours.push(cache[polymerLengthInterval]);
        }

        const sumOccurences: elementsCount = {};

        for (const doublePolymerWithNeighbour of doublePolymersWithNeighbours) {
            if (
                !occurencesPerStepsCache[steps - 1][doublePolymerWithNeighbour]
            ) {
                occurencesPerStepsCache[steps - 1][doublePolymerWithNeighbour] =
                    getPolymersAfterInsertionsRec(
                        doublePolymerWithNeighbour,
                        steps - 1
                    );
            } else {
                occurencesPerStepsCacheUsageCount++;
            }

            const subElementsCount =
                occurencesPerStepsCache[steps - 1][doublePolymerWithNeighbour];

            for (const [key, value] of Object.entries(subElementsCount)) {
                if (!(key in sumOccurences)) {
                    sumOccurences[key] = 0;
                }

                sumOccurences[key] += value;
            }

            const characterFromNext =
                doublePolymerWithNeighbour[
                    doublePolymerWithNeighbour.length - 1
                ];

            // character from next is also counted in the next double polymer so we subtract it
            sumOccurences[characterFromNext] -= 1;
        }

        // because of substracting "next", we also substracted the last one.
        // we need to bring it back
        const lastPolymer =
            doublePolymersWithNeighbours[
                doublePolymersWithNeighbours.length - 1
            ];
        const theLastCharacter = lastPolymer[lastPolymer.length - 1];
        sumOccurences[theLastCharacter] += 1;

        return sumOccurences;
    }
}

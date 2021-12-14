export type polymer = string;
export type insertions = {
    [key: string]: string;
};
export type elementsCount = { [key: string]: number };
type cache = { [key: string]: string };

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

export function getOverlappingSubPolymers(
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

const INTERVAL = 10;

export function getPolymerElementsCountAfterInsertions(
    initialPolymer: polymer,
    insertions: insertions,
    steps: number
): elementsCount {
    const occurencesPerStepsCache: { [key: string]: elementsCount }[] =
        Array.from(Array(steps + 1), () => ({}));
    const cache: cache = {};

    let occurencesPerStepsCacheUsageCount = 0;
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
        if (steps === 0) {
            if (!occurencesPerStepsCache[steps][polymer]) {
                occurencesPerStepsCache[steps][polymer] =
                    getElementsCount(polymer);
            } else {
                occurencesPerStepsCacheUsageCount++;
            }

            return occurencesPerStepsCache[steps][polymer];
        }

        const subPolymers = getOverlappingSubPolymers(polymer, INTERVAL);
        const polymersAfterInsert: polymer[] = [];

        for (const subPolymer of subPolymers) {
            if (!cache[subPolymer]) {
                cache[subPolymer] = getPolymerAfterInsertions(
                    subPolymer,
                    insertions,
                    1
                );
            } else {
                cacheUsageCount++;
            }

            polymersAfterInsert.push(cache[subPolymer]);
        }

        const sumOccurences: elementsCount = {};

        for (const polymer of polymersAfterInsert) {
            if (!occurencesPerStepsCache[steps - 1][polymer]) {
                occurencesPerStepsCache[steps - 1][polymer] =
                    getPolymersAfterInsertionsRec(polymer, steps - 1);
            } else {
                occurencesPerStepsCacheUsageCount++;
            }

            const subElementsCount =
                occurencesPerStepsCache[steps - 1][polymer];

            addElementsCounts(sumOccurences, subElementsCount);
        }

        removeDoubleCounts(sumOccurences, polymersAfterInsert);

        return sumOccurences;
    }
}

function addElementsCounts(
    elementsCountTarget: elementsCount,
    elementCountSource: elementsCount
) {
    for (const [key, value] of Object.entries(elementCountSource)) {
        if (!(key in elementsCountTarget)) {
            elementsCountTarget[key] = 0;
        }

        elementsCountTarget[key] += value;
    }
}

// Polymers are overlapping, thus we need to remove double counts
function removeDoubleCounts(sumOccurences: elementsCount, polymers: polymer[]) {
    for (const polymer of polymers) {
        const characterFromNext = polymer[polymer.length - 1];

        sumOccurences[characterFromNext] -= 1;
    }

    const lastPolymer = polymers[polymers.length - 1];
    const theLastCharacter = lastPolymer[lastPolymer.length - 1];
    sumOccurences[theLastCharacter] += 1;
}

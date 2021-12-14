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

function getElementsCount(polymer: polymer): elementsCount {
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
    console.log("initial polymer is", initialPolymer, initialPolymer.length);

    // const resultNotRec = getPolymerAfterInsertions(
    //     initialPolymer,
    //     insertions,
    //     steps
    // );
    // console.log(
    //     "CONTROL: ",
    //     //  resultNotRec,
    //     resultNotRec.length
    // );
    const cache: { [key: string]: string } = {};

    let cacheUsageCount = 0;
    const polymers = getPolymersAfterInsertionsRec(initialPolymer, steps);

    // trim all polymers
    const trimmedPolymers = polymers.map((polymer) => {
        return polymer.slice(0, polymer.length - 1);
    });

    // add last character for the last polymers
    trimmedPolymers[trimmedPolymers.length - 1] = polymers[polymers.length - 1];

    console.log(
        "RESULT: ",
        // trimmedPolymers.join(""),
        trimmedPolymers.join("").length
    );

    // const polymers = [];
    // const connections = []
    console.log(`cache was used ${cacheUsageCount} times! 🌸`);

    function getPolymersAfterInsertionsRec(
        polymer: polymer,
        steps: number
    ): polymer[] {
        const interval = 6;
        // console.log("====> getPolymersAfterInsertionsRec", steps);
        if (steps === 0) {
            return [polymer];
        }

        // console.log(`diving the polymer into ${interval} characters long`);
        const polymersLengthInterval = getPolymersOfLength(polymer, interval);
        // console.log("divided: ", polymersLengthInterval);
        const connections: string[] = [];

        // console.log("filling connections");

        for (let i = 0; i + 1 < polymersLengthInterval.length; i++) {
            const lastElement = polymersLengthInterval[i][interval - 1];
            const nextElement = polymersLengthInterval[i + 1][0];
            const chain = `${lastElement}${nextElement}`;

            connections.push(insertions[chain]);
        }

        // console.log("connections:", connections);

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

        // console.log(
        //     "doublePolymersWithNeighbours",
        //     doublePolymersWithNeighbours
        // );

        // console.log(cache);

        const polymers: polymer[] = [];

        // for (let i = 0; i < polymersLength10.length; i++) {
        //     const const subPolymers = cache[polymersLength5[i]];
        //     const after = connections[i];
        //     const polymerLength10 = `${polymerLength5}${after ? after : ""}`;

        //     polymersLength10.push(polymerLength10);
        // }

        for (const polymerLength10 of doublePolymersWithNeighbours) {
            const subPolymers = getPolymersAfterInsertionsRec(
                polymerLength10,
                steps - 1
            );

            polymers.push(...subPolymers);
        }

        // console.log("polymers are: ", polymers);
        return polymers;
    }

    // console.log(`there are ${Object.values(insertions).length} insertions`);
    // const elements = new Set();

    // for (let i = 0; i < initialPolymer.length; i++) {
    //     elements.add(initialPolymer[i]);
    // }

    // for (const toInsert of Object.values(insertions)) {
    //     elements.add(toInsert);
    // }

    // console.log(elements.size, elements);

    return getElementsCount(initialPolymer);
}

export type display = {
    input: string[];
    output: string[];
};

const UNIQUE_DIGITS_COUNT = [2, 3, 4, 7]; // 1, 7, 4, 8

function getSegmentsUsed(s: string): Set<string> {
    const segmentsUsed: Set<string> = new Set();

    for (let i = 0; i < s.length; i++) {
        segmentsUsed.add(s[i]);
    }

    return segmentsUsed;
}

function isDigitWithUniqueSegmentsCount(s: string): boolean {
    const segmentsUsed = getSegmentsUsed(s);

    return UNIQUE_DIGITS_COUNT.includes(segmentsUsed.size);
}

export function getCountOfUniqueLengthDigitsInOutput(
    displays: display[]
): number {
    return displays.reduce((acc: number, display: display): number => {
        return (
            acc + display.output.filter(isDigitWithUniqueSegmentsCount).length
        );
    }, 0);
}

export function getDisplaysOutputSum(displays: display[]): number {
    return displays.reduce((acc: number, display: display): number => {
        return acc + getDisplayOutput(display);
    }, 0);
}

function getDisplayOutput(display: display): number {
    const { input, output } = display;

    const numberPerSegments = deduceDigits(input);

    let outputAsNumber = 0;

    for (const outputDigit of output) {
        const sortedSegments = outputDigit.split("").sort().join("");

        outputAsNumber =
            outputAsNumber * 10 + numberPerSegments[sortedSegments];
    }

    return outputAsNumber;
}

const UNIQUE_SEGMENTS_COUNT = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
};

const SEGMENTS_COUNT_PER_DIGIT = {
    0: 6,
    1: 2,
    2: 5,
    3: 5,
    4: 4,
    5: 5,
    6: 6,
    7: 3,
    8: 7,
    9: 6,
};

function deduceDigits(randomizedDigits: string[]): { [k: string]: number } {
    const randomizedDigitsCharSet = randomizedDigits.map(getSegmentsUsed);

    const segmentsPerDigit: { [k: number]: string } = {};

    function getSegmentsContainingNElements(n: number): string[] {
        return randomizedDigitsCharSet
            .filter((digitCharSet) => digitCharSet.size === n)
            .map((digitCharSet) => [...digitCharSet].sort().join(""));
    }

    for (const [segmentsCount, digit] of Object.entries(
        UNIQUE_SEGMENTS_COUNT
    )) {
        const segments = getSegmentsContainingNElements(
            parseInt(segmentsCount)
        )[0];
        segmentsPerDigit[digit] = segments;
    }

    // Fill 3
    // Digit containing 5 segments that are all segments of 7  is "3"
    (() => {
        const charsOf7 = segmentsPerDigit[7].split("");

        const segmentsContaining5Elements = getSegmentsContainingNElements(
            SEGMENTS_COUNT_PER_DIGIT[3]
        );
        segmentsPerDigit[3] = segmentsContaining5Elements.filter((s) => {
            return charsOf7.every((charOf7) => s.indexOf(charOf7) !== -1);
        })[0];
    })();

    // Fill 9
    // Digit containing all segments of "3" and one extra is "9"
    (() => {
        const charsOf3 = segmentsPerDigit[3].split("");
        const segmentsWithSameLengthAs9 = getSegmentsContainingNElements(
            SEGMENTS_COUNT_PER_DIGIT[9]
        );

        segmentsPerDigit[9] = segmentsWithSameLengthAs9.filter((s) => {
            return charsOf3.every((charOf3) => s.indexOf(charOf3) !== -1);
        })[0];
    })();

    // Fill 6
    // Contains all digit of 8 but one that is from "1"
    (() => {
        const charsOf8 = segmentsPerDigit[8].split("");
        const charsOf1 = segmentsPerDigit[1].split("");

        const versionA = charsOf8
            .filter((char) => char !== charsOf1[0])
            .join("");
        const versionB = charsOf8
            .filter((char) => char !== charsOf1[1])
            .join("");

        const segmentsWithSameLengthAs6 = getSegmentsContainingNElements(
            SEGMENTS_COUNT_PER_DIGIT[6]
        );

        if (segmentsWithSameLengthAs6.includes(versionA)) {
            segmentsPerDigit[6] = versionA;
        } else if (segmentsWithSameLengthAs6.includes(versionB)) {
            segmentsPerDigit[6] = versionB;
        }
    })();

    // Fill 0
    // Only 0 2 5 are left.
    // 0 is the only one containing 6 segments that is not used yet
    (() => {
        const segmentsWithSameLengthAs0 = getSegmentsContainingNElements(
            SEGMENTS_COUNT_PER_DIGIT[0]
        );
        let usedSegmentsAlready = Object.values(segmentsPerDigit);

        segmentsPerDigit[0] = segmentsWithSameLengthAs0.filter(
            (s) => !usedSegmentsAlready.includes(s)
        )[0];
    })();

    // Only 2 and 5 are left.
    // They have the same length.
    // We deduce them by looking at the incommon part.
    // The digit that has incommon part all in "6" is "5"
    (() => {
        const usedSegmentsAlready = Object.values(segmentsPerDigit);
        const unusedSegments = getSegmentsContainingNElements(
            SEGMENTS_COUNT_PER_DIGIT[2]
        ).filter((s) => !usedSegmentsAlready.includes(s));

        const [unusedA, unusedB] = unusedSegments;
        const charsA = unusedA.split("");
        const charsB = unusedB.split("");
        const commonPart = charsA.filter((char) => charsB.includes(char));

        const incommonA = charsA.filter((char) => !commonPart.includes(char));

        const segmentsOf6 = segmentsPerDigit[6];
        const isIncommonAIn6 = incommonA.every((char) =>
            segmentsOf6.includes(char)
        );
        if (isIncommonAIn6) {
            segmentsPerDigit[2] = unusedB;
            segmentsPerDigit[5] = unusedA;
        } else {
            segmentsPerDigit[2] = unusedA;
            segmentsPerDigit[5] = unusedB;
        }
    })();

    const result: { [k: string]: number } = {};

    for (const [digit, segments] of Object.entries(segmentsPerDigit)) {
        result[segments] = parseInt(digit);
    }

    return result;
}

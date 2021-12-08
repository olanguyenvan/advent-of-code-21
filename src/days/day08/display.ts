export type display = {
    input: string[];
    output: string[];
};

const UNIQUE_DIGITS_COUNT = [2, 3, 4, 7]; // 1, 7, 4, 8

function isDigitWithUniqueSegmentsCount(s: string): boolean {
    const segmentsUsed = new Set();

    for (let i = 0; i < s.length; i++) {
        segmentsUsed.add(s[i]);
    }

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

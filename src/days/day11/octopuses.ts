function getNeighboursIndices(
    maxHeight: number,
    maxWidth: number,
    i: number,
    j: number
): [number, number][] {
    const neighbours: [number, number][] = [];
    neighbours.push(
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
        [i, j - 1]
    );

    return neighbours.filter(
        ([i, j]) => i >= 0 && i < maxHeight && j >= 0 && j < maxWidth
    );
}

export function getFlashesCount(
    octopuses: number[][],
    steps: number = 100
): number {
    const maxHeight = octopuses.length;
    const maxWidth = octopuses[0].length;
    let score = 0;

    while (steps > 0) {
        const flashed: boolean[][] = Array.from(
            {
                length: maxHeight,
            },
            () =>
                Array.from(
                    {
                        length: maxWidth,
                    },
                    () => false
                )
        );

        const toTraverse: [number, number][] = [];

        for (let i = 0; i < maxHeight; i++) {
            for (let j = 0; j < maxWidth; j++) {
                toTraverse.push([i, j]);
            }
        }

        while (toTraverse.length !== 0) {
            const [i, j] = toTraverse.pop()!;

            if (flashed[i][j]) {
                continue;
            }

            const newValue = octopuses[i][j] + 1;
            if (newValue < 10) {
                octopuses[i][j] = newValue;
                continue;
            }

            octopuses[i][j] = 0;
            flashed[i][j] = true;
            score++;

            const neighbours = getNeighboursIndices(maxHeight, maxWidth, i, j);

            for (const [i, j] of neighbours) {
                if (flashed[i][j]) {
                    continue;
                }
                toTraverse.push([i, j]);
            }
        }

        steps--;
    }
    printOctopuses(octopuses);

    return score;
}

function printOctopuses(octopuses: number[][]): void {
    let output: string[] = [];

    for (let i = 0; i < octopuses.length; i++) {
        let outputLine: string[] = [];

        for (let j = 0; j < octopuses[i].length; j++) {
            outputLine.push(octopuses[i][j].toString());
        }
        output.push(outputLine.join(""));
    }

    console.log(output.join("\n"));
}

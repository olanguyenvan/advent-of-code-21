function getNeighboursIndices(
    maxHeight: number,
    maxWidth: number,
    i: number,
    j: number
): [number, number][] {
    const neighbours: [number, number][] = [];

    if (i > 0) {
        neighbours.push([i - 1, j]);
    }

    if (i < maxHeight - 1) {
        neighbours.push([i + 1, j]);
    }

    if (j > 0) {
        neighbours.push([i, j - 1]);
    }

    if (j < maxWidth - 1) {
        neighbours.push([i, j + 1]);
    }

    return neighbours;
}

export function getRiskLevels(cave: number[][]): number[] {
    const maxHeight = cave.length;
    const maxWidth = cave[0].length;

    const riskLevels: number[] = [];

    for (let i = 0; i < maxHeight; i++) {
        for (let j = 0; j < maxWidth; j++) {
            const currentLevel = cave[i][j];
            const neighbourIndices = getNeighboursIndices(
                maxHeight,
                maxWidth,
                i,
                j
            );

            const allNeighboursHigher = neighbourIndices.every(
                ([neighbourY, neighbourX]) => {
                    return cave[neighbourY][neighbourX] > currentLevel;
                }
            );

            if (allNeighboursHigher) {
                riskLevels.push(currentLevel);
            }
        }
    }
    return riskLevels;
}

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

function getRiskLevelsIndices(cave: number[][]): [number, number][] {
    const maxHeight = cave.length;
    const maxWidth = cave[0].length;
    const indices: [number, number][] = [];

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
                indices.push([i, j]);
            }
        }
    }

    return indices;
}

export function getRiskLevels(cave: number[][]): number[] {
    const riskLevelsIndices = getRiskLevelsIndices(cave);
    const riskLevels: number[] = riskLevelsIndices.reduce(
        (acc: number[], [y, x]) => {
            acc.push(cave[y][x]);
            return acc;
        },
        []
    );

    return riskLevels;
}

export function getBasinIds(cave: number[][]): string[][] {
    const maxHeight = cave.length;
    const maxWidth = cave[0].length;
    const riskLevelsIndices = getRiskLevelsIndices(cave);

    const basinIds = Array.from({ length: maxHeight }, () => {
        return Array.from({ length: maxWidth }, () => "");
    });

    function getNeighbourIndicesToMark(
        i: number,
        j: number
    ): [number, number][] {
        const neighbours = getNeighboursIndices(maxHeight, maxWidth, i, j);

        return neighbours.filter((neighbour) => {
            const [i, j] = neighbour;
            const neighbourLevel = cave[i][j];

            return neighbourLevel !== 9 && !basinIds[i][j];
        });
    }

    for (const currentIndex of riskLevelsIndices) {
        const [i, j] = currentIndex;
        const mark = `[${j},${i}]`;

        const basinIndicesToMark: [number, number][] = [currentIndex];

        while (basinIndicesToMark.length > 0) {
            const currentIndex = basinIndicesToMark.shift()!;
            const [i, j] = currentIndex;

            basinIds[i][j] = mark;

            const neighbourIndicesToMark = getNeighbourIndicesToMark(i, j);

            basinIndicesToMark.push(...neighbourIndicesToMark);
        }
    }

    return basinIds;
}

export function getBiggestBasinSizes(basinIds: string[][], amount: number) {
    const basinElCountsPerBasinId: { [key: string]: number } = {};

    const maxHeight = basinIds.length;
    const maxWidth = basinIds[0].length;

    for (let i = 0; i < maxHeight; i++) {
        for (let j = 0; j < maxWidth; j++) {
            const basinId = basinIds[i][j];
            if (!basinId) {
                continue;
            }
            if (!basinElCountsPerBasinId.hasOwnProperty(basinId)) {
                basinElCountsPerBasinId[basinId] = 0;
            }
            basinElCountsPerBasinId[basinId]++;
        }
    }

    const elCounts = Object.values(basinElCountsPerBasinId);
    elCounts.sort((a, b) => b - a);

    return elCounts.slice(0, amount);
}

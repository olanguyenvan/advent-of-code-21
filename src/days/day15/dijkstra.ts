export type tile = number[][];
export type coordinate = [number, number];

export class Map {
    originalTile: number[][];
    tilesInColumnCount: number;
    tilesInRowCount: number;

    constructor(
        originalTile: number[][],
        tilesInColumnCount: number,
        tilesInRowCount: number
    ) {
        this.originalTile = originalTile;
        this.tilesInColumnCount = tilesInColumnCount;
        this.tilesInRowCount = tilesInRowCount;
    }

    get height() {
        return this.originalTile.length * this.tilesInColumnCount;
    }

    get width() {
        return this.originalTile[0].length * this.tilesInRowCount;
    }

    getValueAt(y: number, x: number): number {
        const yMod = y % this.originalTile.length;
        const xMod = x % this.originalTile[0].length;

        const originalTileValue = this.originalTile[yMod][xMod];

        const distanceFromOriginalTileX = Math.floor(
            x / this.originalTile[0].length
        );

        const distanceFromOriginalTileY = Math.floor(
            y / this.originalTile.length
        );

        const distanceFromCurrentTileToOriginal =
            distanceFromOriginalTileX + distanceFromOriginalTileY;

        let r = (originalTileValue + distanceFromCurrentTileToOriginal) % 9;

        if (r === 0) {
            r = 9;
        }

        return r;
    }
}

function getNeighboursIndices(
    maxHeight: number,
    maxWidth: number,
    i: number,
    j: number
): [number, number][] {
    const potentialNeighbours: [number, number][] = [
        [i - 1, j],
        [i + 1, j],
        [i, j - 1],
        [i, j + 1],
    ];

    function exists([i, j]: [number, number]) {
        return i >= 0 && i < maxHeight && j >= 0 && j < maxWidth;
    }

    return potentialNeighbours.filter(exists);
}

export function findShortestPath(map: Map): number {
    const height = map.height;
    const width = map.width;
    const shortestPaths: number[][] = Array.from(Array(height), () =>
        new Array(width).fill(Infinity)
    );
    shortestPaths[0][0] = 0;

    const toVisit: coordinate[] = [[0, 0]];

    function comparatorByMinimalPath(a: coordinate, b: coordinate): number {
        const [coordinateAY, coordinateAX] = a;
        const [coordinateBY, coordinateBX] = b;
        const shortestPathB = shortestPaths[coordinateBY][coordinateBX];
        const shortestPathA = shortestPaths[coordinateAY][coordinateAX];

        return shortestPathA - shortestPathB;
    }

    while (toVisit.length > 0) {
        toVisit.sort(comparatorByMinimalPath);
        const current = toVisit.shift()!;

        const [coordinateY, coordinateX] = current;
        const currentMinPath = shortestPaths[coordinateY][coordinateX];

        const neighbours = getNeighboursIndices(
            height,
            width,
            coordinateY,
            coordinateX
        );

        for (const neighbour of neighbours) {
            const [coordinateYNeighbour, coordinateXNeighbour] = neighbour;
            const currentNeighbourValue =
                shortestPaths[coordinateYNeighbour][coordinateXNeighbour];
            const pathCost = map.getValueAt(
                coordinateYNeighbour,
                coordinateXNeighbour
            );

            if (currentNeighbourValue === Infinity) {
                toVisit.push(neighbour);
            }

            const newPathCost = currentMinPath + pathCost;
            shortestPaths[coordinateYNeighbour][coordinateXNeighbour] =
                Math.min(newPathCost, currentNeighbourValue);
        }
    }

    return shortestPaths[height - 1][width - 1];
}

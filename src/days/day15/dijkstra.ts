export type map = number[][];
export type coordinate = [number, number];

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

export function findShortestPath(map: map): number {
    const height = map.length;
    const width = map.length;

    const shortestPaths: map = Array.from(Array(height), () =>
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
            const pathCost = map[coordinateYNeighbour][coordinateXNeighbour];

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

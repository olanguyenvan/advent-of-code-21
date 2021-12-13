export type point = {
    x: number;
    y: number;
};
export enum Axis {
    Up,
    Left,
}
export type foldInstruction = {
    axis: Axis;
    foldAt: number;
};

function getPointHash(point: point): string {
    const { x, y } = point;

    return `${x},${y}`;
}

function getDeduplicatedPoints(points: point[]): point[] {
    const pointsHashes: { [k: string]: boolean } = {};

    return points.filter((point) => {
        const pointsHash = getPointHash(point);

        if (pointsHash in pointsHashes) {
            return false;
        }
        return (pointsHashes[pointsHash] = true);
    });
}

function getFoldedCoordinate(coordinate: number, foldAt: number): number {
    if (coordinate < foldAt) {
        return coordinate;
    }
    if (coordinate > foldAt) {
        return foldAt - (coordinate - foldAt);
    }
    return -1;
}

export function getPointsAfterFolding(
    points: point[],
    foldInstructions: foldInstruction[]
): point[] {
    let deduplicatedPoints: point[] = points;

    for (const foldInstruction of foldInstructions) {
        const tmpFoldedPoints = [];
        const { axis, foldAt } = foldInstruction;

        for (const point of deduplicatedPoints) {
            const { x, y } = point;

            const coordinateToFold = axis === Axis.Left ? x : y;
            const foldedCoordinate = getFoldedCoordinate(
                coordinateToFold,
                foldAt
            );

            if (foldedCoordinate < 0) {
                continue;
            }

            const foldedPoint: point = {
                x: axis === Axis.Left ? foldedCoordinate : x,
                y: axis === Axis.Left ? y : foldedCoordinate,
            };

            tmpFoldedPoints.push(foldedPoint);
        }
        deduplicatedPoints = getDeduplicatedPoints(tmpFoldedPoints);
    }

    return deduplicatedPoints;
}

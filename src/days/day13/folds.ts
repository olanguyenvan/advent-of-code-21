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

function getDeduplicatedPoints(points: point[]): point[] {
    const pointsHashes: { [k: string]: boolean } = {};

    return points.filter((point) => {
        const { x, y } = point;

        const pointsHash = `${x},${y}`;

        if (pointsHash in pointsHashes) {
            return false;
        }
        return (pointsHashes[pointsHash] = true);
    });
}

export function getPointsAfterFolding(
    points: point[],
    foldInstructions: foldInstruction[]
): point[] {
    let deduplicatedPoints: point[] = points;

    for (const foldInstruction of foldInstructions) {
        const tmpFoldedPoints = [];
        const { axis, foldAt } = foldInstruction;

        if (axis === Axis.Left) {
            // folding to the left - x changes, y not
            for (const point of deduplicatedPoints) {
                const { x, y } = point;
                let foldedPoint: point;

                if (x < foldAt) {
                    foldedPoint = {
                        x,
                        y,
                    };
                    tmpFoldedPoints.push(foldedPoint);
                } else if (x > foldAt) {
                    const newX = foldAt - (x - foldAt);
                    foldedPoint = {
                        x: newX,
                        y,
                    };

                    tmpFoldedPoints.push(foldedPoint);
                }
            }
        } else {
            // folding up - y changes, x does not
            for (const point of deduplicatedPoints) {
                const { x, y } = point;
                let foldedPoint: point;

                if (y < foldAt) {
                    foldedPoint = {
                        x,
                        y,
                    };

                    tmpFoldedPoints.push(foldedPoint);
                } else if (y > foldAt) {
                    const newY = foldAt - (y - foldAt);
                    foldedPoint = {
                        x,
                        y: newY,
                    };
                    tmpFoldedPoints.push(foldedPoint);
                }
            }
        }

        deduplicatedPoints = getDeduplicatedPoints(tmpFoldedPoints);
    }

    return deduplicatedPoints;
}

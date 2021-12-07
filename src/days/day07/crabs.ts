export function getClosestPositionForAll(positions: number[]): number {
    const maxElement = Math.max(...positions);
    let currentMinSum = maxElement * positions.length;
    let currentBestPosition = -1;

    for (let i = 0; i <= maxElement; i++) {
        const tmpSum = getSumOfDistanceFromDestination(i, positions);

        if (tmpSum < currentMinSum) {
            currentMinSum = Math.min(
                currentMinSum,
                getSumOfDistanceFromDestination(i, positions)
            );
            currentBestPosition = i;
        }
    }

    return currentBestPosition;
}

export function getSumOfDistanceFromDestination(
    destination: number,
    positions: number[]
): number {
    return positions.reduce((acc, position) => {
        return acc + Math.abs(destination - position);
    }, 0);
}

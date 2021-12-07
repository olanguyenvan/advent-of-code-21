type fuelBurnFunc = (arg1: number, arg2: number) => number;

export const linearFuelBurn: fuelBurnFunc = (a: number, b: number) =>
    Math.abs(a - b);

export const incrementingFuelBurn: fuelBurnFunc = (a: number, b: number) => {
    const linearDistance = Math.abs(a - b);

    const incrementedDistance = (linearDistance * (linearDistance + 1)) / 2;

    return incrementedDistance;
};

export function getClosestPositionForAll(
    linearFuelBurn: fuelBurnFunc,
    positions: number[]
): number {
    const maxElement = Math.max(...positions);
    let currentMinSum = maxElement * maxElement * positions.length;
    let currentBestPosition = -1;

    for (let i = 0; i <= maxElement; i++) {
        const tmpSum = getSumOfDistanceFromDestination(
            linearFuelBurn,
            i,
            positions
        );

        if (tmpSum < currentMinSum) {
            currentMinSum = Math.min(
                currentMinSum,
                getSumOfDistanceFromDestination(linearFuelBurn, i, positions)
            );
            currentBestPosition = i;
        }
    }

    return currentBestPosition;
}

export function getSumOfDistanceFromDestination(
    linearFuelBurn: fuelBurnFunc,
    destination: number,
    positions: number[]
): number {
    return positions.reduce((acc, position) => {
        return acc + linearFuelBurn(destination, position);
    }, 0);
}

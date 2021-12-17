import { area, velocity } from "./types.ts";

function getDecreasedXVelocity(velocity: number): number {
    if (velocity === 0) return 0;

    if (velocity > 0) return velocity - 1;

    return velocity + 1;
}

export function getMaximumY(area: area): number {
    const potentialXVelocities = getPotentialXVelocities(area);

    let stepsCountToBeInTarget: Set<number> = new Set();

    {
        const [areaXStart, areaXEnd] = area.x;

        for (const potentialXVelocity of potentialXVelocities) {
            let vlct = potentialXVelocity;

            let distance = 0;
            let stepsCounter = 0;

            while (stepsCounter < 30) {
                distance += vlct;
                if (isInRange(areaXStart, areaXEnd, distance)) {
                    stepsCountToBeInTarget.add(stepsCounter);
                } else if (distance > areaXEnd) {
                    break;
                }

                vlct = getDecreasedXVelocity(vlct);
                stepsCounter++;
            }
        }
    }
    // find maximumY that lets you be in target in one of stepsCountToBeInTarget
    const [areaYStart, areaYEnd] = area.y;
    let maxY = 0;

    for (const stepsCount of stepsCountToBeInTarget) {
        // console.log(`finding maximum height y for ${stepsCount} steps.`);

        const bottom = Math.min(areaYStart, areaYEnd);
        const top = Math.max(areaYStart, areaYEnd);
        let potentialVelocityY = 0;

        while (potentialVelocityY <= 100) {
            let stepsCountTmp = 0;
            // console.log("checking potentiaVelocityY");
            let tmpVelocity = potentialVelocityY;
            let distance = 0;
            let tmpMax = 0;

            while (stepsCountTmp < stepsCount) {
                distance += tmpVelocity;

                if (tmpVelocity > 0) {
                    tmpMax = distance;
                }

                tmpVelocity -= 1;
                stepsCountTmp += 1;
            }

            // console.log(
            //     `After ${stepsCount} steps y of initial vel =${tmpVelocity} was at ${distance}`
            // );
            if (isInRange(areaYStart, areaYEnd, distance)) {
                // console.log(
                //     `y was in range for init vel ${potentialVelocityY} at point: ${distance}`
                // );
                maxY = Math.max(maxY, tmpMax);
                break;
            }

            potentialVelocityY++;
        }
    }

    return maxY;
}

function isInRange(a: number, b: number, x: number): boolean {
    if (a < b) {
        return a <= x && x <= b;
    }
    return b <= x && x <= a;
}

function getPotentialXVelocities(area: area): number[] {
    const possibleVelocities: number[] = [];

    const [areaXStart, areaXEnd] = area.x;

    let potentialVelocity = 1;

    while (potentialVelocity <= areaXEnd) {
        let tmpVelocity = potentialVelocity;
        let distance = 0;

        while (tmpVelocity !== 0) {
            distance += tmpVelocity;
            if (isInRange(areaXStart, areaXEnd, distance)) {
                possibleVelocities.push(potentialVelocity);
                break;
            }
            tmpVelocity = getDecreasedXVelocity(tmpVelocity);
        }

        potentialVelocity++;
    }

    return possibleVelocities;
}

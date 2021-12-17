import { area, velocity } from "./types.ts";

function getDecreasedXVelocity(velocity: number): number {
    if (velocity === 0) return 0;

    if (velocity > 0) return velocity - 1;

    return velocity + 1;
}

export function getMaximumY(area: area): number {
    const potentialXVelocities = getPotentialXVelocities(area);

    let exactStepsCountToBeInTarget: Set<number> = new Set();
    let minimumStepsToStop = Infinity;

    {
        const [areaXStart, areaXEnd] = area.x;

        for (const potentialXVelocity of potentialXVelocities) {
            let vlct = potentialXVelocity;

            let distance = 0;
            let stepsCounter = 0;

            while (vlct > 0) {
                distance += vlct;
                if (isInRange(areaXStart, areaXEnd, distance)) {
                    exactStepsCountToBeInTarget.add(stepsCounter);
                } else if (distance > areaXEnd) {
                    break;
                }

                vlct = getDecreasedXVelocity(vlct);
                stepsCounter++;
            }

            if (vlct === 0 && isInRange(areaXStart, areaXEnd, distance)) {
                minimumStepsToStop = Math.min(minimumStepsToStop, stepsCounter);
            }
        }
    }
    // find maximumY that lets you be in target in one of stepsCountToBeInTarget
    const [areaYStart, areaYEnd] = area.y;
    let maxY = 0;

    for (const stepsCount of exactStepsCountToBeInTarget) {
        let potentialVelocityY = 0;

        while (potentialVelocityY <= 200) {
            let stepsCountTmp = 0;
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

            if (isInRange(areaYStart, areaYEnd, distance)) {
                maxY = Math.max(maxY, tmpMax);
                break;
            }

            potentialVelocityY++;
        }
    }

    let stepsCount = minimumStepsToStop;

    console.log("minimumStepsToStop", minimumStepsToStop);
    while (stepsCount < 1000) {
        let potentialVelocityY = 0;

        while (potentialVelocityY <= 200) {
            let stepsCountTmp = 0;
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

            if (isInRange(areaYStart, areaYEnd, distance)) {
                maxY = Math.max(maxY, tmpMax);
                break;
            }

            potentialVelocityY++;
        }

        stepsCount++;
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

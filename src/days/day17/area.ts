import { area } from "./types.ts";

function getDecreasedXVelocity(velocity: number): number {
    if (velocity === 0) return 0;

    if (velocity > 0) return velocity - 1;

    return velocity + 1;
}

export function getMaximumY(area: area): [number, number] {
    const potentialXVelocities = getPotentialXVelocities(area);

    const [areaXStart, areaXEnd] = area.x;
    const [areaYStart, areaYEnd] = area.y;

    const possibleCombinations: [number, number][] = [];
    let maxY = 0;

    for (const potentialXVelocity of potentialXVelocities) {
        let stepsToEnterArea = 0;
        let stepsToLeaveArea = 0;
        let distanceX = 0;

        let velocity = potentialXVelocity;

        while (distanceX < areaXStart && velocity > 0) {
            distanceX += velocity;
            velocity = getDecreasedXVelocity(velocity);
            stepsToEnterArea++;
        }

        stepsToLeaveArea = stepsToEnterArea;

        while (distanceX <= areaXEnd && velocity > 0) {
            distanceX += velocity;
            velocity = getDecreasedXVelocity(velocity);
            stepsToLeaveArea++;
        }

        const stoppedInArea = isInRange(areaXStart, areaXEnd, distanceX);

        let potentialYVelocity = areaYEnd;

        // TO DO: Do a smarter check
        while (potentialYVelocity <= 200) {
            let velocityTmp = potentialYVelocity;

            const potentialMax = (velocityTmp * (velocityTmp + 1)) / 2;

            let distanceY = 0;
            let stepsDone = 0;

            while (stepsDone < stepsToEnterArea) {
                distanceY += velocityTmp;
                velocityTmp--;
                stepsDone++;
            }

            if (stoppedInArea) {
                let passedArea = distanceY < areaYEnd;

                while (!passedArea) {
                    if (isInRange(areaYStart, areaYEnd, distanceY)) {
                        possibleCombinations.push([
                            potentialXVelocity,
                            potentialYVelocity,
                        ]);
                        maxY = Math.max(maxY, potentialMax);

                        break;
                    }

                    distanceY += velocityTmp;
                    velocityTmp--;

                    passedArea = distanceY < areaYEnd;
                }
            } else {
                while (stepsDone < stepsToLeaveArea) {
                    if (isInRange(areaYStart, areaYEnd, distanceY)) {
                        possibleCombinations.push([
                            potentialXVelocity,
                            potentialYVelocity,
                        ]);
                        maxY = Math.max(maxY, potentialMax);
                        break;
                    }

                    distanceY += velocityTmp;
                    velocityTmp--;
                    stepsDone++;
                }
            }

            potentialYVelocity++;
        }
    }

    return [maxY, possibleCombinations.length];
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

type fishInformation = {
    counter: number;
    daysLeft: number;
};
export function getFishLengthAfterDays(fish: number[], days: number): number {
    const fishToProcess: fishInformation[] = fish.map((counter) => ({
        counter,
        daysLeft: days,
    }));

    let fishCounter = 0;

    while (fishToProcess.length !== 0) {
        const currentFish = fishToProcess.shift();
        const { daysLeft: initialDaysLeft, counter: initialCounter } =
            currentFish!;

        let tmpDaysLeft = initialDaysLeft - initialCounter - 1;

        while (tmpDaysLeft >= 0) {
            fishToProcess.push({
                counter: 8,
                daysLeft: tmpDaysLeft,
            });
            tmpDaysLeft -= 7;
        }

        fishCounter++;
    }

    return fishCounter;
}

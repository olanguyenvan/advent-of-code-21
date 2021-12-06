export function getFishLengthAfterDays(fish: number[], days: number): number {
    const cache: number[] = Array.from({
        length: days + 1,
    });

    // returns number of children it can produce in days number + 1;
    function getFamilyCountAfterDays(days: number): number {
        if (days <= 0) {
            return 1;
        }

        if (!cache[days]) {
            const result =
                getFamilyCountAfterDays(days - 7) +
                getFamilyCountAfterDays(days - 9);

            cache[days] = result;
        }
        return cache[days];
    }

    let fishCounter = 0;

    for (let i = 0; i < fish.length; i++) {
        const currentFish = fish[i];
        const currentFishFamilyCount = getFamilyCountAfterDays(
            days - currentFish
        );
        fishCounter += currentFishFamilyCount;
    }

    return fishCounter;
}

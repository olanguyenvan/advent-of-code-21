import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
    describe,
    each,
    it,
} from "https://deno.land/x/test_suite@0.9.1/mod.ts";
import { getFishLengthAfterDays } from "./fish.ts";

describe("getFishLengthAfterDays", () => {
    it("fish [3] after 1 day", () => {
        const fish = [3];
        const days = 1;
        const fishLengthAfterDays = getFishLengthAfterDays(fish, days);
        const expectedLength = 1;

        assertEquals(fishLengthAfterDays, expectedLength);
    });

    const exampleInput = [3, 4, 3, 1, 2];

    each(
        "After %s days should be %s",
        [
            [exampleInput, 18, 26],
            [[...exampleInput, ...exampleInput], 18, 26 * 2],
            [exampleInput, 80, 5934],
            [[...exampleInput, ...exampleInput], 80, 5934 * 2],
        ],
        (fish: number[], days: number, expectedLength: number) => {
            console.log(expectedLength);

            const fishLengthAfterDays = getFishLengthAfterDays(fish, days);

            assertEquals(fishLengthAfterDays, expectedLength);
        }
    );
});

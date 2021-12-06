import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/x/test_suite@0.9.1/mod.ts";
import { getFishLengthAfterDays } from "./fish.ts";

describe("getFishLengthAfterDays", () => {
    it("fish [3] after 1 day", () => {
        const fish = [3];
        const days = 1;
        const fishLengthAfterDays = getFishLengthAfterDays(fish, days);
        const expectedLength = 1;

        assertEquals(fishLengthAfterDays, expectedLength);
    });

    it("example input [3, 4, 3, 1, 2] 18 days", () => {
        const fish = [3, 4, 3, 1, 2];
        const days = 18;
        const fishLengthAfterDays = getFishLengthAfterDays(fish, days);
        const expectedLength = 26;

        assertEquals(fishLengthAfterDays, expectedLength);
    });

    it("example input [3, 4, 3, 1, 2] 80 days", () => {
        const fish = [3, 4, 3, 1, 2];
        const days = 80;
        const fishLengthAfterDays = getFishLengthAfterDays(fish, days);
        const expectedLength = 5934;

        assertEquals(fishLengthAfterDays, expectedLength);
    });
});

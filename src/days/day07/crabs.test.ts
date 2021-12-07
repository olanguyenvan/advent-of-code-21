import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
    describe,
    each,
    it,
} from "https://deno.land/x/test_suite@0.9.1/mod.ts";
import {
    getClosestPositionForAll,
    getSumOfDistanceFromDestination,
} from "./crabs.ts";

describe("getClosestPositionForAll", () => {
    each(
        "",
        [
            [[1], 1],
            [[1, 1], 1],
            [[1, 3, 5], 3],
            [[0, 0, 0, 0, 10], 0],
            [[16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2],
        ],
        (crabsPositions: number[], expectedPosition: number) => {
            const fishLengthAfterDays =
                getClosestPositionForAll(crabsPositions);

            assertEquals(fishLengthAfterDays, expectedPosition);
        }
    );
});

describe("getSumOfDistanceFromDestination", () => {
    each(
        "",
        [
            [0, [1], 1],
            [0, [1, 1], 2],
            [2, [1, 3], 2],
            [3, [1, 5], 4],
            [3, [1, 3, 5], 4],
            [2, [0, 0, 0, 0, 10], 16],
            [2, [16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 37],
        ],
        (
            destination: number,
            crabsPositions: number[],
            expectedPosition: number
        ) => {
            const fishLengthAfterDays = getSumOfDistanceFromDestination(
                destination,
                crabsPositions
            );

            assertEquals(fishLengthAfterDays, expectedPosition);
        }
    );
});

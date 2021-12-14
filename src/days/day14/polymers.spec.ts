import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
    describe,
    each,
    it,
} from "https://deno.land/x/test_suite@0.9.1/mod.ts";
import {
    elementsCount,
    polymer,
    insertions,
    getPolymerElementsCountAfterInsertions,
    getPolymersOfLengthWithNextNeighbour,
    getPolymerAfterInsertions,
} from "./polymers.ts";

describe("getPolymerAfterInsertions", () => {
    each(
        "ola with only 'a' after %s steps should be %s",
        [
            [0, "ola"],
            [1, "oalaa"],
            [2, "oaaalaaaa"],
            [3, "oaaaaaaalaaaaaaaa"],
        ],

        (steps: number, expectedPolymer: string) => {
            const initialPolymer = "ola";
            const insertions: insertions = {
                ol: "a",
                oa: "a",
                al: "a",
                la: "a",
                aa: "a",
            };

            const resultPolymer = getPolymerAfterInsertions(
                initialPolymer,
                insertions,
                steps
            );

            assertEquals(resultPolymer, expectedPolymer);
        }
    );

    each(
        "string of character 1 does not get longer",
        [[0], [1], [2]],

        (steps: number) => {
            const initialPolymer = "o";
            const insertions: insertions = {
                ol: "a",
                oa: "a",
            };

            const resultPolymer = getPolymerAfterInsertions(
                initialPolymer,
                insertions,
                steps
            );

            assertEquals(resultPolymer, initialPolymer);
        }
    );
});

describe("getPolymersOfLengthWithNextNeighbour", () => {
    it("divides when polymer length is divisible by inteval", () => {
        const resultDivision = getPolymersOfLengthWithNextNeighbour(
            "olalandoug",
            4
        );
        const expectedDivisions = ["olal", "land", "doug"];

        assertEquals(resultDivision, expectedDivisions);
    });

    it("divides when polymer length is not divisible by inteval", () => {
        const resultDivision = getPolymersOfLengthWithNextNeighbour(
            "olalandou",
            4
        );
        const expectedDivisions = ["olal", "land", "dou"];

        assertEquals(resultDivision, expectedDivisions);
    });

    it("does not divide when it's already meeting requirements", () => {
        const resultDivision = getPolymersOfLengthWithNextNeighbour("olal", 4);
        const expectedDivisions = ["olal"];

        assertEquals(resultDivision, expectedDivisions);
    });

    it("divides into 2", () => {
        const resultDivision = getPolymersOfLengthWithNextNeighbour(
            "123456789",
            5
        );
        const expectedDivisions = ["12345", "56789"];

        assertEquals(resultDivision, expectedDivisions);
    });
});

describe("getPolymerElementsCountAfterInsertions", () => {
    each(
        "ola with only 'a' after %s steps should be %s",
        [
            [0, { o: 1, l: 1, a: 1 }],
            [1, { o: 1, l: 1, a: 3 }],
            [2, { o: 1, l: 1, a: 7 }],
            [3, { o: 1, l: 1, a: 15 }],
            [4, { o: 1, l: 1, a: 31 }],
        ],

        (steps: number, expectedElementsCount: elementsCount) => {
            const initialPolymer = "ola";
            const insertions: insertions = {
                ol: "a",
                oa: "a",
                al: "a",
                la: "a",
                aa: "a",
            };

            const resultPolymer = getPolymerElementsCountAfterInsertions(
                initialPolymer,
                insertions,
                steps
            );

            assertEquals(resultPolymer, expectedElementsCount);
        }
    );

    it("olaladou => 0 steps => o2l2a2d1u1", () => {
        const initialPolymer = "olaladou";

        const insertions = {
            ol: "a",
            la: "a",
            al: "a",
            ad: "a",
            do: "a",
            ou: "a",
        };

        // oalaaalaaadaoau
        const expectedElementsCount = {
            o: 2,
            d: 1,
            a: 2,
            l: 2,
            u: 1,
        };

        const resultPolymer = getPolymerElementsCountAfterInsertions(
            initialPolymer,
            insertions,
            0
        );

        assertEquals(resultPolymer, expectedElementsCount);
    });

    it("olaladou => o2d1a9l2u1", () => {
        const initialPolymer = "olaladou";

        const insertions = {
            ol: "a",
            la: "a",
            al: "a",
            ad: "a",
            do: "a",
            ou: "a",
        };

        // oalaaalaaadaoau
        const expectedElementsCount = {
            o: 2,
            d: 1,
            a: 9,
            l: 2,
            u: 1,
        };

        const resultPolymer = getPolymerElementsCountAfterInsertions(
            initialPolymer,
            insertions,
            1
        );

        assertEquals(resultPolymer, expectedElementsCount);
    });

    it("olaladou => 2 steps => o2d1a23l2u1", () => {
        const initialPolymer = "olaladou";

        const insertions = {
            ol: "a",
            la: "a",
            al: "a",
            ad: "a",
            do: "a",
            ou: "a",
            oa: "a",
            aa: "a",
            da: "a",
            ao: "a",
            au: "a",
        };

        // oalaaalaaadaoau
        const expectedElementsCount = {
            o: 2,
            d: 1,
            a: 23,
            l: 2,
            u: 1,
        };

        const resultPolymer = getPolymerElementsCountAfterInsertions(
            initialPolymer,
            insertions,
            2
        );

        assertEquals(resultPolymer, expectedElementsCount);
    });
});

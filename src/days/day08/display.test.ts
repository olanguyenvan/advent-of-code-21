import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/x/test_suite@0.9.1/mod.ts";
import { display, getDisplaysOutputSum } from "./display.ts";

describe("Day 8 - part 2 - getDisplaysOutputSum", () => {
    const input = [
        "abcdef",
        "bc",
        "abged",
        "abgcd",
        "fgbc",
        "afgcd",
        "afgcde",
        "abc",
        "abcdefg",
        "abfgcd",
    ];
    const output = [
        "bc",
        "abcdef",
        "bc",
        "abged",
        "abgcd",
        "fgbc",
        "afgcd",
        "afgcde",
        "abc",
        "abcdefg",
        "abfgcd",
    ];
    it("returns 10123456789", () => {
        const displays: display[] = [
            {
                input,
                output,
            },
        ];

        const expected = 10123456789;
        assertEquals(getDisplaysOutputSum(displays), expected);
    });
});

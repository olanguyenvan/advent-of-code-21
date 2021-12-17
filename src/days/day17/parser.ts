import { area } from "./types.ts";

const AREA_REGEX =
    /target area: x=(-?[0-9]+)\.\.(-?[0-9]+), y=(-?[0-9]+)\.\.(-?[0-9]+)/;

export function parseAreaInput(rawInput: string): area {
    const match = rawInput.match(AREA_REGEX)!;
    const [_, xStart, xEnd, yStart, yEnd] = match;
    return {
        x: [parseInt(xStart, 10), parseInt(xEnd, 10)],
        y: [parseInt(yStart, 10), parseInt(yEnd, 10)],
    };
}

import { area } from "./types.ts";

const AREA_REGEX =
    /target area: x=(-?[0-9]+)\.\.(-?[0-9]+), y=(-?[0-9]+)\.\.(-?[0-9]+)/;

export function parseAreaInput(rawInput: string): area {
    const match = rawInput.match(AREA_REGEX)!;
    const [_, xStart, xEnd, yStart, yEnd] = match;
    const parsedX = [xStart, xEnd].map((s) => parseInt(s, 10));
    const parsedY = [yStart, yEnd].map((s) => parseInt(s, 10));

    return {
        x: [Math.min(...parsedX), Math.max(...parsedX)],
        y: [Math.max(...parsedY), Math.min(...parsedY)],
    };
}

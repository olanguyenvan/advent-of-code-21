import * as path from "https://deno.land/std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

// ========================
function main(rawInput: string) {
    const vents: vent[] = parseVentsInput(rawInput);

    // console.log(vents);
    solvePart1(vents);
    // solvePart2(bingo2);
}

type coordinates = {
    x: number;
    y: number;
};

type vent = [coordinates, coordinates];

function parseCoordinates(coordinates: string): coordinates {
    const [xAsString, yAsString] = coordinates.split(",");

    return {
        x: parseInt(xAsString),
        y: parseInt(yAsString),
    };
}

function parseVentsInput(rawInput: string): vent[] {
    const ventsAsString = rawInput.split("\n").filter(Boolean);

    return ventsAsString.reduce((vents: vent[], ventAsString) => {
        const [fromString, endString] = ventAsString.split("->");
        const vent: vent = [
            parseCoordinates(fromString),
            parseCoordinates(endString),
        ];

        vents.push(vent);

        return vents;
    }, []);
}

function solvePart1(vents: vent[]): void {
    const [maxX, maxY] = getOceanSize(vents);
    const ocean = initEmptyOcean(maxX, maxY);

    markVents(ocean, vents);

    const ventsCrossPoints = getVentsCrossPoint(ocean);
    const ventsCrossPointsCount = ventsCrossPoints.length;

    console.log(`Answer to part 1 is: ${ventsCrossPointsCount}\n`);
}

function getOceanSize(vents: vent[]): [number, number] {
    let maxY = 0;
    let maxX = 0;

    for (const vent of vents) {
        for (const coordinate of vent) {
            maxX = Math.max(coordinate.x, maxX);
            maxY = Math.max(coordinate.y, maxY);
        }
    }

    return [maxX + 1, maxY + 1];
}

function initEmptyOcean(width: number, length: number): number[][] {
    return Array.from({ length: width }, () =>
        Array.from({ length: length }, () => 0)
    );
}

function isVertical(vent: vent): boolean {
    return vent[0].x === vent[1].x;
}

function isFromDownUp(vent: vent): boolean {
    return vent[0].y < vent[1].y;
}

function isHorizontal(vent: vent): boolean {
    return vent[0].y === vent[1].y;
}

function isFromLeftToRight(vent: vent): boolean {
    return vent[0].x < vent[1].x;
}

function markVents(ocean: number[][], vents: vent[]): void {
    for (const vent of vents) {
        if (isVertical(vent)) {
            const x = vent[0].x;

            if (isFromDownUp(vent)) {
                for (let i = vent[0].y; i <= vent[1].y; i++) {
                    ocean[i][x] += 1;
                }
            } else {
                for (let i = vent[1].y; i <= vent[0].y; i++) {
                    ocean[i][x] += 1;
                }
            }
            continue;
        }
        if (isHorizontal(vent)) {
            const y = vent[0].y;

            if (isFromLeftToRight(vent)) {
                for (let i = vent[0].x; i <= vent[1].x; i++) {
                    ocean[y][i] += 1;
                }
            } else {
                for (let i = vent[1].x; i <= vent[0].x; i++) {
                    ocean[y][i] += 1;
                }
            }

            continue;
        }
    }
}

function getVentsCrossPoint(ocean: number[][]): coordinates[] {
    const depth = ocean.length;
    const width = ocean[0].length;

    const crossPoints: coordinates[] = [];

    for (let i = 0; i < depth; i++) {
        for (let j = 0; j < width; j++) {
            if (ocean[i][j] >= 2) {
                crossPoints.push({
                    x: j,
                    y: i,
                });
            }
        }
    }

    return crossPoints;
}

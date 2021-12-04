import * as path from "https://deno.land/std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToInput = path.resolve(__dirname, `input`);

Deno.readTextFile(pathToInput).then(main);

//  ========================
const COMMANDS = {
    FORWARD: "forward",
    UP: "up",
    DOWN: "down",
};
const COMMAND_REGEX = /^(forward|up|down)\s([0-9])+$/;

function parseCommand(command: string): [string, number] {
    const [_, commandType, distance] = command.match(COMMAND_REGEX)!;

    return [commandType, parseInt(distance)];
}

function main(rawInput: string) {
    const commandsAsString = rawInput.split("\n");
    const commands = commandsAsString.map(parseCommand);

    solvePart1(commands);
    solvePart2(commands);
}

function solvePart1(commands: [string, number][]) {
    const [depth, horizontal] = getEndPositionPart1(commands);

    console.log(`Answer to part 1 is: ${horizontal * depth}\n`);
}

function getEndPositionPart1(commands: [string, number][]): [number, number] {
    let depth = 0;
    let horizontal = 0;

    for (const [commandType, distance] of commands) {
        switch (commandType) {
            case COMMANDS.FORWARD:
                horizontal += distance;
                break;
            case COMMANDS.DOWN:
                depth += distance;
                break;
            case COMMANDS.UP:
                depth -= distance;
                break;
        }
    }
    return [depth, horizontal];
}

function solvePart2(commands: [string, number][]) {
    const [depth, horizontal] = getEndPositionPart2(commands);

    console.log(`Answer to part 2 is: ${horizontal * depth}\n`);
}

function getEndPositionPart2(commands: [string, number][]): [number, number] {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;

    for (const [commandType, distance] of commands) {
        switch (commandType) {
            case COMMANDS.FORWARD:
                horizontal += distance;
                depth += aim * distance;
                break;
            case COMMANDS.DOWN:
                aim += distance;
                break;
            case COMMANDS.UP:
                aim -= distance;
                break;
        }
    }
    return [depth, horizontal];
}

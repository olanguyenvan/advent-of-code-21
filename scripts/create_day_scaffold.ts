import * as dotenv from "https://deno.land/x/dotenv/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import * as fs from "https://deno.land/std/fs/mod.ts";

function main() {
    const dayAsString = Deno.args[0];

    if (!dayAsString) {
        console.log("Please provide day number as first argument");

        Deno.exit(1);
    }

    const day = Number(dayAsString);

    const isDayValid = day && Number.isInteger(day) && day >= 1 && day <= 24;

    if (!isDayValid) {
        console.log(
            "First argument (day) must be an integer from range [1, 24]"
        );
        Deno.exit(1);
    }

    createScaffoldForDay(day);
}

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const pathToDays = path.resolve(__dirname, `../src/days`);

function getDayFolderName(day: number) {
    return day < 10 ? `day0${day}` : `day${day}`;
}

function getPathToDay(day: number) {
    const dayFolderName = getDayFolderName(day);
    return path.resolve(pathToDays, dayFolderName);
}

function getPathToInput(day: number) {
    const pathToDay = getPathToDay(day);

    return path.resolve(pathToDay, "input");
}

function createIndexFile(day: number) {
    const pathToDay = getPathToDay(day);
    const pathToIndex = path.resolve(pathToDay, "index.ts");

    fs.ensureFile(pathToIndex);
}

function createExampleInputFile(day: number) {
    const pathToDay = getPathToDay(day);
    const pathToIndex = path.resolve(pathToDay, "example_input");

    fs.ensureFile(pathToIndex);
}

async function createScaffoldForDay(day: number) {
    const dayFolderName = getDayFolderName(day);

    for await (const result of Deno.readDir(pathToDays)) {
        if (result.name === dayFolderName) {
            console.log(`${dayFolderName} directory already exists`);
            Deno.exit(0);
        }
    }

    fs.ensureDir(getPathToDay(day));

    createFilesInsideDay(day);
}

async function createFilesInsideDay(day: number) {
    createIndexFile(day);
    createInputFile(day);
    createExampleInputFile(day);
}

function getCookie() {
    const cookie = dotenv.config().AOC_SESSION_COOKIE;

    if (!cookie) {
        console.log(
            "You need to define AOC_SESSION_COOKIE variable in .env file"
        );

        Deno.exit(1);
    }

    return cookie;
}

async function createInputFile(day: number) {
    const endpoint = `https://adventofcode.com/2021/day/${day}/input`;
    const sessionCookie = getCookie();

    const response = await fetch(endpoint, {
        headers: {
            Cookie: `session=${sessionCookie}`,
        },
    });

    const { status, statusText } = response;

    if (response.statusText !== "OK") {
        console.log(`There was a problem getting response from ${endpoint}:`);
        console.log(`Status ${status}: ${statusText}`);

        Deno.exit(1);
    }

    const encoder = new TextEncoder();
    const inputRawText = await response.text();

    Deno.writeFileSync(getPathToInput(day), encoder.encode(inputRawText));
}

main();

# Advent of Code 2021 🎄

Solutions By Ola Nguyen Van

### Installation

To run this project, you need to have deno installed

```sh
brew install deno
```

For more information, check documentation at https://deno.land/ .

### Create day scaffold

Every day has its own directory in `src/days`. To auto generate the directory and files, use the following command:

`deno run --allow-net --allow-read --allow-write scripts/create_day_scaffold.ts <day>`

For example

`deno run --allow-net --allow-read --allow-write scripts/create_day_scaffold.ts 1`

The command will generate a directory in `src/days` and 2 files:

-   index.ts
-   input filled with your data sample

For the command to work correctly, you need to define `AOC_SESSION_COOKIE` environment variable.

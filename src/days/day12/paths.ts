export type segment = [string, string];
export type path = string[];
type point = {
    name: string;
    neighbours: point[];
};
type visited = { [k: string]: boolean };

function printPaths(paths: path[]) {
    for (const path of paths) {
        let s: string[] = [];
        for (let i = 0; i < path.length; i++) {
            s.push(path[i]);
        }

        console.log(s.join(","));
    }
}

function printVisited(visited: visited) {
    let s: string[] = [];
    for (const [key, value] of Object.entries(visited)) {
        s.push(`${key} = ${value}`);
    }

    console.log(s.join(", "));
}

function initializePoints(segments: segment[]): { [k: string]: string[] } {
    const points: { [k: string]: string[] } = {};

    function addSegmentInformation(from: string, to: string): void {
        if (!points[from]) {
            points[from] = [];
        }

        points[from].push(to);
    }

    for (const segment of segments) {
        const [from, to] = segment;

        addSegmentInformation(from, to);
        addSegmentInformation(to, from);
    }

    return points;
}

export function getPathsCombinationsCount(segments: segment[]): number {
    const neighboursPerPoint = initializePoints(segments);
    const visited: visited = {};

    const paths = getPathsCombinationsCountRec("start", visited, []);

    // ==================

    function getPathsCombinationsCountRec(
        pointName: string,
        visited: visited,
        accumulatedPath: path
    ): path[] {
        const currentPath = [...accumulatedPath, pointName];

        if (pointName === "end") {
            return [currentPath];
        }
        visited[pointName] = true;

        const neighbours = neighboursPerPoint[pointName];

        let paths: path[] = [];

        for (const neighbour of neighbours) {
            let canVisit = true;
            if (neighbour === neighbour.toLowerCase()) {
                canVisit = !visited[neighbour];
            }

            if (canVisit) {
                const neighbourPath = getPathsCombinationsCountRec(
                    neighbour,
                    visited,
                    currentPath
                );

                paths.push(...neighbourPath);
            }
        }

        visited[pointName] = false;

        return paths;
    }
    // ==================

    return paths.length;
}

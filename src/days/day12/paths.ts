export type segment = [string, string];
export type path = string[];
type visited = { [k: string]: number };
type canVisistConditioner = (
    arg1: visited,
    arg2: string,
    arg3: boolean
) => boolean;

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

export function canVisitConditionerPart1(
    visited: visited,
    pointName: string
): boolean {
    if (!visited.hasOwnProperty(pointName)) {
        return true;
    }

    if (pointName === pointName.toLowerCase()) {
        return visited[pointName] < 1;
    }

    return true;
}

function isSmallCave(pointName: string) {
    return pointName === pointName.toLowerCase();
}

export function canVisitConditionerPart2(
    visited: visited,
    pointName: string,
    smallCaveVisitedTwice: boolean
): boolean {
    if (!visited.hasOwnProperty(pointName)) {
        return true;
    }

    if (["start", "end"].includes(pointName)) {
        return visited[pointName] < 1;
    }

    if (isSmallCave(pointName)) {
        if (smallCaveVisitedTwice) {
            return visited[pointName] < 1;
        }
        return visited[pointName] < 2;
    }

    return true;
}

export function getPathsCombinationsCount(
    segments: segment[],
    canVisitConditioner: canVisistConditioner
): number {
    const neighboursPerPoint = initializePoints(segments);
    const visited: visited = {};

    const paths = getPathsCombinationsCountRec("start", visited, []);

    // ==================

    function getPathsCombinationsCountRec(
        pointName: string,
        visited: visited,
        accumulatedPath: path,
        smallCaveVisitedTwice: boolean = false
    ): path[] {
        const currentPath = [...accumulatedPath, pointName];

        if (pointName === "end") {
            return [currentPath];
        }

        if (!visited.hasOwnProperty(pointName)) {
            visited[pointName] = 0;
        }

        visited[pointName]++;

        const neighbours = neighboursPerPoint[pointName];

        let paths: path[] = [];

        const smallCaveVisitedTwiceForNeighbour =
            smallCaveVisitedTwice ||
            (isSmallCave(pointName) && visited[pointName] === 2);

        for (const neighbour of neighbours) {
            let canVisit = canVisitConditioner(
                visited,
                neighbour,
                smallCaveVisitedTwiceForNeighbour
            );

            if (canVisit) {
                const neighbourPath = getPathsCombinationsCountRec(
                    neighbour,
                    visited,
                    currentPath,
                    smallCaveVisitedTwiceForNeighbour
                );

                paths.push(...neighbourPath);
            }
        }

        visited[pointName]--;

        return paths;
    }
    // ==================

    return paths.length;
}

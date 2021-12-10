const OPENING_PARENTHESES = ["{", "", "(", "<", "["];
const CLOSING_PARENTHESES = ["}", ")", ">", "]"];

const PARENTHESES_ERROR_SCORE: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const CLOSE_PARENTHESES: { [key: string]: string } = {
    "{": "}",
    "(": ")",
    "<": ">",
    "[": "]",
};

export function getSyntaxErrorScore(parentheses: string[][]): number {
    let score = 0;

    for (let j = 0; j < parentheses.length; j++) {
        const currentLine = parentheses[j];
        const stack: string[] = [];

        for (let j = 0; j < currentLine.length; j++) {
            const currentParenthes = currentLine[j];

            if (OPENING_PARENTHESES.includes(currentParenthes)) {
                stack.push(currentParenthes);
            } else {
                const lastParenthes = stack.pop()!;
                if (currentParenthes !== CLOSE_PARENTHESES[lastParenthes]) {
                    score += PARENTHESES_ERROR_SCORE[currentParenthes];

                    break;
                }
            }
        }
    }

    return score;
}

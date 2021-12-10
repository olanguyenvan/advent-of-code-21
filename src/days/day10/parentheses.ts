const OPENING_PARENTHESES = ["{", "", "(", "<", "["];

const PARENTHESES_ERROR_SCORE: { [key: string]: number } = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};

const AUTO_COMPLETE_SCORE: { [key: string]: number } = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
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

function getUnclosedParentheses(parentheses: string[]): string[] {
    const stack: string[] = [];

    for (let i = 0; i < parentheses.length; i++) {
        const currentParenthes = parentheses[i];

        if (OPENING_PARENTHESES.includes(currentParenthes)) {
            stack.push(currentParenthes);
        } else {
            const lastParenthes = stack.pop()!;
            const expectedClosingParentheses = CLOSE_PARENTHESES[lastParenthes];

            if (currentParenthes !== expectedClosingParentheses) {
                throw new Error(
                    `Given parentheses are corrupted. Expected ${expectedClosingParentheses}, got ${currentParenthes} instead`
                );
            }
        }
    }

    return stack;
}

function areParenthesesValid(parentheses: string[]): boolean {
    try {
        getUnclosedParentheses(parentheses);
    } catch (error) {
        return false;
    }

    return true;
}

function getAutoComplete(parentheses: string[]): string[] {
    const unclosedParentheses: string[] = getUnclosedParentheses(parentheses);

    let autoComplete = [];

    for (let i = unclosedParentheses.length - 1; i >= 0; i--) {
        autoComplete.push(CLOSE_PARENTHESES[unclosedParentheses[i]]);
    }

    return autoComplete;
}

export function getAutoCompleteScore(parentheses: string[][]): number {
    const scores: number[] = [];
    const notCorruptedParentheses = parentheses.filter(areParenthesesValid);

    for (const parenthesesLine of notCorruptedParentheses) {
        const autoComplete = getAutoComplete(parenthesesLine);

        const currentScore = autoComplete.reduce(
            (acc: number, parenthes: string) => {
                return acc * 5 + AUTO_COMPLETE_SCORE[parenthes];
            },
            0
        );

        scores.push(currentScore);
    }

    scores.sort((a: number, b: number) => a - b);

    return scores[Math.floor(scores.length / 2)];
}

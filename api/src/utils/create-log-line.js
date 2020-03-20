export function createLogLine(object) {
    const parameters = [];

    for (const [key, value] of Object.entries(object)) {
        parameters.push(`${key}: ${value}`);
    }

    return `{ ${parameters.join(', ')} }`;
}

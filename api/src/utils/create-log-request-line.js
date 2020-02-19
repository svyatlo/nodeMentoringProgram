export function createLogRequestLine(object) {
    const queryParameters = [];

    for (const [key, value] of Object.entries(object)) {
        queryParameters.push(`${key}: ${value}`);
    }

    return `{ ${queryParameters.join(', ')} }`;
}

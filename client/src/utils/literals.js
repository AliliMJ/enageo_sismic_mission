export function partialMatch(literal = '', value = '') {
    if (literal === null || value === null) return false;
    return (
        literal
            .replace(/\s/g, '')
            .toLowerCase()
            .match(value.replace(/\s/g, '').toLowerCase()) !== null
    );
}

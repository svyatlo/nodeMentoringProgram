export function sortByPropery(array, sortProperty) {
    return array.sort((a, b) => {
        if (a[sortProperty] > b[sortProperty]) {
            return 1;
        } else if (a[sortProperty] < b[sortProperty]) {
            return -1;
        }
        return 0;
    });
}
